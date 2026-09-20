# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server at `localhost:4321`
- `pnpm build` - Build production site to `./dist/`
- `pnpm preview` - Preview build locally
- `pnpm astro check` - Run TypeScript type checking
- `node scripts/og-image.mjs` - Regenerate `public/og-image.png` (run after brand color changes)

## Project Architecture

### Tech Stack
- **Astro 5.x** static output, deployed to Cloudflare Pages
- **Tailwind CSS v4** via the Vite plugin (`@tailwindcss/vite`)
- **MDX** for blog content with content collections
- **Zero JavaScript frameworks** — no React. All interactivity is small inline vanilla scripts. Total JS shipped is **18 KB** across the whole site: the Layout script (theme toggle, clock, `lenis` smooth scroll). Mermaid diagrams are pre-rendered to SVG at build time, so no diagram runtime ships at all.

### Design System ("minimalist premium")
Semantic color tokens are CSS variables in `src/styles/global.css` (`:root` for light, `.dark` overrides), mapped to Tailwind utilities via `@theme inline`: `bg-bg`, `text-fg`, `text-muted`, `text-soft`, `border-line`, `text-accent`, `text-sage`, `bg-raised`. Never hardcode hex values in components. All token pairs are WCAG AA-verified in both themes — check contrast before changing any token.

Palette is **Selenium** (2026-08), anchored to a selenium-toned gelatin print — chosen so the color and the film-grain motion identity come from the same reference. It is derived, not hand-picked: every neutral (`bg`, `raised`, `line`, `fg`, `muted`, `soft`, `code-bg`) sits on the ground hue — **308°** light, **305°** dark — so the tint reads as one material rather than grey with a color dropped on it. Ground chroma is ~0.0115 (light) / 0.0180 (dark); below ~0.010 a tint stops being visible at all, which is what makes a palette read generic. Text tokens are solved to fixed contrast ratios against their own ground (fg ~15.5:1, muted ~6.4, soft ~5.2, accent ≥4.9, sage ~5.6-7.0), not to the 4.5 floor — pinning them all to the floor flattens the text hierarchy. `--accent` must stay ≥4.5:1: the previous terracotta was **3.51:1** in light and failed AA on blog prose links (`src/pages/blog/[...slug].astro`). Non-token hexes that must be kept in sync: `theme-color`/`msapplication-TileColor` in `Layout.astro`, the intro curtain in `Intro.astro`, and `scripts/og-image.mjs`.

Type system (self-hosted woff2 in `public/fonts/`, 77 KB total), replaced 2026-08:
- **Sentient** (Indian Type Foundry) — display: `h1/h2/h3` + `.display`, weight 500. Also the `font-serif italic` emphasis role. Only Medium and Italic ship — requesting any other weight gets a synthesised face.
- **Familjen Grotesk** — body and UI (`--font-sans`), variable 400–700
- **IBM Plex Mono** — `.meta` class: uppercase labels, dates, statuses, and all code blocks

⚠️ **Sentient is NOT OFL.** It is under the Fontshare Free Font EULA, whose clause 26 forbids modification. `Sentient-*.woff2` are ITF's own webfonts, shipped byte-for-byte — **never subset, re-encode, or instance them.** (The previous Satoshi was subset to 237 of ~800 glyphs under this same EULA, i.e. in breach; that is why it was removed rather than kept.) Familjen Grotesk and IBM Plex Mono are OFL and *are* subset.

Subset charset for the OFL faces is ASCII + the 20 non-ASCII glyphs the site actually uses (see `EXTRA` in the build script) — em/en dash, arrows, middle dot, box-drawing, curly quotes, accented latin. **IBM Plex Mono is the only candidate mono that covers box-drawing** (`─└├│`, used in a blog code fence) *and* arrows; Chivo/Spline/Martian Mono do not — verify coverage before swapping it. `◐` (theme toggle) has never been in any bundled face and falls back to system. Devanagari/Tamil/Bengali/Hiragana in the intro greetings are intentionally system-fallback.

`Familjen-fallback` metrics (`size-adjust: 109.5%`, `ascent-override: 93.6%`) are derived from Familjen's own average lowercase advance vs Arial's. Recompute if the body face changes, or CLS regresses.

Signature motion (all CSS-first, reduced-motion safe):
- **Intro** (`src/components/Intro.astro`, homepage only): multilingual greeting cycle → curtain lift → page de-rez reveal (SVG displacement filter on `main`, held during curtain, heals after) → grain settle. Plays on every homepage load. Timing budget: greeting 2140ms (8 words × 260ms `STEP`) → curtain 1650ms → de-rez heal **520ms** (`D`). The greeting and curtain are deliberate and should not be shortened — only the de-rez heal was slow (it was 2400ms until 2026-08, which read as the page being stuck blurry).
- **Film grain**: animated overlay on `body.grain::after` (jittered `steps()` noise). `grain-settle` = post-intro arc; `grain-flash` + `theme-anim` = theme-toggle transition (grain surge masks a site-wide 0.8s color cross-fade).
- **View transitions**: CSS `@view-transition` (zero JS).

### Performance Contract
Lighthouse 100×4 (mobile) on `/`, `/blog/`, a post, `/cv/` is the target. Fonts preloaded; CSS fully inlined (`build.inlineStylesheets: 'always'`); sharp image service enabled.

**Measured 2026-08** (mobile, local static server on `127.0.0.1` — never audit via `astro preview`, its dev toolbar injects a Vite 504 and a non-descriptive link that cost ~10 points of Best-Practices/SEO). Performance only; a11y/best-practices/SEO are 100 everywhere:

| page | before (Satoshi) | after (Sentient) |
|---|---|---|
| `/` | 90 | **95** |
| `/blog/` | 99 | **100** |
| `/blog/<post>` | 67 | **77** |
| `/cv/` | 99 | **99** |

After pre-rendering diagrams (below), a 4-diagram post scores 98 and the single-diagram post went **45 → 99** (LCP 6.0s → 2.0s, TBT 120ms → 0ms). Total JS in `dist/` is **18 KB**, down from 2582 KB.

`lenis` (18.1KB) is bundled into that site-wide Layout script via `src/layouts/Layout.astro:185` for smooth scroll. It is now essentially all the JS the site ships. It costs no measurable TBT; removing it would change the scroll feel, so it is a deliberate keep, not an oversight.

### Diagrams (pre-rendered, no mermaid runtime)

```bash
pnpm prerender:mermaid   # after adding or editing any ```mermaid fence
```

`scripts/prerender-mermaid.mjs` renders every fence to SVG into `src/generated/mermaid/`, keyed by a content hash. A remark plugin in `astro.config.mjs` inlines them at build time and **throws on a cache miss**, so a forgotten re-render fails the build loudly instead of shipping a stale diagram. The cache is committed, so CI never launches a browser.

Four things here are load-bearing and were each found the hard way:
- **`htmlLabels: false` must be top-level** in the mermaid config. `flowchart.htmlLabels` alone is silently ignored. With `foreignObject` labels the SVG inherits page CSS and its `<br/>` is mangled when the inlined SVG is re-parsed by the HTML parser, so multi-line labels lose every line after the first.
- **`securityLevel` must be `'loose'`.** `'strict'` drops all edge labels and `<br/>` content.
- **The Astro content cache must be cleared** when SVGs change (the script does this). Post source is unchanged, so Astro will otherwise rebuild happily against the *previous* SVGs.
- **Single theme on purpose.** `astro-mermaid`'s `autoTheme` never actually swapped palettes — the original rendered mermaid's `default` theme in dark mode too. Several diagrams also hardcode pastel fills (`style X fill:#FFF9C4`), so a dark variant puts light label text on a pale ground and is unreadable. Do not "fix" this by adding one.

Verify after changes: every label in the fence source should appear in the built HTML (word-level — native SVG splits multi-line labels across `<tspan>`s, so substring matching gives false negatives).

### Directory Structure
```
src/
├── assets/         # profile photo (About), blog SVGs
├── components/     # Astro only: SiteHeader, SiteFooter, Intro, IndexRow, BarChart
├── content/blog/   # MDX/MD posts (schema in src/content/config.ts)
├── data/           # projects.ts, certifications.ts, experience.ts — typed content arrays
├── layouts/        # Layout.astro: verified meta/JSON-LD, theme + clock scripts, page frame
├── pages/          # index, work, about, cv, contact, 404, blog/, rss.xml.ts
└── styles/         # global.css: tokens, fonts, grain/motion keyframes
```

Pages follow a shared idiom: `.meta` kicker → large `tracking-tight` heading → `.hairline` full-width index rows (`IndexRow`) or hairline blocks. No cards, no gradients, no glass.

### Content Integrity (IMPORTANT)
Every quantified claim on this site passed a manual audit (2026-07). Do not add or restore: "100+ hospitals", "$1M savings", "50% reduction", "20+ hospitals deployment". King's College London / Johnson & Johnson must be phrased as third-party/technical-partner work, never "clients". Clinvo is live with clinics in India (public ₹0/₹1,499-per-month tiers on clinvo.health) — but still no deployment counts, user numbers, or outcome metrics; none are substantiated. Canonical email: `contact@aarondsilva.me`. When editing copy, grep for banned patterns before committing (use `rtk proxy grep` — the rtk hook can silently drop matches).

Blog post URLs are load-bearing (SEO) — never rename slugs. `public/_redirects` handles the deleted post and stale CV PDF. `public/llm.txt` + `llms.txt` (identical copies) must be kept in sync with site structure and the claims rules.
