import puppeteer from 'puppeteer-core';
import { ensurePreviewServer, findBrowserPath } from './test-server-helper.mjs';

const BASE_URL = 'http://localhost:4173';

const VIEWPORTS = [
  { name: 'Mobile-Small (360x640)', width: 360, height: 640 },
  { name: 'Mobile-iPhone (375x667)', width: 375, height: 667 },
  { name: 'Mobile-Modern (390x844)', width: 390, height: 844 },
  { name: 'Mobile-Large (412x915)', width: 412, height: 915 },
  { name: 'Tablet-Portrait (768x1024)', width: 768, height: 1024 },
  { name: 'Tablet-Landscape (1024x768)', width: 1024, height: 768 },
  { name: 'Desktop-HD (1280x800)', width: 1280, height: 800 },
  { name: 'Desktop-FHD (1920x1080)', width: 1920, height: 1080 },
];

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/san-pham' },
  { name: 'ProductDetail', path: '/san-pham/banh-trang-tron/banh-trang-sot-ot-tac-3-vi' },
  { name: 'CompanyProfile', path: '/gioi-thieu' },
  { name: 'Capabilities', path: '/nang-luc' },
  { name: 'News', path: '/tin-tuc' },
  { name: 'Contact', path: '/lien-he' },
];

async function checkOverflow(page) {
  return await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const bodyScrollWidth = document.body.scrollWidth;
    const innerWidth = window.innerWidth;

    const overflowingElements = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      if (rect.right > innerWidth + 1) { // 1px tolerance for subpixel
        overflowingElements.push({
          tag: el.tagName,
          className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 100) : '',
          id: el.id,
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          diff: Math.round(rect.right - innerWidth)
        });
      }
    }

    return {
      docWidth,
      scrollWidth,
      bodyScrollWidth,
      innerWidth,
      hasOverflow: scrollWidth > docWidth || bodyScrollWidth > docWidth,
      overflowingElements: overflowingElements.slice(0, 5) // top 5
    };
  });
}

async function run() {
  const stopServer = await ensurePreviewServer(4173);

  try {
    const browserPath = findBrowserPath();
    console.log('Launching Headless Browser at:', browserPath);

    const browser = await puppeteer.launch({
      executablePath: browserPath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const results = [];
    let totalIssues = 0;

    for (const vp of VIEWPORTS) {
      console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

      for (const p of PAGES) {
        try {
          const url = `${BASE_URL}${p.path}`;
          await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
          // Allow framer-motion and animations to settle
          await new Promise(r => setTimeout(r, 1000));

          const overflow = await checkOverflow(page);
          const status = overflow.hasOverflow ? 'FAIL ❌' : 'PASS ✅';
          if (overflow.hasOverflow) {
            totalIssues++;
            console.log(`  [${status}] ${p.name} (${p.path}): scrollW=${overflow.scrollWidth}, docW=${overflow.docWidth}`);
            console.log('    Overflowing elements:', JSON.stringify(overflow.overflowingElements, null, 2));
          } else {
            console.log(`  [${status}] ${p.name} (${p.path})`);
          }

          results.push({
            viewport: vp.name,
            page: p.name,
            hasOverflow: overflow.hasOverflow,
            overflow
          });
        } catch (err) {
          totalIssues++;
          console.error(`  [ERROR] ${p.name} (${p.path}):`, err.message);
        }
      }

      await page.close();
    }

    await browser.close();
    console.log(`\n========================================`);
    console.log(`Total Overflow Issues Found: ${totalIssues}`);
    console.log(`========================================`);

    if (totalIssues > 0) {
      process.exitCode = 1;
    }
  } finally {
    stopServer();
  }
}

run().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
