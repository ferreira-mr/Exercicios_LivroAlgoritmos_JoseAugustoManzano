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

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Set Portugol code with a para loop
  console.log('Setting Portugol code...');
  await page.evaluate(() => {
    if (window.monaco && window.monaco.editor) {
      const editors = window.monaco.editor.getEditors();
      if (editors.length > 0) {
        editors[0].setValue(`programa {
  funcao inicio() {
    para (inteiro i = 1; i <= 10; i = i + 1) {
      escreva(i)
    }
  }
}`);
      }
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  // Click on "Fluxograma" tab
  console.log('Switching to Fluxograma tab...');
  await page.evaluate(() => {
    const tabs = document.querySelectorAll('.lang-tab');
    const flowTab = Array.from(tabs).find(t => t.textContent.includes('Fluxograma'));
    if (flowTab) flowTab.click();
  });
  await new Promise(r => setTimeout(r, 1500));

  // Get interactive lines coordinates
  const interactiveLines = await page.evaluate(() => {
    const groups = document.querySelectorAll('g.flow-connection-interactive');
    const coords = [];
    groups.forEach((g, idx) => {
      const line = g.querySelector('line:not([stroke="transparent"])');
      if (line) {
        coords.push({
          index: idx,
          x1: line.getAttribute('x1'),
          y1: line.getAttribute('y1'),
          x2: line.getAttribute('x2'),
          y2: line.getAttribute('y2'),
        });
      }
    });
    return coords;
  });
  console.log('Interactive lines in DOM:', interactiveLines);

  // Click on a loop-back line segment (like x1: 440, y1: 225)
  console.log('Attempting to click on the loop-back connection below the body node...');
  const menuVisibleBefore = await page.evaluate(() => !!document.querySelector('.flow-insert-menu'));
  console.log('Menu visible before click:', menuVisibleBefore);

  await page.evaluate(() => {
    // Find the connection group with the line from 440, 225 to 440, 255
    const groups = document.querySelectorAll('g.flow-connection-interactive');
    const loopBackGroup = Array.from(groups).find(g => {
      const line = g.querySelector('line:not([stroke="transparent"])');
      return line && line.getAttribute('x1') === '440' && line.getAttribute('y1') === '225';
    });
    if (loopBackGroup) {
      loopBackGroup.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    } else {
      console.error('Could not find loopBackGroup at 440, 225');
    }
  });

  await new Promise(r => setTimeout(r, 500));

  const menuVisibleAfter = await page.evaluate(() => !!document.querySelector('.flow-insert-menu'));
  console.log('Menu visible after click:', menuVisibleAfter);

  if (!menuVisibleAfter) {
    console.error('Test failed: Flow insert menu did not appear after clicking loop-back connection!');
  } else {
    console.log('Test passed: Flow insert menu appeared successfully!');
  }

  await browser.close();
}

run().catch(console.error);
