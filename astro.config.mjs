// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';

// Give GFM task-list checkboxes an accessible name (axe "label" rule)
function rehypeCheckboxLabels() {
  /** @param {any} tree */
  return (tree) => {
    /** @param {any} node */
    const visit = (node) => {
      if (
        node.type === 'element' &&
        node.tagName === 'input' &&
        node.properties &&
        node.properties.type === 'checkbox'
      ) {
        node.properties.ariaLabel = node.properties.checked
          ? 'Completed task'
          : 'Incomplete task';
      }
      if (node.children) node.children.forEach(visit);
    };
    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://aarondsilva.me',
  output: 'static',
  integrations: [mdx(), mermaid(), sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: {
        light: 'github-light-high-contrast',
        dark: 'github-dark',
      },
    },
    rehypePlugins: [rehypeCheckboxLabels],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});