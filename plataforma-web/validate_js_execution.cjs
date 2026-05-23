const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
];

let executablePath = '';
for (const p of chromePaths) {
  if (fs.existsSync(p)) {
    executablePath = p;
    break;
  }
}

if (!executablePath) {
  console.error('Chrome executable not found!');
  process.exit(1);
}

const artifactDir = 'C:\\Users\\ferreira-mr\\.gemini\\antigravity\\brain\\ef09e8ee-65b7-4558-81e6-e8f997c8a78a';

async function run() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  page.on('console', msg => {
    console.log(`[BROWSER]:`, msg.text());
  });

  page.on('pageerror', err => {
    console.error('[BROWSER ERROR]:', err);
  });

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Switch language to JS
  console.log('Switching language to JavaScript...');
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('.lang-tab');
    const jsTab = Array.from(buttons).find(b => b.textContent.includes('JavaScript'));
    if (jsTab) {
      jsTab.click();
      console.log('Clicked JS tab');
    } else {
      console.error('JS tab not found!');
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  // 2. Set JS code in Monaco
  console.log('Setting JS code in editor...');
  await page.evaluate(() => {
    if (window.monaco && window.monaco.editor) {
      const editors = window.monaco.editor.getEditors();
      if (editors.length > 0) {
        editors[0].setValue(`const celsius = parseFloat(await read("Temp:"));
const fahr = celsius * 9/5 + 32;
write(fahr);`);
        console.log('Successfully set editor value!');
      } else {
        console.error('Monaco editors list is empty');
      }
    } else {
      console.error('Monaco editor global not found');
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  // 3. Click "Testar Resolução"
  console.log('Clicking "Testar Resolução" button...');
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('.btn-success');
    const testBtn = Array.from(buttons).find(b => b.textContent.includes('Testar Resolução'));
    if (testBtn) {
      testBtn.click();
      console.log('Clicked Test button');
    } else {
      console.error('Test button not found!');
    }
  });
  
  console.log('Waiting 5 seconds for tests to run...');
  await new Promise(r => setTimeout(r, 5000));

  // 4. Capture screenshot of test results
  const screenshotPath = path.join(artifactDir, 'screenshot_js_tests.png');
  console.log('Taking screenshot of test results...');
  await page.screenshot({ path: screenshotPath });
  console.log('Screenshot saved to:', screenshotPath);

  // 5. Evaluate if tests passed
  const testResultsInfo = await page.evaluate(() => {
    const activeTabLabel = document.querySelector('.drawer-tab.active');
    const badge = activeTabLabel ? activeTabLabel.querySelector('.tab-badge') : null;
    return {
      activeTab: activeTabLabel ? activeTabLabel.textContent.trim() : 'none',
      badgeText: badge ? badge.textContent.trim() : 'none'
    };
  });
  console.log('Test results summary from DOM:', testResultsInfo);

  await browser.close();
  console.log('Browser test finished.');
}

run().catch(console.error);
