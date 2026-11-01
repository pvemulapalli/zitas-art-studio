/* Prototype content for Zita's Art Studio. Titles, series, prices and sizes come from the
   current zitasartstudio.com catalogue (content inventory, Sept 2026). Anything not confirmed
   there is null and rendered as "to confirm". */
window.ZITA = {
  activeSeries: [
    { id: 'walking-the-trail', name: 'Walking the Trail', status: 'Current series', blurb: null, count: 4, img: null },
    { id: 'elements', name: 'Elements', status: 'Series', blurb: 'Our body is made of the five elements from nature - Prithvi (Earth), Agni (fire), Jal (Water), Vaayu (Air) and Akaash (aether/sky).', count: 5, img: 'art/jal-water-c.png' },
    { id: 'colored-by-nature', name: 'Colored by Nature', status: 'Series', blurb: null, count: 5, img: 'art/colored-by-nature-purple.jpg' }
  ],
  otherSeries: [
    { id: 'sand-and-cloud', name: 'Sand and Cloud' },
    { id: 'blackwhiteandgrey', name: 'BlackWhiteandGrey' }
  ],
  works: [
    { id: 'vaayu', title: 'Vaayu – Air', series: 'Elements', sid: 'elements', price: 250, w: 12, h: 12, orient: 'Square', img: 'art/vaayu-air-c.png', ratio: 1, sold: false, ground: 'light', print: false },
    { id: 'uncolored', title: 'Un Colored by Nature', series: 'Colored by Nature', sid: 'colored-by-nature', price: 550, w: 12, h: 16, orient: 'Portrait', img: 'art/uncolored-by-nature.jpg', ratio: 0.75, sold: false, ground: 'dark', print: false, award: "Curator's Choice" },
    { id: 'prithvi', title: 'Prithvi – Earth', series: 'Elements', sid: 'elements', price: 250, w: 12, h: 12, orient: 'Square', img: 'art/prithvi-earth.webp', ratio: 0.805, sold: true, ground: 'light', print: false },
    { id: 'essence', title: 'Essence', series: 'Walking the Trail', sid: 'walking-the-trail', price: 750, w: null, h: null, orient: 'Portrait', img: null, ratio: 0.8, sold: false, ground: 'light', print: false },
    { id: 'moonlit', title: 'Moonlit Waves', series: 'BlackWhiteandGrey', sid: 'blackwhiteandgrey', price: 780, w: 30, h: 48, orient: 'Portrait', img: 'art/moonlit-waves.webp', ratio: 0.627, sold: false, ground: 'dark', print: false },
    { id: 'purple', title: 'Colored by Nature – Purple', series: 'Colored by Nature', sid: 'colored-by-nature', price: 550, w: null, h: null, orient: 'Portrait', img: 'art/colored-by-nature-purple.jpg', ratio: 0.694, sold: false, ground: 'light', print: false },
    { id: 'jal', title: 'Jal – Water', series: 'Elements', sid: 'elements', price: 250, w: 12, h: 12, orient: 'Square', img: 'art/jal-water-c.png', ratio: 1, sold: false, ground: 'light', print: false },
    { id: 'horizon', title: 'Horizon', series: 'Walking the Trail', sid: 'walking-the-trail', price: 750, w: null, h: null, orient: 'Landscape', img: null, ratio: 1.5, sold: false, ground: 'light', print: false },
    { id: 'longing', title: 'Longing for clouds', series: 'Sand and Cloud', sid: 'sand-and-cloud', price: 650, w: null, h: null, orient: 'Portrait', img: 'art/longing-for-clouds.jpg', ratio: 0.486, sold: false, ground: 'light', print: false },
    { id: 'yin', title: 'Yin – The Dark Side', series: 'BlackWhiteandGrey', sid: 'blackwhiteandgrey', price: null, w: null, h: null, orient: 'Portrait', img: 'art/yin-dark-side-c.png', ratio: 0.789, sold: false, ground: 'dark', print: false },
    { id: 'melting', title: 'Melting away', series: 'Sand and Cloud', sid: 'sand-and-cloud', price: 650, w: null, h: null, orient: 'Portrait', img: 'art/melting-away.webp', ratio: 0.643, sold: false, ground: 'light', print: false }
  ],
  quotes: {
    flow: 'I love the unpredictability and movement of colors on the canvas. The best part is being able to work through the composition while paint is flowing on the canvas.',
    subjects: 'vastness of the skies, depth of the oceans, stillness of the mountains, movement in air or freshness of spring',
    space: 'every space deserves art that not only decorates but also provokes thought',
    hero: 'Moving into Unknown through flowing paint',
    moonlit: 'I deviated from the blue waters and orange skies to observe the sea at night. It was dark all around, the world has shut down, yet the ocean was soaring high and the moon illuminated the waves putting up a graceful show of light and sound.',
    light: "It reminds me that light shines due to darkness, else we wouldn't have known light.",
    commission: "My first commission work came after my first facebook share. I couldn't be more grateful for their trust and confidence in me as an emerging artist.",
    elements: 'Our body is made of the five elements from nature - Prithvi (Earth), Agni (fire), Jal (Water), Vaayu (Air) and Akaash (aether/sky). Realizing that body is made of these elements in nature and will return to the nature is the inspiration for these artworks. It is also a constant reminder for me to disconnect with outward (body) and look inward into being.',
    print: 'Like we admire a pretty garden filled with flowers of many colors, we need to open our heart to admire all the beautiful people on this planet.'
  },
  contact: { email: 'ranjeeta.shroff@gmail.com', phone: '469-850-0196' }
};
/* Homepage hero carousel. One object = one Shopify "slide" block. */
window.ZITA.heroSlides = [
  { id: 'vaayu', image: 'art/vaayu-air-c.png', imageMobile: null, fit: 'contain', fitMobile: 'contain', ground: '#DCE6EA', groundName: 'Vaayu mist', tone: 'dark', align: 'left', valign: 'bottom', overlay: 0,
    heading: 'Moving into Unknown through flowing paint', text: '“Every space deserves art that not only decorates but also provokes thought.”', ctaLabel: 'View originals', ctaUrl: 'Works PLP.dc.html',
    credit: 'Vaayu – Air · Elements · 12 × 12 in', creditUrl: 'Artwork PDP.dc.html', alt: 'Vaayu – Air: white ground with a diagonal pour of cerulean, deep blue and copper cells' },
  { id: 'moonlit', image: 'art/moonlit-waves.webp', imageMobile: 'art/moonlit-waves.webp', fit: 'cover', fitMobile: 'contain', focal: '50% 40%', ground: '#15202A', groundName: 'Full-bleed photograph', tone: 'light', align: 'left', valign: 'top', overlay: 0.15,
    heading: 'Moonlit Waves', text: '“…the moon illuminated the waves putting up a graceful show of light and sound.”', ctaLabel: 'View the painting', ctaUrl: 'Artwork PDP.dc.html',
    credit: 'Moonlit Waves (detail) · BlackWhiteandGrey · 30 × 48 in', creditUrl: 'Artwork PDP.dc.html', alt: 'Detail of Moonlit Waves: grey and white poured waves rising into a charcoal night sky' },
  { id: 'jal', image: 'art/jal-water-c.png', imageMobile: null, fit: 'contain', fitMobile: 'contain', ground: '#F8F8F6', groundName: 'Gesso', tone: 'dark', align: 'right', valign: 'middle', overlay: 0,
    heading: 'Elements', text: 'Our body is made of the five elements from nature - Prithvi (Earth), Agni (fire), Jal (Water), Vaayu (Air) and Akaash (aether/sky).', ctaLabel: 'Explore the series', ctaUrl: 'Works PLP.dc.html',
    credit: 'Jal – Water · Elements · 12 × 12 in', creditUrl: 'Artwork PDP.dc.html', alt: 'Jal – Water: cerulean and ultramarine cells pouring across a white ground' },
  { id: 'wtt', image: null, imageMobile: null, fit: 'cover', fitMobile: 'cover', focal: '50% 50%', ground: '#E3E7E7', groundName: 'Full-bleed photograph', tone: 'dark', align: 'left', valign: 'bottom', overlay: 0,
    heading: 'Walking the Trail', text: 'A new series, still being painted.', ctaLabel: 'Explore the series', ctaUrl: 'Works PLP.dc.html',
    credit: 'Walking the Trail · current series', creditUrl: 'Works PLP.dc.html', alt: '' }
];
window.ZITA.fmt = function (p) { return p == null ? 'Price on enquiry' : '$' + p.toLocaleString('en-US'); };
window.ZITA.size = function (w) { return w.w ? w.w + ' × ' + w.h + ' in · ' + Math.round(w.w * 2.54) + ' × ' + Math.round(w.h * 2.54) + ' cm' : 'Size to confirm'; };
/* Room-view geometry: painting placed on a wall at true relative scale above a 48 in bench. */
window.ZITA.room = function (w) {
  var pw = w.w || 20, ph = w.h || Math.round(pw / (w.ratio || 1));
  var viewW = Math.max(56, Math.min(130, Math.max(pw, ph * 0.8) * 2.6)), viewH = viewW * 1.25;
  var floor = 14, benchH = (17 / viewH) * 100, gap = (9 / viewH) * 100;
  return {
    pw: (pw / viewW) * 100 + '%', ph: (ph / viewH) * 100 + '%',
    pb: floor + benchH + gap + '%', benchW: (48 / viewW) * 100 + '%', benchH: benchH + '%', floor: floor + '%',
    estimated: !w.w
  };
};
