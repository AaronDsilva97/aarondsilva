import sharp from 'sharp';

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#F0ECE3"/>
  <rect x="80" y="440" width="1040" height="2" fill="#161614"/>
  <text x="80" y="330" font-family="Helvetica, Arial" font-size="84" font-weight="700" fill="#161614" letter-spacing="-3">Aaron Dsilva</text>
  <text x="80" y="400" font-family="Menlo, monospace" font-size="26" fill="#6F6C63">CTO — SECURE, AI-POWERED SYSTEMS</text>
  <text x="80" y="500" font-family="Menlo, monospace" font-size="22" fill="#8A8880">aarondsilva.me</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
console.log('Wrote public/og-image.png');
