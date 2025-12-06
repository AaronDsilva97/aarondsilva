# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is an Astro project using pnpm as the package manager. All commands should be run from the project root:

- `pnpm dev` - Start the development server at `localhost:4321`
- `pnpm build` - Build the production site to `./dist/`
- `pnpm preview` - Preview the build locally before deploying
- `pnpm astro ...` - Run Astro CLI commands (e.g., `pnpm astro add`, `pnpm astro check`)

## Project Architecture

### Framework & Configuration
- **Astro 5.x**: Static site generator with TypeScript support
- **TypeScript**: Strict mode enabled with Astro's strict config
- **Package Manager**: pnpm (specified in packageManager field)

### Directory Structure
```
src/
├── assets/         # Static assets (images, etc.)
├── components/     # Astro components (.astro files)
├── layouts/        # Page layouts and templates
└── pages/          # File-based routing - each file becomes a route
```

### Key Patterns
- **File-based routing**: Pages in `src/pages/` automatically become routes
- **Component architecture**: Uses Astro's component syntax with frontmatter and template sections
- **Asset handling**: Static assets in `src/assets/` with proper import handling
- **Layout system**: Base layouts in `src/layouts/` used by pages and components

### Astro Component Structure
Astro components follow this pattern:
```astro
---
// Frontmatter (JavaScript/TypeScript)
import statements and component logic
---

<!-- Template (HTML with Astro syntax) -->
<html-content />

<style>
/* Scoped CSS */
</style>
```

### Styling Approach
- Scoped CSS within components using `<style>` tags
- CSS is automatically scoped to the component
- Global styles should be placed in layout components

## Development Notes

- This is a fresh Astro starter project with minimal configuration
- TypeScript is enabled with strict mode for type safety
- The project uses ES modules (`"type": "module"` in package.json)
- No additional UI framework is currently configured (vanilla Astro components)

## Spotify Integration

The portfolio includes a "Now Playing" widget that shows your current Spotify track. To set this up:

### 1. Create a Spotify App
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app with these settings:
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/spotify`
   - **Scopes needed**: `user-read-currently-playing`, `user-read-recently-played`

### 2. Environment Variables
Add these to your `.env` file:
```bash
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

### 3. Get Refresh Token
Use the Spotify Authorization Code flow to get a refresh token:
1. Visit: `https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=user-read-currently-playing%20user-read-recently-played`
2. Exchange the authorization code for tokens
3. Use the refresh token in your environment variables

### 4. Deployment
For production deployment (Vercel, Netlify, etc.), add the environment variables to your hosting platform's environment settings.

The component will gracefully fall back to a "nothing playing" state if Spotify API is unavailable or not configured.