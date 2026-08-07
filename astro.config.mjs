// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import { keyFor } from './scripts/prerender-mermaid.mjs';

// Swap ```mermaid fences for the SVGs pre-rendered by scripts/prerender-mermaid.mjs.
// Both themes are inlined and CSS picks one, so the theme toggle keeps working
// without shipping the mermaid runtime. A cache miss throws — run the script.
function remarkMermaidSvg() {
  /** @param {any} tree */
  return (tree) => {
    /** @param {any} node @param {any} parent @param {number} i */
    const visit = (node, parent, i) => {
      if (node.type === 'code' && node.lang === 'mermaid') {
        const read = /** @param {string} theme */ (theme) => {
          const p = `src/generated/mermaid/${keyFor(node.value, theme)}.svg`;
          if (!fs.existsSync(p)) {
            throw new Error(
              `Missing pre-rendered mermaid SVG (${theme}). Run: node scripts/prerender-mermaid.mjs`,
            );
          }
          return fs.readFileSync(p, 'utf8');
        };
        parent.children[i] = {
          type: 'html',
          value: `<figure class="mermaid-figure" role="img" aria-label="Diagram">${read('light')}</figure>`,
        };
        return;
      }
      if (node.children) node.children.forEach(/** @param {any} c @param {number} j */ (c, j) => visit(c, node, j));
    };
    visit(tree, null, 0);
  };
}

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
  integrations: [mdx(), sitemap()],
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
    remarkPlugins: [remarkMermaidSvg],
    rehypePlugins: [rehypeCheckboxLabels],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});