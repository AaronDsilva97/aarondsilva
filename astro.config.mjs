// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import rehypeMermaid from 'rehype-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://aarondsilva.me',
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/noop' }
  },
  integrations: [react(), mdx(), sitemap(), partytown()],
  markdown: {
    syntaxHighlight: false, // Disable to test if rehype-mermaid works
    rehypePlugins: [
      [rehypeMermaid, {
        strategy: 'inline-svg',
        dark: true
      }]
    ]
  },
  vite: {
    plugins: [tailwindcss()]
  }
});