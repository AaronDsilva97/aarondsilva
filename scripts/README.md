# Scripts

## Generate CV PDF

This script generates a PDF version of your CV using Puppeteer.

### Usage

1. **Start the dev server** (in one terminal):
   ```bash
   pnpm dev
   ```

2. **Generate the PDF** (in another terminal):
   ```bash
   pnpm generate:cv
   ```

The PDF will be saved to `public/aaron-dsilva-cv.pdf`.

### When to regenerate

Run `pnpm generate:cv` whenever you update your CV content:
- After editing `/src/pages/cv.astro`
- After changing any CV-related content
- Before committing CV updates

The generated PDF should be committed to git so it's available on your deployed site.
