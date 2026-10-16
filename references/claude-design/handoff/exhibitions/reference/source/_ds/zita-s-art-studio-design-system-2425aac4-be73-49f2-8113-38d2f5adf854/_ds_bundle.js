/* @ds-bundle: {"format":4,"namespace":"ZitaSArtStudioDesignSystem_2425aa","components":[{"name":"ArtworkCard","sourcePath":"components/art/ArtworkCard.jsx"},{"name":"ArtworkPlate","sourcePath":"components/art/ArtworkPlate.jsx"},{"name":"Badge","sourcePath":"components/art/Badge.jsx"},{"name":"PriceTag","sourcePath":"components/art/PriceTag.jsx"},{"name":"SeriesTile","sourcePath":"components/art/SeriesTile.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"TextLink","sourcePath":"components/core/TextLink.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"QuantityStepper","sourcePath":"components/forms/QuantityStepper.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/art/ArtworkCard.jsx":"ed9e6f033620","components/art/ArtworkPlate.jsx":"43ec3f589218","components/art/Badge.jsx":"f76145326df3","components/art/PriceTag.jsx":"0c743c7b439d","components/art/SeriesTile.jsx":"f6f69ee73201","components/core/Button.jsx":"6ab88c148cc9","components/core/Icon.jsx":"3dd44163c770","components/core/IconButton.jsx":"c9f7704a833e","components/core/TextLink.jsx":"cc46d7c369d6","components/feedback/Dialog.jsx":"d14a74803092","components/feedback/Tag.jsx":"f1c6e66a2761","components/feedback/Toast.jsx":"70c422e720a9","components/feedback/Tooltip.jsx":"46fc76c7c830","components/forms/Checkbox.jsx":"39ba16d60050","components/forms/QuantityStepper.jsx":"ac8949058ce2","components/forms/Radio.jsx":"b79e5d240f4f","components/forms/Select.jsx":"59931fafdede","components/forms/Switch.jsx":"85db194ea102","components/forms/TextField.jsx":"13e3a360e264","components/navigation/Accordion.jsx":"6f20fb2683ab","components/navigation/SiteHeader.jsx":"bcd5a4e5be6b","components/navigation/Tabs.jsx":"83a63bf250fb","ui_kits/storefront/App.jsx":"751b21627f9f","ui_kits/storefront/Artwork.jsx":"cbcc14e64c32","ui_kits/storefront/Bag.jsx":"44a9feca24ed","ui_kits/storefront/Commissions.jsx":"be3b4911709d","ui_kits/storefront/Footer.jsx":"838dfbe50c18","ui_kits/storefront/Home.jsx":"ee8979a8c700","ui_kits/storefront/Story.jsx":"44f708e074bc","ui_kits/storefront/Works.jsx":"bde9cb31b50e","ui_kits/storefront/data.js":"f910cac6a541"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ZitaSArtStudioDesignSystem_2425aa = window.ZitaSArtStudioDesignSystem_2425aa || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/art/ArtworkPlate.jsx
try { (() => {
const {
  useState
} = React;
const MATS = {
  mat: 'var(--surface-mat)',
  page: 'var(--surface-page)',
  mist: 'var(--surface-mist)',
  ink: 'var(--ink-950)',
  none: 'transparent'
};
function ArtworkPlate({
  src,
  alt = '',
  height,
  aspectRatio,
  mat = 'mat',
  padding = 'clamp(16px, 7%, 64px)',
  shadow = true,
  hover = false,
  onClick,
  style
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      height,
      aspectRatio,
      width: '100%',
      boxSizing: 'border-box',
      padding,
      background: hover && h && mat === 'mat' ? 'var(--surface-mist)' : MATS[mat] || MATS.mat,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background var(--dur-slow) var(--ease-pour)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    loading: "lazy",
    style: {
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto',
      objectFit: 'contain',
      boxShadow: shadow ? 'var(--shadow-hang)' : 'none',
      transform: hover && h ? 'translateY(-4px)' : 'none',
      transition: 'transform var(--dur-slow) var(--ease-pour)'
    }
  }));
}
Object.assign(__ds_scope, { ArtworkPlate });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/art/ArtworkPlate.jsx", error: String((e && e.message) || e) }); }

// components/art/Badge.jsx
try { (() => {
const T = {
  neutral: {
    bg: 'transparent',
    fg: 'var(--text-secondary)',
    bd: 'var(--border-hairline)'
  },
  teal: {
    bg: 'var(--teal-50)',
    fg: 'var(--teal-800)',
    bd: 'var(--teal-50)'
  },
  copper: {
    bg: 'var(--copper-100)',
    fg: 'var(--copper-700)',
    bd: 'var(--copper-100)'
  },
  ink: {
    bg: 'var(--ink-900)',
    fg: 'var(--canvas-50)',
    bd: 'var(--ink-900)'
  },
  sold: {
    bg: 'transparent',
    fg: 'var(--text-primary)',
    bd: 'transparent'
  }
};
function Badge({
  children,
  tone = 'neutral',
  style
}) {
  const t = T[tone] || T.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 22,
      padding: tone === 'sold' ? 0 : '0 8px',
      boxSizing: 'border-box',
      background: t.bg,
      color: t.fg,
      border: '1px solid ' + t.bd,
      borderRadius: 2,
      fontFamily: 'var(--font-display)',
      fontSize: 10.5,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, tone === 'sold' ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--copper-500)'
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/art/Badge.jsx", error: String((e && e.message) || e) }); }

// components/art/PriceTag.jsx
try { (() => {
function PriceTag({
  amount,
  currency = 'USD',
  compareAt,
  note,
  size = 'md',
  soldOut,
  style
}) {
  const fmt = n => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: n % 1 ? 2 : 0
  }).format(n);
  const fs = size === 'lg' ? 26 : size === 'sm' ? 15 : 18;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 10,
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: size === 'lg' ? 'var(--font-display)' : 'var(--font-serif)',
      fontSize: fs,
      color: soldOut ? 'var(--text-muted)' : 'var(--text-primary)',
      textDecoration: soldOut ? 'line-through' : 'none'
    }
  }, fmt(amount)), compareAt ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: fs * 0.82,
      color: 'var(--text-muted)',
      textDecoration: 'line-through'
    }
  }, fmt(compareAt)) : null, note ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: Math.max(14, fs * 0.8),
      color: 'var(--text-secondary)'
    }
  }, note) : null);
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/art/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/art/ArtworkCard.jsx
try { (() => {
const {
  useState
} = React;
function ArtworkCard({
  src,
  alt,
  title,
  series,
  medium,
  dimensions,
  price,
  priceNote,
  currency,
  status = 'available',
  plateHeight = 380,
  mat = 'mat',
  onClick,
  style
}) {
  const [h, setH] = useState(false);
  const sold = status === 'sold';
  return /*#__PURE__*/React.createElement("article", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      cursor: onClick ? 'pointer' : 'default',
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ArtworkPlate, {
    src: src,
    alt: alt || title,
    height: plateHeight,
    mat: mat,
    hover: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 18,
      display: 'grid',
      gap: 6
    }
  }, series ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 10.5,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--text-metal)'
    }
  }, series) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 19,
      lineHeight: 1.25,
      color: h ? 'var(--text-accent)' : 'var(--text-primary)',
      transition: 'color var(--dur-fast) var(--ease-out)'
    }
  }, title), sold ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "sold"
  }, "Sold") : price != null ? /*#__PURE__*/React.createElement(__ds_scope.PriceTag, {
    amount: price,
    currency: currency,
    size: "sm"
  }) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 15,
      lineHeight: 1.45,
      color: 'var(--text-secondary)'
    }
  }, [medium, dimensions].filter(Boolean).join(' · '), priceNote ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, ' · ' + priceNote) : null), status === 'print' || status === 'reserved' ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: status === 'print' ? 'neutral' : 'copper'
  }, status === 'print' ? 'Prints available' : 'Reserved')) : null));
}
Object.assign(__ds_scope, { ArtworkCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/art/ArtworkCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
const {
  useState,
  useEffect
} = React;
const pascal = n => n.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
/** Lucide line icon (thin 1.25 stroke). Requires the Lucide UMD script on the page. */
function Icon({
  name,
  size = 20,
  strokeWidth = 1.25,
  color = 'currentColor',
  title,
  style
}) {
  const [, force] = useState(0);
  const lib = typeof window !== 'undefined' ? window.lucide : null;
  useEffect(() => {
    if (lib) return;
    const t = setInterval(() => {
      if (window.lucide) {
        clearInterval(t);
        force(x => x + 1);
      }
    }, 120);
    return () => clearInterval(t);
  }, [lib]);
  let node = lib && (lib.icons && lib.icons[pascal(name)] || lib[pascal(name)]);
  let kids = [];
  if (Array.isArray(node)) kids = node[0] === 'svg' ? node[2] || [] : node;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": title ? undefined : true,
    role: title ? 'img' : undefined,
    style: {
      display: 'inline-block',
      flex: 'none',
      verticalAlign: 'middle',
      ...style
    }
  }, title ? /*#__PURE__*/React.createElement("title", null, title) : null, kids.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const V = {
  primary: {
    bg: 'var(--action-primary)',
    bgH: 'var(--action-primary-hover)',
    fg: 'var(--action-primary-text)',
    fgH: 'var(--action-primary-text)',
    bd: 'var(--action-primary)',
    bdH: 'var(--action-primary-hover)'
  },
  secondary: {
    bg: 'transparent',
    bgH: 'var(--ink-900)',
    fg: 'var(--text-primary)',
    fgH: 'var(--text-inverse)',
    bd: 'var(--ink-900)',
    bdH: 'var(--ink-900)'
  },
  ghost: {
    bg: 'transparent',
    bgH: 'transparent',
    fg: 'var(--text-primary)',
    fgH: 'var(--text-accent)',
    bd: 'transparent',
    bdH: 'transparent'
  },
  inverse: {
    bg: 'var(--canvas-50)',
    bgH: 'var(--canvas-0)',
    fg: 'var(--ink-900)',
    fgH: 'var(--teal-700)',
    bd: 'var(--canvas-50)',
    bdH: 'var(--canvas-0)'
  }
};
const S = {
  sm: [36, 16, 12],
  md: [48, 24, 13],
  lg: [56, 32, 14]
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  fullWidth,
  disabled,
  href,
  onClick,
  type = 'button',
  style
}) {
  const [h, setH] = useState(false);
  const v = V[variant] || V.primary;
  const [ht, px, fs] = S[size] || S.md;
  const on = h && !disabled;
  const css = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: ht,
    padding: variant === 'ghost' ? '0 4px' : '0 ' + px + 'px',
    boxSizing: 'border-box',
    background: on ? v.bgH : v.bg,
    color: on ? v.fgH : v.fg,
    border: '1px solid ' + (on ? v.bdH : v.bd),
    borderRadius: 0,
    fontFamily: 'var(--font-display)',
    fontSize: fs,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    lineHeight: 1,
    textDecoration: variant === 'ghost' && on ? 'underline' : 'none',
    textUnderlineOffset: '0.4em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
    ...style
  };
  const inner = [iconStart && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    key: "s",
    name: iconStart,
    size: fs + 5
  }), /*#__PURE__*/React.createElement("span", {
    key: "l"
  }, children), iconEnd && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    key: "e",
    name: iconEnd,
    size: fs + 5,
    style: {
      transform: on ? 'translateX(3px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-pour)'
    }
  })];
  const events = {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  };
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: onClick,
    style: css
  }, events), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: css
  }, events), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const {
  useState
} = React;
function IconButton({
  icon,
  label,
  variant = 'plain',
  size = 'md',
  badge,
  onClick,
  disabled,
  tone = 'light',
  style
}) {
  const [h, setH] = useState(false);
  const d = {
    sm: 36,
    md: 44,
    lg: 52
  }[size] || 44;
  const dark = tone === 'dark';
  const fg = dark ? 'var(--canvas-50)' : 'var(--text-primary)';
  const base = variant === 'filled' ? {
    background: h ? 'var(--action-primary-hover)' : 'var(--action-primary)',
    color: 'var(--canvas-0)',
    border: '1px solid transparent'
  } : variant === 'outline' ? {
    background: h ? dark ? 'rgba(255,255,255,.08)' : 'var(--surface-mist)' : 'transparent',
    color: fg,
    border: '1px solid ' + (dark ? 'var(--stone-600)' : 'var(--border-hairline)')
  } : {
    background: 'transparent',
    color: h ? dark ? 'var(--teal-300)' : 'var(--text-accent)' : fg,
    border: '1px solid transparent'
  };
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    title: label,
    onClick: onClick,
    disabled: disabled,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      position: 'relative',
      width: d,
      height: d,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      borderRadius: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'all var(--dur-fast) var(--ease-out)',
      ...base,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(d * 0.46)
  }), badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 4,
      right: 2,
      minWidth: 16,
      height: 16,
      padding: '0 4px',
      boxSizing: 'border-box',
      borderRadius: 999,
      background: 'var(--copper-600)',
      color: 'var(--canvas-0)',
      fontFamily: 'var(--font-display)',
      fontSize: 10,
      lineHeight: '16px',
      textAlign: 'center'
    }
  }, badge) : null);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/TextLink.jsx
try { (() => {
const {
  useState
} = React;
function TextLink({
  children,
  href = '#',
  variant = 'inline',
  onClick,
  tone = 'light',
  style
}) {
  const [h, setH] = useState(false);
  const dark = tone === 'dark';
  if (variant === 'label') {
    return /*#__PURE__*/React.createElement("a", {
      href: href,
      onClick: onClick,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-display)',
        fontSize: 13,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: h ? 'var(--copper-600)' : dark ? 'var(--canvas-50)' : 'var(--text-primary)',
        textDecoration: 'none',
        paddingBottom: 6,
        borderBottom: '1px solid ' + (h ? 'var(--copper-600)' : dark ? 'var(--stone-500)' : 'var(--border-hairline)'),
        transition: 'all var(--dur-fast) var(--ease-out)',
        ...style
      }
    }, children, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "arrow-right",
      size: 16,
      style: {
        transform: h ? 'translateX(4px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-pour)'
      }
    }));
  }
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      color: h ? 'var(--link-hover)' : dark ? 'var(--teal-300)' : 'var(--link)',
      textDecoration: 'underline',
      textDecorationThickness: 1,
      textUnderlineOffset: '0.22em',
      fontFamily: 'inherit',
      transition: 'color var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/art/SeriesTile.jsx
try { (() => {
function SeriesTile({
  src,
  alt,
  eyebrow = 'Series',
  title,
  description,
  count,
  reverse,
  cta = 'View the series',
  href = '#',
  onClick,
  plateHeight = 560,
  mat = 'mat',
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: reverse ? 'minmax(0,5fr) minmax(0,7fr)' : 'minmax(0,7fr) minmax(0,5fr)',
      gap: 'clamp(32px, 6vw, 96px)',
      alignItems: 'end',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      order: reverse ? 2 : 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ArtworkPlate, {
    src: src,
    alt: alt || title,
    height: plateHeight,
    mat: mat,
    onClick: onClick,
    hover: !!onClick
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      order: reverse ? 1 : 2,
      paddingBottom: 12,
      display: 'grid',
      gap: 20,
      maxWidth: 440
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--text-metal)'
    }
  }, eyebrow, count ? ' · ' + count + ' works' : ''), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'var(--fs-h1)',
      lineHeight: 1.1,
      color: 'var(--text-primary)'
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)'
    }
  }, description) : null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    variant: "label",
    href: href,
    onClick: onClick
  }, cta))));
}
Object.assign(__ds_scope, { SeriesTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/art/SeriesTile.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
const {
  useEffect,
  useState
} = React;
function Dialog({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  placement = 'center',
  width,
  style
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (open) {
      const r = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(r);
    }
    setShown(false);
  }, [open]);
  if (!open) return null;
  const right = placement === 'right';
  const w = width || (right ? 440 : 560);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'var(--scrim)',
      opacity: shown ? 1 : 0,
      transition: 'opacity var(--dur-base) var(--ease-out)',
      display: 'flex',
      alignItems: right ? 'stretch' : 'center',
      justifyContent: right ? 'flex-end' : 'center',
      padding: right ? 0 : 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: w,
      maxWidth: '100%',
      maxHeight: right ? '100%' : 'calc(100vh - 48px)',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-page)',
      boxShadow: 'var(--shadow-overlay)',
      transform: shown ? 'none' : right ? 'translateX(32px)' : 'translateY(12px)',
      transition: 'transform var(--dur-slow) var(--ease-pour)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
      padding: '28px 28px 20px 32px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--text-metal)',
      marginBottom: 8
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 24,
      lineHeight: 1.2,
      color: 'var(--text-primary)'
    }
  }, title)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    size: "sm",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '24px 32px',
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--text-body)'
    }
  }, children), footer ? /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: '20px 32px 28px',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
const {
  useState
} = React;
function Tag({
  children,
  selected,
  onClick,
  onRemove,
  count,
  style
}) {
  const [h, setH] = useState(false);
  return /*#__PURE__*/React.createElement("span", {
    role: onClick ? 'button' : undefined,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 34,
      padding: onRemove ? '0 8px 0 14px' : '0 14px',
      boxSizing: 'border-box',
      borderRadius: 2,
      border: '1px solid ' + (selected ? 'var(--ink-900)' : h ? 'var(--stone-500)' : 'var(--border-hairline)'),
      background: selected ? 'var(--ink-900)' : 'transparent',
      color: selected ? 'var(--canvas-50)' : 'var(--text-primary)',
      fontFamily: 'var(--font-serif)',
      fontSize: 16,
      cursor: onClick ? 'pointer' : 'default',
      userSelect: 'none',
      transition: 'all var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, children, count != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: selected ? 'var(--stone-400)' : 'var(--text-muted)'
    }
  }, count) : null, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    style: {
      border: 0,
      background: 'transparent',
      padding: 2,
      color: 'inherit',
      cursor: 'pointer',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14
  })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  message,
  detail,
  actionLabel,
  onAction,
  onClose,
  icon = 'check',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      minWidth: 320,
      maxWidth: 440,
      padding: '16px 16px 16px 20px',
      boxSizing: 'border-box',
      background: 'var(--ink-900)',
      color: 'var(--canvas-50)',
      boxShadow: 'var(--shadow-overlay)',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    style: {
      color: 'var(--teal-300)'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-serif)',
      fontSize: 16,
      lineHeight: 1.4
    }
  }, message, detail ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--stone-400)'
    }
  }, detail) : null), actionLabel ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--canvas-50)',
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      textDecoration: 'underline',
      textUnderlineOffset: '0.4em',
      cursor: 'pointer',
      padding: 0
    }
  }, actionLabel) : null, onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Dismiss",
    onClick: onClose,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--stone-400)',
      cursor: 'pointer',
      padding: 4,
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const {
  useState
} = React;
function Tooltip({
  label,
  children,
  placement = 'top',
  style
}) {
  const [h, setH] = useState(false);
  const top = placement === 'top';
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    onFocus: () => setH(true),
    onBlur: () => setH(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      left: '50%',
      [top ? 'bottom' : 'top']: 'calc(100% + 8px)',
      transform: 'translateX(-50%) translateY(' + (h ? 0 : top ? 4 : -4) + 'px)',
      opacity: h ? 1 : 0,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      padding: '6px 10px',
      background: 'var(--ink-900)',
      color: 'var(--canvas-50)',
      fontFamily: 'var(--font-serif)',
      fontSize: 14,
      lineHeight: 1.3,
      transition: 'all var(--dur-fast) var(--ease-out)',
      zIndex: 10
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  name,
  style
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const toggle = e => {
    if (disabled) return;
    if (checked === undefined) setInner(!on);
    onChange && onChange(!on, e);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: toggle,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: name,
    checked: on,
    readOnly: true,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 18,
      height: 18,
      marginTop: 3,
      boxSizing: 'border-box',
      border: '1px solid ' + (on ? 'var(--teal-700)' : 'var(--ink-900)'),
      background: on ? 'var(--teal-700)' : 'var(--canvas-0)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--canvas-0)',
      transition: 'all var(--dur-fast) var(--ease-out)'
    }
  }, on ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    strokeWidth: 2
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      lineHeight: 1.45,
      color: 'var(--text-primary)'
    }
  }, label, description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 15,
      color: 'var(--text-secondary)'
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/QuantityStepper.jsx
try { (() => {
function QuantityStepper({
  value = 1,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
  style
}) {
  const h = size === 'sm' ? 36 : 44;
  const btn = dis => ({
    width: h,
    height: h - 2,
    border: 0,
    background: 'transparent',
    color: 'var(--text-primary)',
    cursor: dis ? 'not-allowed' : 'pointer',
    opacity: dis ? 0.3 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid var(--border-hairline)',
      background: 'var(--canvas-0)',
      height: h,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Decrease",
    disabled: value <= min,
    onClick: () => onChange && onChange(Math.max(min, value - 1)),
    style: btn(value <= min)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 28,
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 15,
      color: 'var(--text-primary)'
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Increase",
    disabled: value >= max,
    onClick: () => onChange && onChange(Math.min(max, value + 1)),
    style: btn(value >= max)
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 16
  })));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  description,
  meta,
  checked,
  onChange,
  value,
  name,
  disabled,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    onClick: () => !disabled && onChange && onChange(value),
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: !!checked,
    readOnly: true,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 18,
      height: 18,
      marginTop: 3,
      boxSizing: 'border-box',
      borderRadius: '50%',
      border: '1px solid ' + (checked ? 'var(--teal-700)' : 'var(--ink-900)'),
      background: 'var(--canvas-0)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--teal-700)',
      transform: checked ? 'scale(1)' : 'scale(0)',
      transition: 'transform var(--dur-fast) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      lineHeight: 1.45,
      color: 'var(--text-primary)'
    }
  }, label, description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 15,
      color: 'var(--text-secondary)'
    }
  }, description) : null), meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 16,
      color: 'var(--text-primary)'
    }
  }, meta) : null);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const {
  useState
} = React;
function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  name,
  style
}) {
  const [f, setF] = useState(false);
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      marginBottom: 8
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("select", {
    name: name,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: 50,
      padding: '0 44px 0 16px',
      boxSizing: 'border-box',
      background: 'var(--canvas-0)',
      border: '1px solid ' + (f ? 'var(--teal-700)' : 'var(--border-hairline)'),
      borderRadius: 2,
      outline: 'none',
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      color: 'var(--text-primary)',
      cursor: 'pointer'
    }
  }, placeholder ? /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder) : null, opts.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18,
    style: {
      position: 'absolute',
      right: 16,
      top: '50%',
      marginTop: -9,
      pointerEvents: 'none',
      color: 'var(--text-secondary)'
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": on,
    onClick: toggle,
    disabled: disabled,
    style: {
      position: 'relative',
      width: 38,
      height: 20,
      padding: 0,
      borderRadius: 999,
      border: '1px solid ' + (on ? 'var(--teal-700)' : 'var(--stone-400)'),
      background: on ? 'var(--teal-700)' : 'var(--canvas-200)',
      cursor: 'inherit',
      transition: 'all var(--dur-base) var(--ease-pour)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: on ? 20 : 2,
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: 'var(--canvas-0)',
      transition: 'left var(--dur-base) var(--ease-pour)'
    }
  })), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      color: 'var(--text-primary)'
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
const {
  useState
} = React;
function TextField({
  label,
  hint,
  error,
  placeholder,
  value,
  defaultValue,
  onChange,
  multiline,
  rows = 4,
  type = 'text',
  required,
  disabled,
  name,
  style
}) {
  const [f, setF] = useState(false);
  const bd = error ? 'var(--state-error)' : f ? 'var(--teal-700)' : 'var(--border-hairline)';
  const Tag = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      marginBottom: 8
    }
  }, label, required ? ' *' : '') : null, /*#__PURE__*/React.createElement(Tag, {
    name: name,
    type: multiline ? undefined : type,
    rows: multiline ? rows : undefined,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      display: 'block',
      width: '100%',
      boxSizing: 'border-box',
      padding: multiline ? '14px 16px' : '0 16px',
      height: multiline ? undefined : 50,
      resize: 'vertical',
      background: disabled ? 'var(--surface-mat)' : 'var(--canvas-0)',
      border: '1px solid ' + bd,
      boxShadow: f && !error ? 'inset 0 0 0 1px var(--teal-700)' : 'none',
      borderRadius: 2,
      outline: 'none',
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      lineHeight: 1.5,
      color: 'var(--text-primary)',
      transition: 'border-color var(--dur-fast) var(--ease-out)'
    }
  }), error || hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 6,
      fontFamily: 'var(--font-serif)',
      fontSize: 14,
      color: error ? 'var(--state-error)' : 'var(--text-muted)'
    }
  }, error || hint) : null);
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
const {
  useState
} = React;
function Accordion({
  items = [],
  defaultOpen = [],
  allowMultiple = true,
  style
}) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = id => setOpen(o => o.includes(id) ? o.filter(x => x !== id) : allowMultiple ? [...o, id] : [id]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-hairline)',
      ...style
    }
  }, items.map(it => {
    const on = open.includes(it.id);
    return /*#__PURE__*/React.createElement("div", {
      key: it.id,
      style: {
        borderBottom: '1px solid var(--border-hairline)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-expanded": on,
      onClick: () => toggle(it.id),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '18px 0',
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'var(--font-display)',
        fontSize: 13,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--text-primary)'
      }
    }, it.title, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: on ? 'minus' : 'plus',
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateRows: on ? '1fr' : '0fr',
        transition: 'grid-template-rows var(--dur-base) var(--ease-pour)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: 20,
        fontFamily: 'var(--font-serif)',
        fontSize: 17,
        lineHeight: 1.6,
        color: 'var(--text-body)'
      }
    }, it.content))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
const {
  useState
} = React;
function NavLink({
  label,
  active,
  dark,
  onClick
}) {
  const [h, setH] = useState(false);
  const c = dark ? 'var(--canvas-50)' : 'var(--text-primary)';
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick && onClick();
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: h && !active ? dark ? 'var(--teal-300)' : 'var(--text-accent)' : c,
      textDecoration: 'none',
      paddingBottom: 4,
      borderBottom: '1px solid ' + (active ? c : 'transparent'),
      transition: 'color var(--dur-fast) var(--ease-out)'
    }
  }, label);
}
function SiteHeader({
  links = [],
  active,
  onNavigate,
  cartCount = 0,
  onCart,
  onSearch,
  onHome,
  tone = 'light',
  style
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 'var(--header-h)',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: 24,
      padding: '0 var(--gutter)',
      background: dark ? 'var(--ink-950)' : tone === 'transparent' ? 'transparent' : 'var(--surface-page)',
      borderBottom: '1px solid ' + (dark ? 'var(--border-inverse)' : 'var(--border-subtle)'),
      ...style
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 28,
      flexWrap: 'wrap'
    }
  }, links.map(l => /*#__PURE__*/React.createElement(NavLink, {
    key: l.id,
    label: l.label,
    active: l.id === active,
    dark: dark,
    onClick: () => onNavigate && onNavigate(l.id)
  }))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onHome && onHome();
    },
    style: {
      textDecoration: 'none',
      textAlign: 'center',
      display: 'grid',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: dark ? 'var(--canvas-50)' : 'var(--ink-900)',
      lineHeight: 1
    }
  }, "Zita\u2019s"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 9,
      letterSpacing: '0.46em',
      textTransform: 'uppercase',
      color: dark ? 'var(--stone-400)' : 'var(--text-secondary)',
      lineHeight: 1,
      paddingLeft: '0.46em'
    }
  }, "Art Studio")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "search",
    label: "Search",
    onClick: onSearch,
    tone: dark ? 'dark' : 'light'
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "shopping-bag",
    label: "Bag",
    badge: cartCount || undefined,
    onClick: onCart,
    tone: dark ? 'dark' : 'light'
  })));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 32,
      borderBottom: '1px solid var(--border-hairline)',
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollbarWidth: 'none',
      ...style
    }
  }, tabs.map(t => {
    const on = t.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      role: "tab",
      "aria-selected": on,
      type: "button",
      onClick: () => onChange && onChange(t.id),
      style: {
        flex: 'none',
        padding: '0 0 14px',
        border: 0,
        boxShadow: on ? 'inset 0 -1px 0 var(--ink-900)' : 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: 'var(--font-display)',
        fontSize: 13,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: on ? 'var(--text-primary)' : 'var(--text-muted)',
        transition: 'color var(--dur-fast) var(--ease-out)'
      }
    }, t.label, t.count != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 8,
        color: 'var(--text-muted)'
      }
    }, t.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/App.jsx
try { (() => {
function App() {
  const {
    SiteHeader,
    Toast
  } = window.ZitaSArtStudioDesignSystem_2425aa;
  const saved = JSON.parse(localStorage.getItem('zita-kit-route') || '{"page":"home"}');
  const [route, setRoute] = React.useState(saved);
  const [bag, setBag] = React.useState([]);
  const [bagOpen, setBagOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const nav = r => {
    setRoute(r);
    localStorage.setItem('zita-kit-route', JSON.stringify(r));
    window.scrollTo(0, 0);
  };
  const go = (page, series) => nav({
    page,
    series: series || null,
    k: Date.now()
  });
  const openWork = id => nav({
    page: 'artwork',
    id
  });
  const addToBag = item => {
    setBag(b => {
      const ex = b.find(x => x.id === item.id);
      return ex ? b.map(x => x.id === item.id ? {
        ...x,
        qty: Math.min(5, x.qty + item.qty)
      } : x) : [...b, item];
    });
    setToast(item.work.title + ' was added to your bag');
    clearTimeout(window.__zt);
    window.__zt = setTimeout(() => setToast(null), 4000);
  };
  const links = [{
    id: 'works',
    label: 'Works'
  }, {
    id: 'commissions',
    label: 'Commissions'
  }, {
    id: 'story',
    label: 'Story'
  }];
  const active = route.page === 'artwork' ? 'works' : route.page;
  let screen;
  if (route.page === 'works') screen = /*#__PURE__*/React.createElement(WorksScreen, {
    key: route.k,
    initialSeries: route.series,
    openWork: openWork
  });else if (route.page === 'artwork') screen = /*#__PURE__*/React.createElement(ArtworkScreen, {
    id: route.id,
    openWork: openWork,
    addToBag: addToBag,
    go: go
  });else if (route.page === 'story') screen = /*#__PURE__*/React.createElement(StoryScreen, {
    go: go,
    openWork: openWork
  });else if (route.page === 'commissions') screen = /*#__PURE__*/React.createElement(CommissionsScreen, null);else screen = /*#__PURE__*/React.createElement(HomeScreen, {
    go: go,
    openWork: openWork
  });
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": route.page
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    links: links,
    active: active,
    onNavigate: id => go(id),
    onHome: () => go('home'),
    cartCount: bag.reduce((s, i) => s + i.qty, 0),
    onCart: () => setBagOpen(true),
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50
    }
  }), screen, /*#__PURE__*/React.createElement(SiteFooter, {
    go: go
  }), /*#__PURE__*/React.createElement(BagDrawer, {
    open: bagOpen,
    onClose: () => setBagOpen(false),
    items: bag,
    setQty: (id, q) => setBag(b => b.map(x => x.id === id ? {
      ...x,
      qty: q
    } : x)),
    remove: id => setBag(b => b.filter(x => x.id !== id))
  }), toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: 24,
      bottom: 24,
      zIndex: 90
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    message: toast,
    actionLabel: "View bag",
    onAction: () => {
      setToast(null);
      setBagOpen(true);
    },
    onClose: () => setToast(null)
  })) : null);
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Artwork.jsx
try { (() => {
function ArtworkScreen({
  id,
  openWork,
  addToBag,
  go
}) {
  const NS = window.ZitaSArtStudioDesignSystem_2425aa;
  const {
    ArtworkPlate,
    PriceTag,
    Radio,
    Select,
    QuantityStepper,
    Button,
    Accordion,
    Badge,
    Dialog,
    TextField,
    ArtworkCard,
    TextLink
  } = NS;
  const D = window.ZITA_DATA;
  const w = D.works.find(x => x.id === id) || D.works[0];
  const sold = w.status === 'sold';
  const printOnly = w.status === 'print';
  const [format, setFormat] = React.useState(sold || printOnly ? 'print' : 'original');
  const [size, setSize] = React.useState('Medium');
  const [qty, setQty] = React.useState(1);
  const [enquire, setEnquire] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => {
    setFormat(sold || printOnly ? 'print' : 'original');
    setQty(1);
  }, [id]);
  const sizes = {
    Small: 1,
    Medium: 1.6,
    Large: 2.4
  };
  const price = format === 'original' ? w.price : Math.round(w.printFrom * sizes[size]);
  const more = D.works.filter(x => x.series === w.series && x.id !== w.id).concat(D.works.filter(x => x.series !== w.series)).slice(0, 3);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '32px var(--gutter) 0',
      fontFamily: 'var(--font-serif)',
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('works');
    },
    style: {
      color: 'var(--text-secondary)',
      textDecoration: 'none'
    }
  }, "Works"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 8px'
    }
  }, "/"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('works', w.series);
    },
    style: {
      color: 'var(--text-secondary)',
      textDecoration: 'none'
    }
  }, D.seriesName(w.series)), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      margin: '0 8px'
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-primary)'
    }
  }, w.title)), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '32px var(--gutter) 0',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,7fr) minmax(0,4fr)',
      gap: 'clamp(32px,5vw,88px)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(ArtworkPlate, {
    src: w.src,
    alt: w.title + ' — ' + w.palette,
    height: "min(84vh, 900px)",
    mat: w.dark ? 'ink' : 'mat',
    shadow: !w.dark,
    padding: "clamp(24px,6%,72px)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 'calc(var(--header-h) + 32px)',
      display: 'grid',
      gap: 28,
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--text-metal)'
    }
  }, D.seriesName(w.series)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'var(--fs-h1)',
      lineHeight: 1.1,
      margin: 0
    }
  }, w.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      color: 'var(--text-secondary)'
    }
  }, w.medium, " \xB7 ", w.dimensions)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PriceTag, {
    amount: price,
    size: "lg",
    note: format === 'original' ? 'Original, signed' : 'Giclée print'
  }), sold ? /*#__PURE__*/React.createElement(Badge, {
    tone: "sold"
  }, "Original sold") : w.status === 'reserved' ? /*#__PURE__*/React.createElement(Badge, {
    tone: "copper"
  }, "Reserved") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, !printOnly ? /*#__PURE__*/React.createElement(Radio, {
    name: "fmt",
    value: "original",
    checked: format === 'original',
    onChange: setFormat,
    disabled: sold,
    label: "Original painting",
    description: sold ? 'This painting has found its home' : 'One of one, ready to hang',
    meta: '$' + w.price.toLocaleString(),
    style: {
      padding: '18px 0',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }) : null, /*#__PURE__*/React.createElement(Radio, {
    name: "fmt",
    value: "print",
    checked: format === 'print',
    onChange: setFormat,
    label: "Fine-art print",
    description: "Archival pigment on cotton rag, edition of 25",
    meta: 'from $' + w.printFrom,
    style: {
      padding: '18px 0',
      borderBottom: '1px solid var(--border-hairline)'
    }
  })), format === 'print' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Size",
    value: size,
    onChange: e => setSize(e.target.value),
    options: [{
      value: 'Small',
      label: 'Small · 30 cm'
    }, {
      value: 'Medium',
      label: 'Medium · 50 cm'
    }, {
      value: 'Large',
      label: 'Large · 76 cm'
    }],
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    max: 5,
    onChange: setQty,
    style: {
      height: 50
    }
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    size: "lg",
    disabled: format === 'original' && (sold || w.status === 'reserved'),
    onClick: () => addToBag({
      id: w.id + format + size,
      work: w,
      format,
      size: format === 'print' ? size : null,
      price,
      qty: format === 'print' ? qty : 1
    })
  }, "Add to bag"), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    variant: "secondary",
    onClick: () => {
      setSent(false);
      setEnquire(true);
    }
  }, "Enquire about this work")), /*#__PURE__*/React.createElement(Accordion, {
    defaultOpen: ['about'],
    items: [{
      id: 'about',
      title: 'About the work',
      content: 'Fluid acrylic poured and tilted on stretched canvas. Palette: ' + w.palette.toLowerCase() + '. Signed on the front.'
    }, {
      id: 'ship',
      title: 'Shipping & framing',
      content: 'Originals ship stretched and insured. Prints ship rolled in a tube, or framed on request.'
    }, {
      id: 'care',
      title: 'Care',
      content: 'Hang away from direct sun and humidity. Dust gently with a soft dry cloth.'
    }]
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--section-gap) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'var(--fs-h2)',
      margin: 0
    }
  }, "More from the studio"), /*#__PURE__*/React.createElement(TextLink, {
    variant: "label",
    onClick: e => {
      e.preventDefault();
      go('works', w.series);
    }
  }, 'View ' + D.seriesName(w.series))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
      gap: 'clamp(20px,3vw,48px)'
    }
  }, more.map(m => /*#__PURE__*/React.createElement(ArtworkCard, {
    key: m.id,
    src: m.src,
    title: m.title,
    series: D.seriesName(m.series),
    medium: m.medium,
    dimensions: m.dimensions,
    price: m.price,
    status: m.status,
    plateHeight: 380,
    onClick: () => openWork(m.id)
  })))), /*#__PURE__*/React.createElement(Dialog, {
    open: enquire,
    onClose: () => setEnquire(false),
    eyebrow: "Enquire",
    title: w.title,
    footer: sent ? /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      variant: "secondary",
      onClick: () => setEnquire(false)
    }, "Close") : /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      onClick: () => setSent(true)
    }, "Send enquiry")
  }, sent ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontStyle: 'italic'
    }
  }, "Thank you. Ranjeeta will reply personally, usually within two days.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "Ask about viewing, framing, shipping, or a work in a similar palette."), /*#__PURE__*/React.createElement(TextField, {
    label: "Name",
    required: true
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Email",
    type: "email",
    required: true
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Message",
    multiline: true,
    rows: 4,
    defaultValue: 'I’d love to know more about ' + w.title + '.'
  }))));
}
window.ArtworkScreen = ArtworkScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Artwork.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Bag.jsx
try { (() => {
function BagDrawer({
  open,
  onClose,
  items,
  setQty,
  remove
}) {
  const {
    Dialog,
    Button,
    QuantityStepper,
    ArtworkPlate,
    PriceTag
  } = window.ZitaSArtStudioDesignSystem_2425aa;
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    onClose: onClose,
    placement: "right",
    title: "Your bag",
    eyebrow: items.length + (items.length === 1 ? ' work' : ' works'),
    footer: items.length ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 13,
        letterSpacing: '0.16em',
        textTransform: 'uppercase'
      }
    }, "Subtotal"), /*#__PURE__*/React.createElement(PriceTag, {
      amount: total,
      size: "lg"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontSize: 15,
        color: 'var(--text-muted)'
      }
    }, "Shipping and taxes calculated at checkout."), /*#__PURE__*/React.createElement(Button, {
      fullWidth: true,
      size: "lg"
    }, "Checkout")) : null
  }, items.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontStyle: 'italic',
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, "Your bag is empty.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 24
    }
  }, items.map(i => /*#__PURE__*/React.createElement("div", {
    key: i.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '96px 1fr',
      gap: 18,
      paddingBottom: 24,
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(ArtworkPlate, {
    src: i.work.src,
    alt: i.work.title,
    height: 112,
    padding: 10,
    shadow: false,
    mat: i.work.dark ? 'ink' : 'mat'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 6,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 17,
      color: 'var(--text-primary)'
    }
  }, i.work.title), /*#__PURE__*/React.createElement(PriceTag, {
    amount: i.price * i.qty,
    size: "sm"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-secondary)'
    }
  }, i.format === 'original' ? 'Original · ' + i.work.dimensions : 'Print · ' + i.size), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 6
    }
  }, i.format === 'print' ? /*#__PURE__*/React.createElement(QuantityStepper, {
    size: "sm",
    value: i.qty,
    max: 5,
    onChange: q => setQty(i.id, q)
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontStyle: 'italic',
      color: 'var(--text-muted)'
    }
  }, "One of one"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => remove(i.id),
    style: {
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
      fontFamily: 'var(--font-serif)',
      fontSize: 15,
      color: 'var(--text-secondary)',
      textDecoration: 'underline',
      textUnderlineOffset: '0.22em'
    }
  }, "Remove")))))));
}
window.BagDrawer = BagDrawer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Bag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Commissions.jsx
try { (() => {
function CommissionsScreen() {
  const {
    ArtworkPlate,
    TextField,
    Select,
    Checkbox,
    Button
  } = window.ZitaSArtStudioDesignSystem_2425aa;
  const D = window.ZITA_DATA;
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const steps = [['01', 'Conversation', 'We talk about the space, the light and the colours you live with.'], ['02', 'Studies', 'Small colour studies to agree a direction before the full canvas.'], ['03', 'The painting', 'The finished work, photographed for you before it ships.']];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '72px var(--gutter) var(--section-gap)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,6fr) minmax(0,5fr)',
      gap: 'clamp(40px,6vw,104px)',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--text-metal)'
    }
  }, "Commissions"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'var(--fs-display-l)',
      lineHeight: 1.06,
      margin: 0
    }
  }, "A painting for your wall."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 21,
      lineHeight: 1.55,
      color: 'var(--text-body)',
      margin: 0,
      maxWidth: '28em'
    }
  }, "Commissions begin from an existing series \u2014 its palette, its movement \u2014 and are scaled and tuned to the room they will live in.")), /*#__PURE__*/React.createElement(ArtworkPlate, {
    src: D.works[1].src,
    alt: "Jal \u2013 Water",
    height: 420
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
      gap: 48,
      padding: 'var(--space-10) 0',
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, steps.map(([n, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'grid',
      gap: 12,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      letterSpacing: '0.16em',
      color: 'var(--text-metal)'
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 18,
      lineHeight: 1.6,
      color: 'var(--text-body)'
    }
  }, d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,4fr) minmax(0,7fr)',
      gap: 'clamp(40px,6vw,104px)',
      paddingTop: 96
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'var(--fs-h2)',
      margin: 0
    }
  }, "Start the conversation"), sent ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 22,
      color: 'var(--text-primary)',
      margin: 0
    }
  }, "Thank you \u2014 your note is with Ranjeeta. She\u2019ll be in touch within a few days.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (!email.includes('@')) {
        setErr('Please enter a valid email');
        return;
      }
      setSent(true);
    },
    style: {
      display: 'grid',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Name",
    required: true
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Email",
    required: true,
    value: email,
    onChange: e => {
      setEmail(e.target.value);
      setErr(null);
    },
    error: err
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Starting series",
    options: D.series.map(s => s.name)
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Approximate size",
    options: ['Up to 60 cm', '60–100 cm', 'Over 100 cm', 'Not sure yet']
  })), /*#__PURE__*/React.createElement(TextField, {
    label: "About the space",
    multiline: true,
    rows: 5,
    hint: "Wall size, light, the colours already in the room."
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Send me studio letters",
    description: "New series and exhibitions, a few times a year."
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    iconEnd: "arrow-right"
  }, "Send")))));
}
window.CommissionsScreen = CommissionsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Commissions.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Footer.jsx
try { (() => {
function SiteFooter({
  go
}) {
  const {
    TextLink
  } = window.ZitaSArtStudioDesignSystem_2425aa;
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  const col = {
    display: 'grid',
    gap: 12,
    alignContent: 'start'
  };
  const h = {
    fontFamily: 'var(--font-display)',
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--stone-400)',
    marginBottom: 6
  };
  const a = (label, page) => /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(page);
    },
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      color: 'var(--canvas-50)',
      textDecoration: 'none'
    }
  }, label);
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink-950)',
      color: 'var(--canvas-50)',
      padding: '96px var(--gutter) 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,5fr) repeat(3, minmax(0,2fr))',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 18,
      alignContent: 'start',
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      lineHeight: 1.2
    }
  }, "Letters from the studio"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      color: 'var(--stone-400)',
      margin: 0
    }
  }, "New series, exhibitions and the occasional studio note \u2014 a few times a year."), done ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 17,
      color: 'var(--teal-300)',
      margin: 0
    }
  }, "Thank you \u2014 you\u2019re on the list.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (email) setDone(true);
    },
    style: {
      display: 'flex',
      borderBottom: '1px solid var(--stone-600)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "Your email",
    style: {
      flex: 1,
      background: 'transparent',
      border: 0,
      outline: 'none',
      color: 'var(--canvas-50)',
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      padding: '12px 0'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      background: 'transparent',
      border: 0,
      color: 'var(--canvas-50)',
      fontFamily: 'var(--font-display)',
      fontSize: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      cursor: 'pointer'
    }
  }, "Subscribe"))), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("div", {
    style: h
  }, "Gallery"), a('All works', 'works'), a('Series', 'home'), a('Prints', 'works')), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("div", {
    style: h
  }, "Studio"), a('Story', 'story'), a('Commissions', 'commissions'), a('Exhibitions', 'story')), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("div", {
    style: h
  }, "Help"), a('Shipping', 'works'), a('Care & framing', 'works'), a('Contact', 'commissions'))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '96px auto 0',
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: '1px solid var(--border-inverse)',
      paddingTop: 24,
      fontFamily: 'var(--font-serif)',
      fontSize: 14,
      color: 'var(--stone-500)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 Zita\u2019s Art Studio \xB7 Ranjeeta Shroff"), /*#__PURE__*/React.createElement("span", null, "Instagram")));
}
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Home.jsx
try { (() => {
function HomeScreen({
  go,
  openWork
}) {
  const {
    Button,
    ArtworkPlate,
    SeriesTile,
    ArtworkCard,
    TextLink
  } = window.ZitaSArtStudioDesignSystem_2425aa;
  const D = window.ZITA_DATA;
  const W = id => D.works.find(w => w.id === id);
  const eyebrow = {
    fontFamily: 'var(--font-display)',
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--text-metal)'
  };
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '48px var(--gutter) 0',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)',
      gap: 'clamp(32px,5vw,80px)',
      alignItems: 'end',
      minHeight: 'calc(100vh - var(--header-h) - 48px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 28,
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: eyebrow
  }, "Ranjeeta Shroff \xB7 Abstract painter"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'var(--fs-display-l)',
      lineHeight: 1.06,
      letterSpacing: '-0.005em',
      margin: 0,
      color: 'var(--text-primary)'
    }
  }, "Paintings shaped by air, water and earth."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 21,
      lineHeight: 1.55,
      color: 'var(--text-body)',
      margin: 0,
      maxWidth: '26em'
    }
  }, "Original abstract works and fine-art prints, made in series and released from the studio a few at a time."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    iconEnd: "arrow-right",
    onClick: () => go('works')
  }, "Explore the works"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go('commissions')
  }, "Commission a painting"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(ArtworkPlate, {
    src: W('vaayu').src,
    alt: "Vaayu \u2013 Air",
    height: "min(72vh, 760px)",
    padding: "clamp(24px,5%,56px)",
    onClick: () => openWork('vaayu'),
    hover: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-serif)',
      fontSize: 15,
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("em", {
    style: {
      color: 'var(--text-primary)'
    }
  }, "Vaayu \u2013 Air"), " \xB7 Acrylic on canvas"), /*#__PURE__*/React.createElement("span", null, "The Elements")))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--section-gap) var(--gutter) 0',
      display: 'grid',
      gap: 'var(--section-gap)'
    }
  }, /*#__PURE__*/React.createElement(SeriesTile, {
    src: W('jal').src,
    eyebrow: "Series",
    count: 3,
    title: "The Elements",
    description: D.series[0].blurb,
    onClick: () => go('works', 'elements')
  }), /*#__PURE__*/React.createElement(SeriesTile, {
    reverse: true,
    src: W('colored').src,
    eyebrow: "Series",
    count: 2,
    title: "By Nature",
    description: D.series[1].blurb,
    onClick: () => go('works', 'nature')
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--ink-950)',
      marginTop: 'var(--section-gap)',
      padding: 'var(--space-10) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,4fr) minmax(0,4fr) minmax(0,4fr)',
      gap: 'clamp(24px,4vw,64px)',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20,
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      color: 'var(--gold-400)'
    }
  }, "Series \xB7 3 works"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'var(--fs-h1)',
      color: 'var(--canvas-50)',
      margin: 0
    }
  }, "Monochrome"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--stone-400)',
      margin: 0
    }
  }, D.series[3].blurb), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TextLink, {
    variant: "label",
    tone: "dark",
    onClick: e => {
      e.preventDefault();
      go('works', 'monochrome');
    }
  }, "View the series"))), /*#__PURE__*/React.createElement(ArtworkPlate, {
    src: W('moonlit').src,
    alt: "Moonlit Waves",
    height: 560,
    mat: "ink",
    padding: 0,
    shadow: false,
    onClick: () => openWork('moonlit'),
    hover: true
  }), /*#__PURE__*/React.createElement(ArtworkPlate, {
    src: W('uncolored').src,
    alt: "Uncolored by Nature",
    height: 420,
    mat: "ink",
    padding: 0,
    shadow: false,
    onClick: () => openWork('uncolored'),
    hover: true
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--section-gap) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'var(--fs-h2)',
      margin: 0
    }
  }, "Available now"), /*#__PURE__*/React.createElement(TextLink, {
    variant: "label",
    onClick: e => {
      e.preventDefault();
      go('works');
    }
  }, "All works")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
      gap: 'clamp(20px,3vw,48px)'
    }
  }, ['clouds', 'prithvi', 'jal'].map(id => {
    const w = W(id);
    return /*#__PURE__*/React.createElement(ArtworkCard, {
      key: id,
      src: w.src,
      title: w.title,
      series: D.seriesName(w.series),
      medium: w.medium,
      dimensions: w.dimensions,
      price: w.price,
      status: w.status,
      plateHeight: 440,
      onClick: () => openWork(id)
    });
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      padding: 'var(--space-10) var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: '0 auto',
      textAlign: 'center',
      display: 'grid',
      gap: 32,
      justifyItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: eyebrow
  }, "Commissions"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--fs-h2)',
      lineHeight: 1.3,
      color: 'var(--text-primary)',
      margin: 0
    }
  }, "A painting made for one wall, one light, one home."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go('commissions')
  }, "Begin a commission"))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Story.jsx
try { (() => {
function StoryScreen({
  go,
  openWork
}) {
  const {
    ArtworkPlate,
    Tabs,
    TextLink,
    Button
  } = window.ZitaSArtStudioDesignSystem_2425aa;
  const D = window.ZITA_DATA;
  const W = id => D.works.find(w => w.id === id);
  const [tab, setTab] = React.useState('story');
  const p = {
    fontFamily: 'var(--font-serif)',
    fontSize: 20,
    lineHeight: 1.65,
    color: 'var(--text-body)',
    margin: 0
  };
  const shows = [['2026', 'Placeholder exhibition title', 'Venue, City'], ['2025', 'Placeholder group show', 'Venue, City'], ['2024', 'Placeholder open studio', 'Venue, City']];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '72px var(--gutter) var(--section-gap)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--text-metal)',
      marginBottom: 16
    }
  }, "The artist"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'var(--fs-display-l)',
      lineHeight: 1.06,
      margin: 0
    }
  }, "Ranjeeta Shroff")), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    tabs: [{
      id: 'story',
      label: 'Story'
    }, {
      id: 'exhibitions',
      label: 'Exhibitions'
    }],
    style: {
      marginTop: 56
    }
  }), tab === 'story' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,5fr) minmax(0,6fr)',
      gap: 'clamp(40px,7vw,120px)',
      paddingTop: 80,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      ...p,
      fontSize: 24,
      lineHeight: 1.5,
      color: 'var(--text-primary)'
    }
  }, "Ranjeeta Shroff is an abstract artist who paints in series, working with poured acrylic on canvas."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "Her works are rooted in the natural world \u2014 the elements, flowers, weather and the movement of water \u2014 and each series explores one idea through its own palette."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...p,
      color: 'var(--text-muted)',
      fontStyle: 'italic',
      fontSize: 17
    }
  }, "Placeholder \u2014 replace with Ranjeeta\u2019s own story, in her voice."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go('commissions')
  }, "Commission a painting"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 24,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(ArtworkPlate, {
    src: W('prithvi').src,
    alt: "Prithvi \u2013 Earth",
    height: 420,
    onClick: () => openWork('prithvi'),
    hover: true
  }), /*#__PURE__*/React.createElement(ArtworkPlate, {
    src: W('melting').src,
    alt: "Melting Away",
    height: 560,
    onClick: () => openWork('melting'),
    hover: true
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 48,
      maxWidth: 880
    }
  }, shows.map(([y, t, v]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr auto',
      gap: 24,
      padding: '28px 0',
      borderBottom: '1px solid var(--border-hairline)',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 15,
      letterSpacing: '0.1em',
      color: 'var(--text-metal)'
    }
  }, y), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 17,
      color: 'var(--text-secondary)'
    }
  }, v))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 16,
      color: 'var(--text-muted)',
      marginTop: 24
    }
  }, "Exhibition history not supplied \u2014 rows are placeholders.")));
}
window.StoryScreen = StoryScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Story.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Works.jsx
try { (() => {
function WorksScreen({
  openWork,
  initialSeries
}) {
  const {
    Tabs,
    Tag,
    Select,
    ArtworkCard,
    Switch
  } = window.ZitaSArtStudioDesignSystem_2425aa;
  const D = window.ZITA_DATA;
  const [tab, setTab] = React.useState('all');
  const [series, setSeries] = React.useState(initialSeries || null);
  const [showSold, setShowSold] = React.useState(true);
  const [sort, setSort] = React.useState('Featured');
  let list = D.works.filter(w => (!series || w.series === series) && (showSold || w.status !== 'sold') && (tab === 'all' || (tab === 'originals' ? w.status !== 'print' : true)));
  if (sort === 'Price, low to high') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'Price, high to low') list = [...list].sort((a, b) => b.price - a.price);
  const s = D.series.find(x => x.id === series);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '72px var(--gutter) var(--section-gap)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,7fr) minmax(0,5fr)',
      gap: 48,
      alignItems: 'end',
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--text-metal)',
      marginBottom: 16
    }
  }, s ? 'Series' : 'The gallery'), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'var(--fs-display-l)',
      lineHeight: 1.05,
      margin: 0
    }
  }, s ? s.name : 'Works')), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: 0
    }
  }, s ? s.blurb : 'Every painting is one of one. Selected works are also available as archival giclée prints.')), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    tabs: [{
      id: 'all',
      label: 'All works',
      count: D.works.length
    }, {
      id: 'originals',
      label: 'Originals'
    }, {
      id: 'prints',
      label: 'Prints'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap',
      padding: '24px 0 56px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    selected: !series,
    onClick: () => setSeries(null)
  }, "All series"), D.series.map(x => /*#__PURE__*/React.createElement(Tag, {
    key: x.id,
    selected: series === x.id,
    count: D.works.filter(w => w.series === x.id).length,
    onClick: () => setSeries(x.id)
  }, x.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Show sold",
    checked: showSold,
    onChange: setShowSold
  }), /*#__PURE__*/React.createElement(Select, {
    value: sort,
    onChange: e => setSort(e.target.value),
    options: ['Featured', 'Price, low to high', 'Price, high to low'],
    style: {
      width: 220
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
      columnGap: 'clamp(20px,3vw,48px)',
      rowGap: 80
    }
  }, list.map(w => /*#__PURE__*/React.createElement(ArtworkCard, {
    key: w.id,
    src: w.src,
    title: w.title,
    series: series ? null : D.seriesName(w.series),
    medium: w.medium,
    dimensions: w.dimensions,
    price: tab === 'prints' ? w.printFrom : w.price,
    priceNote: tab === 'prints' ? 'print, from' : null,
    status: tab === 'prints' ? 'available' : w.status,
    plateHeight: 420,
    onClick: () => openWork(w.id)
  }))), list.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 19,
      color: 'var(--text-secondary)',
      textAlign: 'center',
      padding: 80
    }
  }, "No works match these filters.") : null);
}
window.WorksScreen = WorksScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Works.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/data.js
try { (() => {
window.ZITA_DATA = (() => {
  const A = '../../assets/artwork/';
  const series = [{
    id: 'elements',
    name: 'The Elements',
    blurb: 'Air, water and earth — each element given its own palette and its own way of moving across the canvas.'
  }, {
    id: 'nature',
    name: 'By Nature',
    blurb: 'A pair of floral pours: one in violet and chartreuse, one with the colour taken away.'
  }, {
    id: 'horizons',
    name: 'Horizons',
    blurb: 'Layered bands of white, grey, gold and umber that read like weather over land.'
  }, {
    id: 'monochrome',
    name: 'Monochrome',
    blurb: 'Black, white and every grey between — light surfacing out of a dark ground.'
  }];
  const works = [{
    id: 'vaayu',
    title: 'Vaayu – Air',
    series: 'elements',
    src: A + 'vaayu-air.webp',
    medium: 'Acrylic on canvas',
    dimensions: '76 × 76 cm',
    price: 1850,
    printFrom: 120,
    status: 'available',
    palette: 'Teal, cerulean, copper, white',
    dark: false
  }, {
    id: 'jal',
    title: 'Jal – Water',
    series: 'elements',
    src: A + 'jal-water.webp',
    medium: 'Acrylic on canvas',
    dimensions: '76 × 76 cm',
    price: 1850,
    printFrom: 120,
    status: 'available',
    palette: 'Cobalt, turquoise, gold'
  }, {
    id: 'prithvi',
    title: 'Prithvi – Earth',
    series: 'elements',
    src: A + 'prithvi-earth.webp',
    medium: 'Acrylic on canvas',
    dimensions: '41 × 51 cm',
    price: 980,
    printFrom: 90,
    status: 'print',
    palette: 'Ochre, umber, white'
  }, {
    id: 'colored',
    title: 'Colored by Nature',
    series: 'nature',
    src: A + 'colored-by-nature.jpg',
    medium: 'Acrylic on canvas',
    dimensions: '50 × 70 cm',
    price: 1400,
    printFrom: 110,
    status: 'available',
    palette: 'Violet, chartreuse, white'
  }, {
    id: 'uncolored',
    title: 'Uncolored by Nature',
    series: 'nature',
    src: A + 'uncolored-by-nature.jpg',
    medium: 'Acrylic on canvas',
    dimensions: '30 × 40 cm',
    price: 720,
    printFrom: 80,
    status: 'sold',
    palette: 'Black, white, grey',
    dark: true
  }, {
    id: 'clouds',
    title: 'Longing for Clouds',
    series: 'horizons',
    src: A + 'longing-for-clouds.jpg',
    medium: 'Acrylic on canvas',
    dimensions: '50 × 100 cm',
    price: 1650,
    printFrom: 120,
    status: 'available',
    palette: 'White, grey, gold, black'
  }, {
    id: 'melting',
    title: 'Melting Away',
    series: 'horizons',
    src: A + 'melting-away.webp',
    medium: 'Acrylic on canvas',
    dimensions: '60 × 90 cm',
    price: 1500,
    printFrom: 110,
    status: 'reserved',
    palette: 'Umber, gold, white'
  }, {
    id: 'moonlit',
    title: 'Moonlit Waves',
    series: 'monochrome',
    src: A + 'moonlit-waves.webp',
    medium: 'Acrylic on canvas',
    dimensions: '60 × 95 cm',
    price: 1600,
    printFrom: 120,
    status: 'available',
    palette: 'Charcoal, slate, white',
    dark: true
  }, {
    id: 'yin',
    title: 'Yin – The Dark Side',
    series: 'monochrome',
    src: A + 'yin-dark-side.webp',
    medium: 'Acrylic on canvas',
    dimensions: '40 × 50 cm',
    price: 890,
    printFrom: 90,
    status: 'sold',
    palette: 'Black, white',
    dark: true
  }];
  const seriesName = id => (series.find(s => s.id === id) || {}).name;
  return {
    series,
    works,
    seriesName
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/data.js", error: String((e && e.message) || e) }); }

__ds_ns.ArtworkCard = __ds_scope.ArtworkCard;

__ds_ns.ArtworkPlate = __ds_scope.ArtworkPlate;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.SeriesTile = __ds_scope.SeriesTile;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
