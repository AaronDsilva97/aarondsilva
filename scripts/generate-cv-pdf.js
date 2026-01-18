import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateCVPDF() {
  console.log('🚀 Starting CV PDF generation...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Set viewport to ensure consistent rendering
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2
    });

    // Load the local CV page
    const cvUrl = 'http://localhost:4321/cv';
    console.log(`📄 Loading ${cvUrl}...`);

    await page.goto(cvUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait a bit for any fonts/styles to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Inject CSS to remove backgrounds but keep borders/colors
    await page.addStyleTag({
      content: `
        body, html, .dark {
          background: white !important;
          background-color: white !important;
        }
        * {
          background-image: none !important;
        }
      `
    });

    // Generate PDF with optimized settings
    const pdfPath = join(__dirname, '..', 'public', 'aaron-dsilva-cv.pdf');

    console.log('📝 Generating PDF...');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '10mm',
        right: '12mm',
        bottom: '10mm',
        left: '12mm'
      },
      printBackground: false,
      preferCSSPageSize: false,
      displayHeaderFooter: false
    });

    console.log(`✅ PDF generated successfully: ${pdfPath}`);
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Check if dev server is running
async function checkDevServer() {
  try {
    const response = await fetch('http://localhost:4321/cv');
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Main execution
(async () => {
  const isServerRunning = await checkDevServer();

  if (!isServerRunning) {
    console.error('❌ Dev server is not running!');
    console.log('Please run: pnpm dev');
    console.log('Then in another terminal: pnpm generate:cv');
    process.exit(1);
  }

  await generateCVPDF();
})();
