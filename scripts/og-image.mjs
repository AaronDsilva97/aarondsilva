import sharp from 'sharp';

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#F3EFF7"/>
  <rect x="80" y="440" width="1040" height="2" fill="#1A1420"/>
  <text x="80" y="330" font-family="Helvetica, Arial" font-size="84" font-weight="700" fill="#1A1420" letter-spacing="-3">Aaron Dsilva</text>
  <text x="80" y="400" font-family="Menlo, monospace" font-size="26" fill="#68626D">CTO — SECURE, AI-POWERED SYSTEMS</text>
  <text x="80" y="500" font-family="Menlo, monospace" font-size="22" fill="#8B8593">aarondsilva.me</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
console.log('Wrote public/og-image.png');
