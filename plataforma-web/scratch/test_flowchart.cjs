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

  // Get lines coordinates
  const lines = await page.evaluate(() => {
    const lineElems = document.querySelectorAll('g.flow-connection-interactive line, svg > g > g > line');
    const coords = [];
    lineElems.forEach(l => {
      const x1 = l.getAttribute('x1');
      const y1 = l.getAttribute('y1');
      const x2 = l.getAttribute('x2');
      const y2 = l.getAttribute('y2');
      const stroke = l.getAttribute('stroke');
      if (stroke !== 'transparent') {
        coords.push({ x1, y1, x2, y2 });
      }
    });
    return coords;
  });
  console.log('Line coordinates:', lines);

  await browser.close();
}

run().catch(console.error);
