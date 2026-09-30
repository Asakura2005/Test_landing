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
      if (rect.right > innerWidth + 1) {
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
      overflowingElements: overflowingElements.slice(0, 5)
    };
  });
}

async function run() {
  const stopServer = await ensurePreviewServer(4173);

  try {
    const browserPath = findBrowserPath();
    console.log('Testing Capabilities page specifically across all viewports with browser:', browserPath);

    const browser = await puppeteer.launch({
      executablePath: browserPath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    let totalIssues = 0;

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
      try {
        await page.goto(`${BASE_URL}/nang-luc`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await new Promise(r => setTimeout(r, 1200));
        const overflow = await checkOverflow(page);
        const status = overflow.hasOverflow ? 'FAIL ❌' : 'PASS ✅';
        console.log(`[${status}] ${vp.name} (/nang-luc): scrollW=${overflow.scrollWidth}, docW=${overflow.docWidth}`);
        if (overflow.hasOverflow) {
          totalIssues++;
          console.log('  Overflow elements:', JSON.stringify(overflow.overflowingElements, null, 2));
        }
      } catch (e) {
        totalIssues++;
        console.error(`[ERROR] ${vp.name}:`, e.message);
      }
      await page.close();
    }

    await browser.close();
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
