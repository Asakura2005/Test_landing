import puppeteer from 'puppeteer-core';
import { ensurePreviewServer, findBrowserPath } from './test-server-helper.mjs';

const BASE_URL = 'http://localhost:4173';

async function run() {
  const stopServer = await ensurePreviewServer(4173);

  try {
    const browserPath = findBrowserPath();
    console.log('Launching Headless Browser for Interactions at:', browserPath);

    const browser = await puppeteer.launch({
      executablePath: browserPath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    });

    const page = await browser.newPage();
    let failures = 0;

    // --- 1. Testing Mobile Navigation Drawer at 360px ---
    console.log('\n--- 1. Testing Mobile Navigation Drawer at 360px ---');
    await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 1 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 1000));

    const hamburger = await page.$('button[aria-label="Mở menu"]');
    if (hamburger) {
      const hamburgerDims = await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Mở menu"]');
        return btn ? { width: Math.round(btn.offsetWidth), height: Math.round(btn.offsetHeight) } : null;
      });
      console.log('  Hamburger button dimensions:', hamburgerDims);
      if (!hamburgerDims || hamburgerDims.width < 44 || hamburgerDims.height < 44) {
        console.error('  FAIL: Hamburger button touch target < 44px:', hamburgerDims);
        failures++;
      }

      console.log('  Found hamburger button. Clicking...');
      await hamburger.click();
      await new Promise(r => setTimeout(r, 500));

      const drawer = await page.$('div[role="dialog"][aria-label="Mobile Navigation Menu"]');
      console.log('  Drawer visible:', !!drawer);
      if (!drawer) {
        console.error('  FAIL: Drawer dialog not found!');
        failures++;
      }

      const drawerOverflow = await page.evaluate(() => {
        return {
          docScrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          winWidth: window.innerWidth,
          bodyStyleOverflow: document.body.style.overflow
        };
      });
      console.log('  Drawer scroll lock & overflow:', drawerOverflow);
      if (drawerOverflow.docScrollWidth > drawerOverflow.winWidth) {
        console.error('  FAIL: Horizontal overflow when mobile drawer is open!');
        failures++;
      }
      if (drawerOverflow.bodyStyleOverflow !== 'hidden') {
        console.error('  FAIL: Body overflow not locked when drawer is open!');
        failures++;
      }

      // Measure language switcher buttons in mobile drawer
      const langButtons = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('div[data-mobile-menu-scrollable="true"] button'));
        return btns.map(b => ({
          text: b.innerText.trim(),
          width: Math.round(b.offsetWidth),
          height: Math.round(b.offsetHeight)
        })).filter(b => ['VI', 'EN', 'KO', 'ZH'].includes(b.text));
      });
      console.log('  Mobile drawer language buttons dimensions:', langButtons);
      const smallBtn = langButtons.find(b => b.height < 44 || b.width < 44);
      if (smallBtn) {
        console.error('  FAIL: Touch target too small (<44px) for button:', smallBtn);
        failures++;
      }

      // Close drawer
      const closeBtn = await page.$('button[aria-label="Đóng menu"]');
      if (closeBtn) {
        const closeBtnDims = await page.evaluate(() => {
          const btn = document.querySelector('button[aria-label="Đóng menu"]');
          return btn ? { width: Math.round(btn.offsetWidth), height: Math.round(btn.offsetHeight) } : null;
        });
        console.log('  Drawer close button dimensions:', closeBtnDims);
        if (!closeBtnDims || closeBtnDims.width < 44 || closeBtnDims.height < 44) {
          console.error('  FAIL: Drawer close button touch target < 44px:', closeBtnDims);
          failures++;
        }

        await closeBtn.click();
        await new Promise(r => setTimeout(r, 400));
        console.log('  Drawer closed cleanly.');
      }
    } else {
      console.error('  FAIL: Hamburger button not found!');
      failures++;
    }

    // --- 2. Testing Tablet Breakpoint (768px) ---
    console.log('\n--- 2. Testing Tablet Breakpoint at 768px ---');
    await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 800));

    const tabletHeaderState = await page.evaluate(() => {
      const desktopNav = document.querySelector('nav[aria-label="Thanh điều hướng chính"]');
      const hamburger = document.querySelector('button[aria-label="Mở menu"]');
      const isDesktopNavHidden = desktopNav ? window.getComputedStyle(desktopNav).display === 'none' : true;
      const isHamburgerVisible = hamburger ? window.getComputedStyle(hamburger).display !== 'none' : false;
      return {
        isDesktopNavHidden,
        isHamburgerVisible,
        docScrollWidth: document.documentElement.scrollWidth,
        winWidth: window.innerWidth,
      };
    });
    console.log('  Tablet 768px header state:', tabletHeaderState);
    if (!tabletHeaderState.isDesktopNavHidden || !tabletHeaderState.isHamburgerVisible) {
      console.error('  FAIL: Tablet 768px should display mobile drawer navigation pattern!');
      failures++;
    }
    if (tabletHeaderState.docScrollWidth > tabletHeaderState.winWidth) {
      console.error('  FAIL: Horizontal overflow at Tablet 768px!');
      failures++;
    }

    // --- 3. Testing Desktop Dropdowns & MegaMenu (1280px & 1920px) ---
    console.log('\n--- 3. Testing Desktop Navigation & Dropdowns at 1280px ---');
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 800));

    // Test Globe Language Dropdown
    const langBtn = await page.$('#haq-lang-dropdown-btn');
    if (langBtn) {
      await langBtn.click();
      await new Promise(r => setTimeout(r, 300));
      const panel = await page.$('#haq-lang-dropdown-panel');
      console.log('  Desktop Globe Language panel visible:', !!panel);
      if (!panel) {
        console.error('  FAIL: Globe Language panel did not open on click!');
        failures++;
      }
      // Click again to close
      await langBtn.click();
      await new Promise(r => setTimeout(r, 300));
    }

    // Test Desktop Mega Menu hover
    const aboutMenuTrigger = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      return btns.find(b => b.innerText.includes('Về chúng tôi') || b.innerText.includes('About'));
    });
    if (aboutMenuTrigger && aboutMenuTrigger.asElement()) {
      await aboutMenuTrigger.asElement().hover();
      await new Promise(r => setTimeout(r, 400));
      const menuVisible = await page.evaluate(() => {
        const popup = document.querySelector('nav div.absolute.top-full');
        return !!popup;
      });
      console.log('  Desktop About Mega Menu visible on hover:', menuVisible);
    }

    // --- 4. Testing RFQ Modal on ProductDetailPage at 360px ---
    console.log('\n--- 4. Testing RFQ Modal on ProductDetailPage at 360px ---');
    await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 1 });
    await page.goto(`${BASE_URL}/san-pham`, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 800));

    const firstProductHref = await page.evaluate(() => {
      const firstCard = document.querySelector('a[href*="/san-pham/"]');
      return firstCard ? firstCard.getAttribute('href') : null;
    });

    if (firstProductHref) {
      await page.goto(`${BASE_URL}${firstProductHref}`, { waitUntil: 'networkidle0', timeout: 15000 });
      await new Promise(r => setTimeout(r, 800));

      const rfqBtn = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(b => b.innerText.includes('Nhận báo giá') || b.innerText.includes('Get a Quote'));
      });

      if (rfqBtn && rfqBtn.asElement()) {
        console.log('  Found RFQ button. Clicking...');
        await rfqBtn.asElement().click();
        await new Promise(r => setTimeout(r, 600));

        const rfqCloseDims = await page.evaluate(() => {
          const btn = document.querySelector('div.fixed.inset-0.z-50 button[title="Đóng"]');
          return btn ? { width: Math.round(btn.offsetWidth), height: Math.round(btn.offsetHeight) } : null;
        });
        console.log('  RFQ Modal close button dimensions:', rfqCloseDims);
        if (!rfqCloseDims || rfqCloseDims.width < 44 || rfqCloseDims.height < 44) {
          console.error('  FAIL: RFQ Modal close button touch target < 44px:', rfqCloseDims);
          failures++;
        }

        const modalStatus = await page.evaluate(() => {
          const modal = document.querySelector('div.fixed.inset-0.z-50');
          const card = modal ? modal.querySelector('.bg-white') : null;
          return {
            hasModal: !!modal,
            cardHeight: card ? card.offsetHeight : 0,
            cardScrollHeight: card ? card.scrollHeight : 0,
            bodyOverflow: document.body.style.overflow,
            windowInnerHeight: window.innerHeight,
            windowInnerWidth: window.innerWidth,
            docScrollWidth: document.documentElement.scrollWidth
          };
        });
        console.log('  Modal status at 360x640:', modalStatus);
        if (!modalStatus.hasModal) {
          console.error('  FAIL: RFQ modal did not open!');
          failures++;
        }
        if (modalStatus.bodyOverflow !== 'hidden') {
          console.error('  FAIL: Body scroll not locked when modal is open!');
          failures++;
        }
        if (modalStatus.docScrollWidth > modalStatus.windowInnerWidth) {
          console.error('  FAIL: Horizontal overflow when modal is open!');
          failures++;
        }
      } else {
        console.error('  FAIL: RFQ button not found on product detail page!');
        failures++;
      }
    }

    // --- 5. Testing LegalFlipbook Bottom Toolbar at 360px ---
    console.log('\n--- 5. Testing LegalFlipbook at 360px ---');
    await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 1 });
    await page.goto(`${BASE_URL}/nang-luc`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));

    const flipbookToolbar = await page.evaluate(() => {
      const scrollWrapper = document.querySelector('div.overflow-x-auto.scrollbar-none.overscroll-x-contain');
      const pill = scrollWrapper ? scrollWrapper.querySelector('.rounded-full') : null;
      return {
        hasScrollWrapper: !!scrollWrapper,
        wrapperClientWidth: scrollWrapper ? scrollWrapper.clientWidth : 0,
        wrapperScrollWidth: scrollWrapper ? scrollWrapper.scrollWidth : 0,
        pillWidth: pill ? pill.offsetWidth : 0,
        docScrollWidth: document.documentElement.scrollWidth,
        winWidth: window.innerWidth,
      };
    });
    console.log('  Flipbook toolbar layout:', flipbookToolbar);
    if (flipbookToolbar.docScrollWidth > flipbookToolbar.winWidth) {
      console.error('  FAIL: Flipbook toolbar caused page horizontal overflow!');
      failures++;
    }

    // --- 6. Testing FloatingContactBar at 360px ---
    console.log('\n--- 6. Testing FloatingContactBar at 360px ---');
    await page.setViewport({ width: 360, height: 640, deviceScaleFactor: 1 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 800));

    const contactBarStatus = await page.evaluate(() => {
      const aside = document.querySelector('aside[aria-label]');
      const trigger = aside ? aside.querySelector('button') : null;
      const links = aside ? Array.from(aside.querySelectorAll('a')) : [];
      return {
        hasAside: !!aside,
        triggerDims: trigger ? { width: Math.round(trigger.offsetWidth), height: Math.round(trigger.offsetHeight) } : null,
        linkCount: links.length,
        linksDims: links.map(l => ({ width: Math.round(l.offsetWidth), height: Math.round(l.offsetHeight) }))
      };
    });
    console.log('  FloatingContactBar elements:', contactBarStatus);

    if (!contactBarStatus.hasAside) {
      console.error('  FAIL: FloatingContactBar not found!');
      failures++;
    } else {
      if (!contactBarStatus.triggerDims || contactBarStatus.triggerDims.width < 44 || contactBarStatus.triggerDims.height < 44) {
        console.error('  FAIL: FloatingContactBar trigger touch target < 44px:', contactBarStatus.triggerDims);
        failures++;
      }
      for (const dims of contactBarStatus.linksDims) {
        if (dims.width < 44 || dims.height < 44) {
          console.error('  FAIL: FloatingContactBar link touch target < 44px:', dims);
          failures++;
        }
      }

      // Open floating bar
      const contactTrigger = await page.$('aside[aria-label] button');
      if (contactTrigger) {
        await contactTrigger.click();
        await new Promise(r => setTimeout(r, 400));

        const overflowAfterOpen = await page.evaluate(() => {
          return {
            docScrollWidth: document.documentElement.scrollWidth,
            winWidth: window.innerWidth,
          };
        });
        console.log('  Overflow after opening FloatingContactBar:', overflowAfterOpen);
        if (overflowAfterOpen.docScrollWidth > overflowAfterOpen.winWidth) {
          console.error('  FAIL: Horizontal overflow when FloatingContactBar is open!');
          failures++;
        }

        // Test Escape key dismissal
        await page.keyboard.press('Escape');
        await new Promise(r => setTimeout(r, 400));
        console.log('  FloatingContactBar closed via Escape key.');
      }
    }

    await page.close();
    await browser.close();

    console.log(`\n========================================`);
    console.log(`Interactions test finished. Failures: ${failures}`);
    console.log(`========================================`);

    if (failures > 0) {
      process.exitCode = 1;
    }
  } finally {
    stopServer();
  }
}

run().catch(err => {
  console.error('Fatal interaction test error:', err);
  process.exit(1);
});
