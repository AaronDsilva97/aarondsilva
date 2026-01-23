// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://aarondsilva.me',
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/noop' }
  },
  integrations: [react(), mdx(), mermaid(), sitemap(), partytown()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});