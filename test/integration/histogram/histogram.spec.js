import path from 'path';
import serve from '@nebula.js/cli-serve';
import { test, chromium, expect } from '@playwright/test';
import createNebulaRoutes from '../../utils/routes';
import { getTooltipContent, drag, checkScreenshotBrushing } from '../../utils/shared';

test.describe('histogram', () => {
  let s;
  let route;

  test.beforeAll(async () => {
    s = await serve({
      entry: path.resolve(__dirname, '../../../charts/histogram/dist/sn-histogram.js'),
      type: 'histogram',
      open: false,
      build: false,
      themes: [],
      flags: {},
      fixturePath: 'test/integration/histogram/__fixtures__',
    });

    route = createNebulaRoutes(s.url);
  });

  test.afterAll(async () => {
    s.close();
  });

  test.describe('Interaction', () => {
    test.describe('Brushing', () => {
      test('select by bar ', async () => {
        const renderUrl = await route.renderFixture('histogram_basic_1.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        await page.click('[data-key="box-marker"] g rect[data-label="5.5 <= x < 6.6"]');
        await checkScreenshotBrushing('[data-key="lasso"]', page, 'histogram_brush_bar_selection.png');
      });
      test('select by Y-axis range ', async () => {
        const renderUrl = await route.renderFixture('histogram_basic_1.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });

        await page.waitForSelector('svg[data-key="y-axis"]', { visible: true });
        const yAxisLabels = await page.$$('svg[data-key="y-axis"] text');
        const labelsMap = await page.$$eval('svg[data-key="y-axis"] text', (ticks) =>
          ticks.map((tick) => tick.textContent === '20' || tick.textContent === '40')
        );
        const range = yAxisLabels.filter((label, j) => labelsMap[j]);
        const lowerRect = await range[0].boundingBox();
        const upperRect = await range[1].boundingBox();

        const from = {
          x: lowerRect.x,
          y: lowerRect.y + lowerRect.height / 2,
        };

        const to = {
          x: upperRect.x,
          y: upperRect.y + upperRect.height / 2,
        };
        await drag(page, from, to, { steps: 20 });
        await checkScreenshotBrushing('[data-key="rangeMeasure"]', page, 'histogram_brush_y_axis_range_selection.png');
      });
      test('select by X-axis range ', async () => {
        const renderUrl = await route.renderFixture('histogram_basic_1.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });

        await page.waitForSelector('svg[data-key="x-axis"]', { visible: true });
        const yAxisLabels = await page.$$('svg[data-key="x-axis"] text');
        const labelsMap = await page.$$eval('svg[data-key="x-axis"] text', (ticks) =>
          ticks.map((tick) => tick.textContent === '4' || tick.textContent === '8')
        );
        const range = yAxisLabels.filter((label, j) => labelsMap[j]);
        const lowerRect = await range[0].boundingBox();
        const upperRect = await range[1].boundingBox();

        const from = {
          x: lowerRect.x,
          y: lowerRect.y + lowerRect.height / 2,
        };

        const to = {
          x: upperRect.x,
          y: upperRect.y + upperRect.height / 2,
        };
        await drag(page, from, to, { steps: 20 });
        await checkScreenshotBrushing('[data-key="rangeMinor"]', page, 'histogram_brush_x_axis_range_selection.png');
      });
    });
    test.describe('Tooltip', () => {
      test('bar', async () => {
        const renderUrl = await route.renderFixture('histogram_basic_1.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        await page.locator('[data-key="box-marker"] g rect[data-label="5.5 <= x < 6.6"]').hover();
        expect(await getTooltipContent(page)).toEqual('5.5 <= x < 6.6 Other label: 42');
      });
    });
  });
});
