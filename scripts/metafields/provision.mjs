#!/usr/bin/env node
/**
 * Zita V2 metafield-definition provisioning.
 * Schema: scripts/metafields/definitions.json
 * Docs:   docs/architecture/metafield-definitions.md
 *
 *   node scripts/metafields/provision.mjs check
 *   node scripts/metafields/provision.mjs verify --store <shop>.myshopify.com
 *   node scripts/metafields/provision.mjs apply  --store <shop>.myshopify.com --confirm-store <shop>.myshopify.com
 *
 * Talks to Shopify only through `shopify store execute`, which uses the auth stored by
 * `shopify store auth`. The only mutations are metafieldDefinitionCreate (missing definitions)
 * and metafieldDefinitionUnpin/Pin (Admin display order of Zita definitions).
 */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const SCHEMA_PATH = fileURLToPath(new URL('./definitions.json', import.meta.url));

const OWNER_TYPES = ['PRODUCT', 'COLLECTION'];
const STOREFRONT_ACCESS = ['PUBLIC_READ', 'NONE'];
const FILE_TYPES = ['Image', 'Video'];
const STORE_PATTERN = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/;

// Shopify Help Center: up to 50 pinned definitions per owner type.
const PINNED_LIMIT = 50;

// Validation names per type, from shopify.dev "List of validation options".
// Add a type only after confirming it there.
const SUPPORTED_TYPES = {
  single_line_text_field: ['min', 'max', 'regex', 'choices'],
  multi_line_text_field: ['min', 'max', 'regex'],
  rich_text_field: [],
  boolean: [],
  dimension: ['min', 'max'],
  url: ['allowed_domains'],
  file_reference: ['file_type_options'],
  product_reference: [],
};

// Shopify stores these as JSON-encoded lists; an empty list means unrestricted.
const LIST_VALIDATIONS = new Set(['choices', 'file_type_options', 'allowed_domains']);

const DEFINITION_FIELDS = `
  id
  name
  description
  namespace
  key
  ownerType
  type { name }
  validations { name value }
  access { storefront }
  pinnedPosition
  metafieldsCount
  standardTemplate { id }
  constraints { key values(first: 20) { nodes { value } } }`;

const CREATE_MUTATION = `mutation ZitaMetafieldDefinitionCreate($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    createdDefinition { id namespace key }
    userErrors { field message code }
  }
}`;

const PIN_MUTATION = `mutation ZitaMetafieldDefinitionPin($identifier: MetafieldDefinitionIdentifierInput!) {
  metafieldDefinitionPin(identifier: $identifier) {
    pinnedDefinition { id namespace key pinnedPosition }
    userErrors { field message code }
  }
}`;

const UNPIN_MUTATION = `mutation ZitaMetafieldDefinitionUnpin($identifier: MetafieldDefinitionIdentifierInput!) {
  metafieldDefinitionUnpin(identifier: $identifier) {
    unpinnedDefinition { id namespace key pinnedPosition }
    userErrors { field message code }
  }
}`;

// ---------------------------------------------------------------------------
// Schema

export function loadSchema(path = SCHEMA_PATH) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function expectedDefinitions(schema) {
  const defaults = schema.defaults ?? {};
  return Object.entries(schema.owners ?? {}).flatMap(([ownerType, definitions]) =>
    definitions.map((definition) => ({
      storefrontAccess: defaults.storefrontAccess,
      pin: defaults.pin,
      ...definition,
      validations: definition.validations ?? {},
      ownerType,
      namespace: schema.namespace,
    })),
  );
}

export function checkSchema(schema) {
  const errors = [];

  if (!/^\d{4}-(01|04|07|10)$/.test(schema.apiVersion ?? '')) {
    errors.push(`apiVersion "${schema.apiVersion}" is not a quarterly YYYY-MM API version`);
  }
  if (!/^[a-zA-Z0-9_-]{3,255}$/.test(schema.namespace ?? '')) {
    errors.push(`namespace "${schema.namespace}" must be a merchant-owned namespace (3-255 letters, digits, _ or -)`);
  }
  for (const ownerType of Object.keys(schema.owners ?? {})) {
    if (!OWNER_TYPES.includes(ownerType)) errors.push(`owner type "${ownerType}" is not one of ${OWNER_TYPES.join(', ')}`);
  }

  const excluded = new Map((schema.excluded ?? []).map((entry) => [`${entry.ownerType} ${entry.key}`, entry.reason]));
  const seen = new Set();

  for (const definition of expectedDefinitions(schema)) {
    const id = describe(definition);
    const identity = `${definition.ownerType} ${definition.key}`;

    if (!/^[a-zA-Z0-9_-]{2,64}$/.test(definition.key ?? '')) errors.push(`${id}: key must be 2-64 letters, digits, _ or -`);
    if (seen.has(identity)) errors.push(`${id}: defined more than once`);
    seen.add(identity);
    if (excluded.has(identity)) errors.push(`${id}: listed under "excluded" (${excluded.get(identity)})`);
    if (!definition.name?.trim()) errors.push(`${id}: name is required`);
    if (!STOREFRONT_ACCESS.includes(definition.storefrontAccess)) {
      errors.push(`${id}: storefrontAccess must be one of ${STOREFRONT_ACCESS.join(', ')}`);
    }
    if (typeof definition.pin !== 'boolean') errors.push(`${id}: pin must be true or false`);

    const allowed = SUPPORTED_TYPES[definition.type];
    if (!allowed) {
      errors.push(`${id}: type "${definition.type}" is not in SUPPORTED_TYPES`);
      continue;
    }
    for (const [name, value] of Object.entries(definition.validations)) {
      if (!allowed.includes(name)) {
        errors.push(`${id}: validation "${name}" does not apply to ${definition.type}`);
        continue;
      }
      if (LIST_VALIDATIONS.has(name)) {
        if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string' || !item)) {
          errors.push(`${id}: validation "${name}" must be a non-empty list of strings`);
        } else if (new Set(value).size !== value.length) {
          errors.push(`${id}: validation "${name}" repeats a value`);
        }
      }
      if (name === 'choices' && Array.isArray(value) && value.length > 128) {
        errors.push(`${id}: Shopify allows at most 128 choices`);
      }
      if (name === 'file_type_options' && Array.isArray(value) && value.some((item) => !FILE_TYPES.includes(item))) {
        errors.push(`${id}: file_type_options may only contain ${FILE_TYPES.join(', ')}`);
      }
    }
  }

  for (const ownerType of OWNER_TYPES) {
    const pinned = expectedDefinitions(schema).filter((d) => d.ownerType === ownerType && d.pin).length;
    if (pinned > PINNED_LIMIT) errors.push(`${ownerType}: ${pinned} pinned definitions exceeds Shopify's limit of ${PINNED_LIMIT}`);
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Definition comparison

export function compareDefinition(expected, existing) {
  if (!existing) return { status: 'MISSING', conflicts: [], notes: [] };

  const conflicts = [];
  const notes = [];

  if (existing.type?.name !== expected.type) {
    conflicts.push(`type is ${existing.type?.name}, expected ${expected.type} (a definition's type cannot be changed)`);
  }

  const existingValidations = Object.fromEntries((existing.validations ?? []).map(({ name, value }) => [name, value]));
  const names = new Set([...Object.keys(expected.validations), ...Object.keys(existingValidations)]);

  for (const name of names) {
    const want = expected.validations[name];
    const have = existingValidations[name];

    if (LIST_VALIDATIONS.has(name)) {
      const wantList = want ?? [];
      const haveList = have === undefined ? [] : parseList(have);
      if (haveList === null) {
        conflicts.push(`${name} validation has an unreadable value: ${have}`);
      } else if (wantList.length && !haveList.length) {
        notes.push(`no ${name} restriction in the store; schema expects ${formatList(wantList)}`);
      } else if (!wantList.length && haveList.length) {
        conflicts.push(`store restricts ${name} to ${formatList(haveList)}, which the schema does not expect`);
      } else {
        const missing = wantList.filter((item) => !haveList.includes(item));
        const extra = haveList.filter((item) => !wantList.includes(item));
        if (missing.length) conflicts.push(`store ${name} ${formatList(haveList)} does not allow ${formatList(missing)}`);
        else if (extra.length) notes.push(`store ${name} also allows ${formatList(extra)}`);
      }
      continue;
    }

    if (have === undefined) notes.push(`no ${name} validation in the store; schema expects ${canonical(want)}`);
    else if (want === undefined) conflicts.push(`store has a ${name} validation (${have}) that the schema does not expect`);
    else if (canonical(have) !== canonical(want)) conflicts.push(`${name} validation is ${have}, schema expects ${canonical(want)}`);
  }

  if (existing.name !== expected.name) notes.push(`admin name is "${existing.name}" (schema: "${expected.name}")`);
  if ((existing.description ?? '') !== (expected.description ?? '')) notes.push('admin description differs from the schema');

  const storefront = existing.access?.storefront;
  if (storefront && storefront !== expected.storefrontAccess) {
    notes.push(`storefront access is ${storefront} (schema: ${expected.storefrontAccess}); Liquid does not depend on it`);
  }

  // Unpinned-but-expected-pinned is reported and fixed by the Admin order check.
  if (!expected.pin && existing.pinnedPosition !== null && existing.pinnedPosition !== undefined) {
    notes.push('pinned in the admin (schema: unpinned); apply does not unpin it');
  }

  if (existing.constraints?.key) {
    const values = (existing.constraints.values?.nodes ?? []).map((node) => node.value);
    notes.push(`only applies to ${existing.constraints.key}: ${values.join(', ') || '(none listed)'}; other resources will not show the field`);
  }
  if (existing.standardTemplate) notes.push('created from a Shopify standard definition template');

  return {
    status: conflicts.length ? 'CONFLICT' : 'EXISTS-COMPATIBLE',
    conflicts,
    notes,
    id: existing.id,
    metafieldsCount: existing.metafieldsCount,
  };
}

function parseList(value) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : null;
  } catch {
    return null;
  }
}

function canonical(value) {
  if (typeof value !== 'string') return JSON.stringify(value);
  try {
    return JSON.stringify(JSON.parse(value));
  } catch {
    return value;
  }
}

// ---------------------------------------------------------------------------
// Admin display order

// metafieldDefinitionPin gives the definition the highest pinnedPosition for its owner type and
// the admin shows it first, so the admin displays pinned definitions by pinnedPosition descending.
export function adminDisplay(pinnedNodes) {
  return [...pinnedNodes]
    .sort((a, b) => b.pinnedPosition - a.pinnedPosition)
    .map((node) => ({ handle: `${node.namespace}.${node.key}`, pinnedPosition: node.pinnedPosition }));
}

/**
 * Compares the admin order of the managed (schema, pin: true) handles with the schema order and
 * plans the fewest re-pins. A pin always lands at the top, so the handles left alone must
 * already be a suffix of the expected order, in relative order; everything before that suffix is
 * re-pinned from last to first. Pinned definitions outside the schema are never moved.
 * A shared or missing pinnedPosition on a managed definition makes the order unknowable, so no
 * moves are planned and apply refuses to reorder.
 */
export function compareOrder(expectedHandles, pinnedNodes) {
  const display = adminDisplay(pinnedNodes);
  const managed = new Set(expectedHandles);
  const index = new Map(display.map((entry, i) => [entry.handle, i]));

  const positionCounts = new Map();
  for (const { pinnedPosition } of display) positionCounts.set(pinnedPosition, (positionCounts.get(pinnedPosition) ?? 0) + 1);
  const ambiguous = display.some(
    ({ handle, pinnedPosition }) => managed.has(handle) && (!Number.isInteger(pinnedPosition) || positionCounts.get(pinnedPosition) > 1),
  );

  let keepFrom = expectedHandles.length;
  let below = Infinity;
  for (let i = expectedHandles.length - 1; i >= 0; i -= 1) {
    const at = index.get(expectedHandles[i]);
    if (at === undefined || at >= below) break;
    below = at;
    keepFrom = i;
  }

  const moves = ambiguous
    ? []
    : expectedHandles
        .slice(0, keepFrom)
        .reverse()
        .map((handle) => ({ handle, pinned: index.has(handle) }));

  const managedAt = display.map((entry, i) => (managed.has(entry.handle) ? i : -1)).filter((i) => i >= 0);
  const interleaved = managedAt.length
    ? display.slice(managedAt[0], managedAt.at(-1) + 1).filter((entry) => !managed.has(entry.handle)).length
    : 0;

  return {
    matches: !ambiguous && moves.length === 0,
    expected: expectedHandles,
    display,
    managed,
    moves,
    ambiguous,
    interleaved,
    unpinned: expectedHandles.filter((handle) => !index.has(handle)),
  };
}

// ---------------------------------------------------------------------------
// GraphQL

export function buildLookup(definitions, ownerTypes) {
  const params = ['$namespace: String!'];
  const fields = [];
  const variables = { namespace: definitions[0]?.namespace };

  definitions.forEach((definition, index) => {
    params.push(`$owner${index}: MetafieldOwnerType!`, `$key${index}: String!`);
    fields.push(
      `  d${index}: metafieldDefinitions(ownerType: $owner${index}, namespace: $namespace, key: $key${index}, first: 5) {\n` +
        '    nodes { ...ZitaDefinitionFields }\n  }',
    );
    variables[`owner${index}`] = definition.ownerType;
    variables[`key${index}`] = definition.key;
  });

  ownerTypes.forEach((ownerType, index) => {
    params.push(`$pinnedOwner${index}: MetafieldOwnerType!`);
    fields.push(
      `  pinned${index}: metafieldDefinitions(ownerType: $pinnedOwner${index}, pinnedStatus: PINNED, first: 250) {\n` +
        '    nodes { id namespace key pinnedPosition }\n    pageInfo { hasNextPage }\n  }',
    );
    variables[`pinnedOwner${index}`] = ownerType;
  });

  const query =
    `query ZitaMetafieldDefinitions(${params.join(', ')}) {\n${fields.join('\n')}\n}\n\n` +
    `fragment ZitaDefinitionFields on MetafieldDefinition {${DEFINITION_FIELDS}\n}`;
  return { query, variables };
}

export function toCreateInput(definition) {
  return {
    ownerType: definition.ownerType,
    namespace: definition.namespace,
    key: definition.key,
    name: definition.name,
    description: definition.description,
    type: definition.type,
    pin: definition.pin,
    access: { storefront: definition.storefrontAccess },
    validations: Object.entries(definition.validations).map(([name, value]) => ({
      name,
      value: typeof value === 'string' ? value : JSON.stringify(value),
    })),
  };
}

function shopifyExecute({ store, apiVersion, query, variables, allowMutations = false }) {
  const args = ['store', 'execute', '--store', store, '--version', apiVersion, '--json', '--query', query];
  args.push('--variables', JSON.stringify(variables));
  if (allowMutations) args.push('--allow-mutations');

  // SHOPIFY_FLAG_* variables would otherwise override flags (store, allow-mutations, output-file).
  const env = Object.fromEntries(Object.entries(process.env).filter(([name]) => !name.startsWith('SHOPIFY_FLAG_')));
  const result = spawnSync('shopify', args, {
    env,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 180_000,
    maxBuffer: 16 * 1024 * 1024,
  });

  if (result.error?.code === 'ENOENT') {
    throw new Error('Shopify CLI was not found on PATH. From the repo root run: source ~/.nvm/nvm.sh && nvm use');
  }
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const outcome = allowMutations
      ? 'The outcome of this mutation is unknown: Shopify may or may not have applied it.\n' +
        'Stopped. Run verify to read the actual state; apply resumes from whatever is left.\n'
      : '';
    throw new Error(
      `shopify store execute failed (exit ${result.status}).\n${result.stderr.trim()}\n\n${outcome}` +
        `If the error is about missing auth or scopes, run:\n` +
        `  shopify store auth --store ${store} --scopes ${allowMutations ? 'write_products' : 'read_products'}`,
    );
  }
  return parseCliJson(result.stdout);
}

function parseCliJson(stdout) {
  let parsed;
  try {
    parsed = JSON.parse(stdout);
  } catch {
    const start = stdout.indexOf('{');
    const end = stdout.lastIndexOf('}');
    if (start === -1 || end <= start) throw new Error(`Unexpected output from shopify store execute:\n${stdout}`);
    parsed = JSON.parse(stdout.slice(start, end + 1));
  }
  return parsed && typeof parsed === 'object' && 'data' in parsed ? parsed.data : parsed;
}

function fetchState(store, apiVersion, definitions) {
  const ownerTypes = OWNER_TYPES.filter((ownerType) => definitions.some((d) => d.ownerType === ownerType));
  const { query, variables } = buildLookup(definitions, ownerTypes);
  const data = shopifyExecute({ store, apiVersion, query, variables });

  const existing = definitions.map((definition, index) => {
    const connection = data?.[`d${index}`];
    if (!connection) throw new Error(`Lookup for ${describe(definition)} returned no data`);
    return connection.nodes.find((node) => node.namespace === definition.namespace && node.key === definition.key) ?? null;
  });

  const pinned = {};
  ownerTypes.forEach((ownerType, index) => {
    const connection = data?.[`pinned${index}`];
    if (!connection) throw new Error(`Pinned-definition lookup for ${ownerType} returned no data`);
    if (connection.pageInfo?.hasNextPage) {
      throw new Error(`More than 250 pinned ${ownerType} definitions were returned; refusing to guess the admin order`);
    }
    pinned[ownerType] = connection.nodes;
  });

  return { existing, pinned, ownerTypes };
}

function assess(store, schema, definitions) {
  const state = fetchState(store, schema.apiVersion, definitions);
  const rows = definitions.map((definition, index) => ({
    definition,
    existing: state.existing[index],
    result: compareDefinition(definition, state.existing[index]),
  }));
  const orders = state.ownerTypes.map((ownerType) => {
    const expected = definitions.filter((d) => d.ownerType === ownerType && d.pin).map(handleOf);
    return { ownerType, ...compareOrder(expected, state.pinned[ownerType]) };
  });
  return { rows, orders, summary: summarize(rows, orders) };
}

function runPinMutation(store, apiVersion, action, definition) {
  const isPin = action === 'pin';
  const data = shopifyExecute({
    store,
    apiVersion,
    query: isPin ? PIN_MUTATION : UNPIN_MUTATION,
    variables: { identifier: { ownerType: definition.ownerType, namespace: definition.namespace, key: definition.key } },
    allowMutations: true,
  });
  const payload = data?.[isPin ? 'metafieldDefinitionPin' : 'metafieldDefinitionUnpin'];
  const result = payload?.[isPin ? 'pinnedDefinition' : 'unpinnedDefinition'];
  const userErrors = payload?.userErrors ?? [];
  const confirmed =
    result &&
    result.namespace === definition.namespace &&
    result.key === definition.key &&
    (isPin ? Number.isInteger(result.pinnedPosition) : result.pinnedPosition === null);
  return { ok: !userErrors.length && confirmed, result, userErrors };
}

// ---------------------------------------------------------------------------
// Reporting

function describe(definition) {
  return `${definition.ownerType} ${definition.namespace}.${definition.key}`;
}

function handleOf(definition) {
  return `${definition.namespace}.${definition.key}`;
}

function formatList(list) {
  return `[${list.join(', ')}]`;
}

function formatSpec(definition) {
  const validations = Object.entries(definition.validations).map(
    ([name, value]) => `${name}: ${Array.isArray(value) ? value.join(' | ') : canonical(value)}`,
  );
  return validations.length ? `${definition.type} (${validations.join('; ')})` : definition.type;
}

function formatUserErrors(userErrors) {
  return userErrors.map((e) => `      ${e.code ?? 'ERROR'}: ${e.message}${e.field ? ` (${e.field.join('.')})` : ''}`);
}

function printHeader({ schema, mode, store }) {
  console.log('Zita V2 metafield definitions');
  console.log(`  Schema       ${relative(process.cwd(), SCHEMA_PATH) || SCHEMA_PATH}`);
  console.log(`  Namespace    ${schema.namespace}`);
  console.log(`  API version  ${schema.apiVersion}`);
  if (store) console.log(`  Store        ${store}`);
  console.log(`  Mode         ${mode}`);
}

function printDefinitions(rows) {
  const keyWidth = Math.max(...rows.map(({ definition }) => handleOf(definition).length));
  console.log('\nDEFINITIONS');
  for (const ownerType of OWNER_TYPES) {
    const group = rows.filter(({ definition }) => definition.ownerType === ownerType);
    if (!group.length) continue;
    console.log(`\n${ownerType}`);
    for (const { definition, result } of group) {
      const count = typeof result.metafieldsCount === 'number' ? `  [${result.metafieldsCount} values]` : '';
      console.log(`  ${result.status.padEnd(17)}  ${handleOf(definition).padEnd(keyWidth)}  ${formatSpec(definition)}${count}`);
      for (const conflict of result.conflicts) console.log(`      conflict: ${conflict}`);
      for (const note of result.notes) console.log(`      note: ${note}`);
    }
  }
}

function printOrders(orders, rows) {
  const missing = new Set(rows.filter(({ result }) => result.status === 'MISSING').map(({ definition }) => describe(definition)));
  console.log('\nADMIN DISPLAY ORDER (pinned definitions, top to bottom)');

  for (const order of orders) {
    const label = order.ownerType.padEnd(10);
    if (order.matches) {
      const extra = order.interleaved ? `; ${order.interleaved} pinned definition(s) outside the schema sit between them` : '';
      console.log(`\n${label}  matches (${order.expected.length} in schema order${extra})`);
      continue;
    }

    console.log(`\n${label}  DIFFERS${order.ambiguous ? ' (Zita definitions share a pinnedPosition, so the order is ambiguous)' : ''}`);
    const current = order.display.map(
      (entry, i) => `${String(i + 1).padStart(3)}. ${entry.handle}${order.managed.has(entry.handle) ? '' : '  (not in schema)'}`,
    );
    for (const handle of order.unpinned) {
      current.push(`     ${handle}  (${missing.has(`${order.ownerType} ${handle}`) ? 'missing' : 'not pinned'})`);
    }
    if (!current.length) current.push('     (nothing pinned)');
    const expected = order.expected.map((handle, i) => `${String(i + 1).padStart(3)}. ${handle}`);
    const width = Math.max(32, ...current.map((line) => line.length)) + 4;

    console.log(`  ${'CURRENT'.padEnd(width)}EXPECTED`);
    for (let i = 0; i < Math.max(current.length, expected.length); i += 1) {
      console.log(`  ${(current[i] ?? '').padEnd(width)}${expected[i] ?? ''}`);
    }
    if (order.ambiguous) {
      console.log('  apply will not reorder this owner type: Shopify normally keeps pinned positions unique, so review it in the admin');
    } else {
      const steps = order.moves.map(({ handle, pinned }) => (pinned ? `${handle} (unpin, pin)` : `${handle} (pin)`));
      console.log(`  apply re-pins, in this order: ${steps.join(', ')}`);
    }
    if (order.display.some((entry) => !order.managed.has(entry.handle))) {
      console.log('  definitions outside the schema are not moved; re-pinned Zita definitions go above them');
    }
    const afterPins = order.display.length + order.unpinned.length;
    if (afterPins > PINNED_LIMIT) {
      console.log(`  warning: ${afterPins} pinned definitions would exceed Shopify's limit of ${PINNED_LIMIT}; pinning may fail`);
    }
  }
}

function summarize(rows, orders) {
  const count = (status) => rows.filter(({ result }) => result.status === status).length;
  return {
    expected: rows.length,
    missing: count('MISSING'),
    compatible: count('EXISTS-COMPATIBLE'),
    conflict: count('CONFLICT'),
    orderDiffs: orders.filter((order) => !order.matches).length,
  };
}

function printSummary(summary) {
  console.log(
    `\n${summary.expected} expected · ${summary.missing} missing · ` +
      `${summary.compatible} exists-compatible · ${summary.conflict} conflict · ` +
      `${summary.orderDiffs} owner type(s) with Admin order differences`,
  );
}

function report(assessment) {
  printDefinitions(assessment.rows);
  printOrders(assessment.orders, assessment.rows);
  printSummary(assessment.summary);
}

// ---------------------------------------------------------------------------
// Modes

function ambiguousOwners(assessment) {
  return assessment.orders
    .filter((order) => order.ambiguous)
    .map((order) => order.ownerType)
    .join(', ');
}

function createMissing(store, schema, rows) {
  const missing = rows.filter(({ result }) => result.status === 'MISSING').map(({ definition }) => definition);
  if (!missing.length) return { ok: true, count: 0 };

  console.log(`\nCreating ${missing.length} definition(s) on ${store}:`);
  for (const [index, definition] of missing.entries()) {
    const data = shopifyExecute({
      store,
      apiVersion: schema.apiVersion,
      query: CREATE_MUTATION,
      variables: { definition: toCreateInput(definition) },
      allowMutations: true,
    });
    const payload = data?.metafieldDefinitionCreate;
    const userErrors = payload?.userErrors ?? [];
    if (userErrors.length || !payload?.createdDefinition) {
      console.log(`  FAILED   ${describe(definition)}`);
      for (const line of formatUserErrors(userErrors)) console.log(line);
      console.log(`\nStopped after creating ${index} of ${missing.length}. Run verify before retrying.`);
      return { ok: false, count: index };
    }
    console.log(`  CREATED  ${describe(definition)}  ${payload.createdDefinition.id}`);
  }
  return { ok: true, count: missing.length };
}

function reconcileOrder(store, schema, definitions, orders) {
  const byHandle = new Map(definitions.map((d) => [`${d.ownerType} ${handleOf(d)}`, d]));
  let mutations = 0;

  for (const order of orders.filter((o) => !o.matches)) {
    console.log(`\nReordering ${order.ownerType} (${order.moves.length} definition(s) to re-pin):`);
    for (const move of order.moves) {
      const definition = byHandle.get(`${order.ownerType} ${move.handle}`);
      const steps = move.pinned ? ['unpin', 'pin'] : ['pin'];
      for (const action of steps) {
        const outcome = runPinMutation(store, schema.apiVersion, action, definition);
        mutations += 1;
        if (!outcome.ok) {
          console.log(`  FAILED   ${action} ${describe(definition)}`);
          for (const line of formatUserErrors(outcome.userErrors)) console.log(line);
          if (!outcome.userErrors.length) console.log('      Shopify did not confirm the expected pinned state.');
          console.log('\nStopped. Run verify to read the actual order; apply resumes from there.');
          return { ok: false, mutations };
        }
        const position = action === 'pin' ? `  pinnedPosition ${outcome.result.pinnedPosition}` : '';
        console.log(`  ${action === 'pin' ? 'PINNED  ' : 'UNPINNED'} ${describe(definition)}${position}`);
      }
    }
  }
  return { ok: true, mutations };
}

// ---------------------------------------------------------------------------
// CLI

const USAGE = `Usage:
  node scripts/metafields/provision.mjs check
      Validate definitions.json offline and list the EXPECTED definitions in Admin order. No store access.
  node scripts/metafields/provision.mjs verify --store <shop>.myshopify.com
      Read-only. Reports MISSING / EXISTS-COMPATIBLE / CONFLICT for every definition, and
      whether the Admin display order of each owner type matches the schema.
  node scripts/metafields/provision.mjs apply --store <shop>.myshopify.com --confirm-store <shop>.myshopify.com
      Verifies first and stops on any conflict. Then creates MISSING definitions and re-pins
      Zita definitions until each owner type's Admin order matches the schema.`;

function requireStore(value, flag) {
  if (!value) throw new UsageError(`${flag} is required.`);
  if (!STORE_PATTERN.test(value)) throw new UsageError(`${flag} must be a <shop>.myshopify.com domain, got "${value}".`);
  return value;
}

class UsageError extends Error {}

function main(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      store: { type: 'string' },
      'confirm-store': { type: 'string' },
      help: { type: 'boolean', short: 'h' },
    },
  });

  if (values.help) {
    console.log(USAGE);
    return 0;
  }

  const mode = positionals[0];
  if (!['check', 'verify', 'apply'].includes(mode) || positionals.length > 1) {
    throw new UsageError('Choose exactly one mode: check, verify or apply.');
  }

  const schema = loadSchema();
  const definitions = expectedDefinitions(schema);
  const errors = checkSchema(schema);
  if (errors.length) {
    console.error('definitions.json is invalid:');
    for (const error of errors) console.error(`  - ${error}`);
    return 1;
  }

  if (mode === 'check') {
    if (values.store || values['confirm-store']) throw new UsageError('check runs offline and takes no store flags.');
    printHeader({ schema, mode: 'check (offline, no store access)' });
    console.log('\nEach owner type is listed in its Admin display order, top to bottom.');
    printDefinitions(definitions.map((definition) => ({ definition, result: { status: 'EXPECTED', conflicts: [], notes: [] } })));
    console.log(`\n${definitions.length} expected definitions. Schema is valid.`);
    return 0;
  }

  const store = requireStore(values.store, '--store');
  const applyCommand = `node scripts/metafields/provision.mjs apply --store ${store} --confirm-store ${store}`;

  if (mode === 'verify') {
    if (values['confirm-store']) throw new UsageError('--confirm-store is only used with apply.');
    printHeader({ schema, mode: 'verify (read-only)', store });
    const assessment = assess(store, schema, definitions);
    report(assessment);
    const { summary } = assessment;
    if (summary.conflict) {
      console.log('\nConflicts need a manual decision; apply will not run until they are resolved. Nothing was changed.');
      return 1;
    }
    if (summary.missing || summary.orderDiffs) {
      console.log(`\nNothing was changed. To create missing definitions and reconcile Admin order:\n  ${applyCommand}`);
    } else {
      console.log('\nAll definitions exist, are compatible and are in Admin order. Nothing was changed.');
    }
    return 0;
  }

  if (requireStore(values['confirm-store'], '--confirm-store') !== store) {
    throw new UsageError('--confirm-store must repeat the exact --store domain.');
  }

  printHeader({ schema, mode: 'apply (create missing definitions, reconcile Admin order)', store });
  let assessment = assess(store, schema, definitions);
  report(assessment);

  if (assessment.summary.conflict) {
    console.log(`\nApply stopped: ${assessment.summary.conflict} conflict(s). Nothing was created or reordered.`);
    return 1;
  }
  const ambiguous = ambiguousOwners(assessment);
  if (ambiguous) {
    console.log(`\nApply stopped: ambiguous Admin order for ${ambiguous}. Nothing was created or reordered.`);
    return 1;
  }
  if (!assessment.summary.missing && !assessment.summary.orderDiffs) {
    console.log('\nNothing to create and Admin order already matches. Nothing was changed.');
    return 0;
  }

  const created = createMissing(store, schema, assessment.rows);
  if (!created.ok) return 1;

  if (created.count) {
    console.log('\nRe-reading the store after creating definitions.');
    assessment = assess(store, schema, definitions);
    if (assessment.summary.conflict || assessment.summary.missing || ambiguousOwners(assessment)) {
      report(assessment);
      console.log('\nUnexpected state after creating definitions. Stopped before reordering.');
      return 1;
    }
  }

  const reordered = reconcileOrder(store, schema, definitions, assessment.orders);
  if (!reordered.ok) return 1;

  console.log('\nRe-verifying:');
  const after = assess(store, schema, definitions);
  report(after);
  const { summary } = after;
  return summary.missing || summary.conflict || summary.orderDiffs ? 1 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    const usage = error instanceof UsageError || error.code?.startsWith?.('ERR_PARSE_ARGS');
    console.error(`\n${error.message}`);
    if (usage) console.error(`\n${USAGE}`);
    process.exitCode = usage ? 2 : 1;
  }
}
