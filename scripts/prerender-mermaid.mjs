// Renders every ```mermaid fence in src/content/blog to static SVG, once per
// theme, into a content-hashed cache. The remark plugin in astro.config.mjs
// reads that cache at build time, so production builds need no browser and
// ship no mermaid runtime.
//
// Run after adding or editing a diagram:  node scripts/prerender-mermaid.mjs
// Cache is committed. A miss fails the build loudly rather than silently
// falling back to a code block.

import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const BLOG = 'src/content/blog';
const CACHE = 'src/generated/mermaid';
// Single theme on purpose. astro-mermaid's autoTheme never actually swapped to
// mermaid's dark palette — the original rendered the 'default' theme in both
// modes — and several diagrams hardcode pastel fills (`style X fill:#FFF9C4`),
// so a dark variant renders light label text on those fills and is unreadable.
const THEMES = { light: 'default' };

export const keyFor = (code, theme) =>
  crypto.createHash('sha256').update(`${theme}\u0000${code.trim()}`).digest('hex').slice(0, 16);

const fences = (txt) => {
  const re = /^```mermaid[^\n]*\n([\s\S]*?)^```/gm;
  const out = [];
  let m;
  while ((m = re.exec(txt))) out.push(m[1]);
  return out;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  fs.mkdirSync(CACHE, { recursive: true });

  const jobs = [];
  for (const f of fs.readdirSync(BLOG).sort()) {
    if (!/\.mdx?$/.test(f)) continue;
    for (const code of fences(fs.readFileSync(path.join(BLOG, f), 'utf8'))) {
      for (const theme of Object.keys(THEMES)) jobs.push({ f, code, theme });
    }
  }

  const todo = jobs.filter((j) => !fs.existsSync(path.join(CACHE, `${keyFor(j.code, j.theme)}.svg`)));
  console.log(`  ${jobs.length} diagram/theme pairs, ${todo.length} to render`);

  if (todo.length) {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    // Mermaid sizes every node by measuring its label, so the renderer must use
    // the same font the page will. Without this, boxes are sized for a fallback
    // face and labels overflow them in the browser.
    const font = fs.readFileSync('public/fonts/FamiljenGrotesk-Variable.woff2').toString('base64');
    await page.setContent(
      `<!doctype html><style>
         @font-face{font-family:'Familjen Grotesk';
           src:url(data:font/woff2;base64,${font}) format('woff2-variations');
           font-weight:400 700;}
         body{font-family:'Familjen Grotesk',sans-serif}
       </style><body>`,
    );
    await page.evaluate(() => document.fonts.load('400 16px "Familjen Grotesk"').then(() => document.fonts.ready));
    await page.addScriptTag({ path: 'node_modules/mermaid/dist/mermaid.min.js' });

    let n = 0;
    for (const j of todo) {
      const key = keyFor(j.code, j.theme);
      const svg = await page.evaluate(
        async (code, id, theme) => {
          // htmlLabels:false makes mermaid emit native SVG <text>/<tspan> instead
          // of <foreignObject> HTML. Required here: foreignObject labels inherit
          // the page's CSS and their <br/> gets mangled when the inlined SVG is
          // re-parsed by the HTML parser, so multi-line labels lose lines.
          // securityLevel must stay 'loose' — 'strict' drops edge labels entirely.
          window.mermaid.initialize({
            startOnLoad: false,
            theme,
            securityLevel: 'loose',
            htmlLabels: false, // MUST be top-level; flowchart.htmlLabels alone is ignored
            flowchart: { htmlLabels: false },
            themeVariables: { fontFamily: "'Familjen Grotesk', sans-serif" },
          });
          const { svg } = await window.mermaid.render(id, code);
          return svg;
        },
        j.code,
        `m${key}`,
        THEMES[j.theme],
      );
      // strip the fixed max-width mermaid injects so the diagram scales with its container
      fs.writeFileSync(path.join(CACHE, `${key}.svg`), svg.replace(/max-width:\s*[\d.]+px;?/g, ''));
      n++;
    }
    await browser.close();
    console.log(`  rendered ${n}`);
  }

  // prune anything no longer referenced
  const live = new Set(jobs.map((j) => `${keyFor(j.code, j.theme)}.svg`));
  let pruned = 0;
  for (const f of fs.readdirSync(CACHE)) {
    if (!live.has(f)) { fs.unlinkSync(path.join(CACHE, f)); pruned++; }
  }
  const bytes = fs.readdirSync(CACHE).reduce((n, f) => n + fs.statSync(path.join(CACHE, f)).size, 0);
  console.log(`  cache: ${fs.readdirSync(CACHE).length} files, ${(bytes / 1024).toFixed(0)} KB${pruned ? `, pruned ${pruned}` : ''}`);

  // Astro's content layer caches rendered markdown. The post source has not
  // changed, so without this it happily rebuilds using the PREVIOUS SVGs and
  // the new ones are silently ignored.
  if (todo.length || pruned) {
    for (const dir of ['.astro', 'node_modules/.astro']) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
    console.log('  cleared Astro content cache');
  }
}
