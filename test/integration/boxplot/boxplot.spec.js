import path from 'path';
import serve from '@nebula.js/cli-serve';
import { test, chromium, expect } from '@playwright/test';
import createNebulaRoutes from '../../utils/routes';
import { checkScreenshotBrushing, drag, getTooltipContent } from '../../utils/shared';

test.describe('boxplot', () => {
  let s;
  let route;

  test.beforeAll(async () => {
    s = await serve({
      entry: path.resolve(__dirname, '../../../charts/boxplot/dist/sn-boxplot.js'),
      type: 'boxplot',
      open: false,
      build: false,
      themes: [],
      flags: {},
      fixturePath: 'test/integration/boxplot/__fixtures__',
    });

    route = createNebulaRoutes(s.url);
  });

  test.afterAll(async () => {
    s.close();
  });

  test.describe('Interaction', () => {
    test.describe('Brushing', () => {
      test('select by point 1 dimensional ', async () => {
        const renderUrl = await route.renderFixture('boxplot_basic_1.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        await page.click('[data-key="point-marker"] g circle[data-label="Sep"]');
        await checkScreenshotBrushing('[data-key="lasso"]', page, 'boxplot_brush_point_selection.png');
      });
      test('select by point 2 dimensional ', async () => {
        const renderUrl = await route.renderFixture('boxplot_basic_4.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        await page.click('[data-key="box-marker"] g rect[data-label="Greg Kaphammer"]');
        await checkScreenshotBrushing('[data-key="lasso"]', page, 'boxplot_brush_box_selection.png');
      });
      test('select by X-axis range ', async () => {
        const renderUrl = await route.renderFixture('boxplot_basic_4.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });

        await page.waitForSelector('svg[data-key="x-axis"]', { visible: true });
        const yAxisLabels = await page.$$('svg[data-key="x-axis"] text');
        const labelsMap = await page.$$eval('svg[data-key="x-axis"] text', (ticks) =>
          ticks.map((tick) => tick.textContent === 'Greg Ballantyne' || tick.textContent === 'Harold Ogden')
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
        await checkScreenshotBrushing('[data-key="rangeDim"]', page, 'boxplot_brush_x_axis_range_selection.png');
      });
    });

    test.describe('Tooltip', () => {
      test('point data and box data', async () => {
        const renderUrl = await route.renderFixture('boxplot_basic_4.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        await page.locator('[data-key="point-marker"] g circle[data-label="Central"]').nth(1).hover();
        expect(await getTooltipContent(page)).toEqual('Central, Greg Ballantyne Actual Amount: 3.26M');
        await page.locator('[data-key="box-marker"] g rect[data-label="Greg Ballantyne"]').hover();
        expect(await getTooltipContent(page)).toEqual(
          'Greg Ballantyne - Actual Amount    Box end + 1.5 IQR: 2.94M    Third quartile: 1.22M    Median: 314.72k    First quartile: 73.65k    Box start - 1.5 IQR: 16.19k'
        );
      });
    });
  });
});
