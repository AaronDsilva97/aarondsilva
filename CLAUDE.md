# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server at `localhost:4321`
- `pnpm build` - Build production site to `./dist/`
- `pnpm preview` - Preview build locally
- `pnpm astro check` - Run TypeScript type checking

## Project Architecture

### Tech Stack
- **Astro 5.x** with static output, deployed to Cloudflare
- **React 19** for interactive components (via `@astrojs/react`)
- **Tailwind CSS v4** using the Vite plugin (`@tailwindcss/vite`)
- **MDX** for blog content with content collections
- **Motion** (Framer Motion) for animations in React components

### Key Architectural Patterns

**Hybrid Component Model**: The project uses both Astro (`.astro`) and React (`.tsx`) components:
- Astro components: Static content, layouts, slots-based composition
- React components: Interactive widgets with `client:load` directive for hydration

**Bento Grid Layout**: The homepage uses a CSS Grid-based bento layout (`BentoGrid.astro`) with named grid areas and slots:
```astro
<BentoGrid>
  <HeroIntro slot="hero" client:load />
  <AvailabilityWidget slot="availability" client:load />
  <!-- ... more slots -->
</BentoGrid>
```

**Content Collections**: Blog posts are in `src/content/blog/` as MDX files with frontmatter schema defined in `src/content/config.ts`:
- Required: `title`, `description`, `publishDate`
- Optional: `author`, `tags[]`, `draft`, `seo.keywords[]`

### Directory Structure
```
src/
├── assets/blog/    # Blog post images (SVGs)
├── components/     # Mixed Astro (.astro) and React (.tsx) components
├── content/        # Content collections (blog posts as MDX)
├── layouts/        # Layout.astro with SEO, structured data, global styles
├── pages/          # File-based routing including blog/[...slug].astro
└── styles/         # global.css with Tailwind v4 @theme configuration
```

### Styling System
- **Tailwind v4**: Configured via `@theme` directive in `src/styles/global.css` with custom color palette and design tokens
- **Scoped styles**: Component-specific CSS using `<style>` tags in Astro
- **Global animations**: Custom keyframes for blob, float, glow effects in Layout.astro
- **Glass morphism**: `.glass` utility class and backdrop-filter effects throughout

### React Component Patterns
Interactive React components use:
- `client:load` for immediate hydration
- Motion library for enter/exit animations
- Consistent styling with Tailwind classes matching the dark theme

## Environment Variables

For the Spotify "Now Playing" widget:
```bash
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```