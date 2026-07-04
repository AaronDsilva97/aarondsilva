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
- **Zero JavaScript frameworks** — no React. All interactivity is small inline vanilla scripts. The only site-wide external script is astro-mermaid's lazy loader (~6.4KB); Mermaid itself loads only on posts containing diagrams.

### Design System ("minimalist premium")
Semantic color tokens are CSS variables in `src/styles/global.css` (`:root` for light, `.dark` overrides), mapped to Tailwind utilities via `@theme inline`: `bg-bg`, `text-fg`, `text-muted`, `text-soft`, `border-line`, `text-accent`, `text-sage`, `bg-raised`. Never hardcode hex values in components. All token pairs are WCAG AA-verified in both themes — check contrast before changing any token.

Type system (self-hosted subset woff2 in `public/fonts/`):
- **Satoshi Variable** — everything (headlines weight 500, tight tracking)
- **JetBrains Mono** — `.meta` class: uppercase metadata labels, dates, statuses
- **Instrument Serif italic** — rare emphasis words only (`font-serif italic`)

Fonts are subset to latin + punctuation + box-drawing. If content adds new scripts/glyphs, re-subset or they render via system fallback.

Signature motion (all CSS-first, reduced-motion safe):
- **Intro** (`src/components/Intro.astro`, homepage only): multilingual greeting cycle → curtain lift → page de-rez reveal (SVG displacement filter on `main`, held during curtain, heals after) → grain settle. Plays on every homepage load.
- **Film grain**: animated overlay on `body.grain::after` (jittered `steps()` noise). `grain-settle` = post-intro arc; `grain-flash` + `theme-anim` = theme-toggle transition (grain surge masks a site-wide 0.8s color cross-fade).
- **View transitions**: CSS `@view-transition` (zero JS).

### Performance Contract
Lighthouse 100×4 (mobile) on `/`, `/blog/`, a post, `/cv/` is a hard requirement. Total non-Mermaid JS < 10KB. Fonts preloaded; CSS fully inlined (`build.inlineStylesheets: 'always'`); sharp image service enabled.

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
Every quantified claim on this site passed a manual audit (2026-07). Do not add or restore: "100+ hospitals", "$1M savings", "50% reduction", "20+ hospitals deployment". King's College London / Johnson & Johnson must be phrased as third-party/technical-partner work, never "clients". The clinical documentation system (Clinvo) is pre-deployment — no deployment or outcome metrics. Canonical email: `contact@aarondsilva.me`. When editing copy, grep for banned patterns before committing (use `rtk proxy grep` — the rtk hook can silently drop matches).

Blog post URLs are load-bearing (SEO) — never rename slugs. `public/_redirects` handles the deleted post and stale CV PDF. `public/llm.txt` + `llms.txt` (identical copies) must be kept in sync with site structure and the claims rules.
