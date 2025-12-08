// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://aarondsilva.me',
  output: 'static',
  adapter: cloudflare({
    imageService: 'passthrough'
  }),
  image: {
    service: { entrypoint: 'astro/assets/services/noop' }
  },
  integrations: [react(), mdx(), sitemap(), partytown()],
  vite: {
    plugins: [tailwindcss()]
  }
});