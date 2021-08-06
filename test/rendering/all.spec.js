import consoleEvent from '../utils/on-console-event';
import errorEvent from '../utils/on-pageerror-event';

const puppeteer = require('puppeteer');
const fs = require('fs');

const OPTS = {
  artifactsPath: 'test/rendering/__artifacts__',
};

describe('Rendering test - Bar chart', () => {
  let browser;
  let page;

  async function open(type, data) {
    const url = `http://localhost:8088?target=${type}&data=${data}.json&constraints=active,passive`;

    page.on('console', consoleEvent);
    page.on('pageerror', errorEvent);
    await page.goto(url);
    return page.waitForSelector('.njs-viz[data-render-count="1"]', { visible: true, timeout: 2000 });
  }

  async function takeScreenshot(elm) {
    return page.screenshot({ clip: await elm.boundingBox() });
  }

  before(async () => {
    const debug = false;
    const debugLaunchOptions = {
      headless: false,
      slowMo: 200,
    };
    browser = await puppeteer.launch(debug ? debugLaunchOptions : {});
    page = await browser.newPage();
    if (debug) {
      page.bringToFront();
    }
  });

  after(async () => {
    await browser.close();
  });

  afterEach(() => {
    page.removeListener('console', consoleEvent);
    page.removeListener('pageerror', errorEvent);
  });

  const chartTypes = ['boxplot', 'distplot', 'histogram', 'waterfall'];
  chartTypes.forEach((type) => {
    fs.readdirSync(`test/__data__/${type}`).forEach((file) => {
      const name = file.replace('.json', '');
      it(name, async () => {
        const elm = await open(type, name);
        const img = await takeScreenshot(elm);
        return expect(img).to.matchImageOf(name, OPTS, 0.0005);
      });
    });
  });
});
