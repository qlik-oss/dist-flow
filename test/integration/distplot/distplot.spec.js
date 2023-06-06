import path from 'path';
import serve from '@nebula.js/cli-serve';
import { test, chromium, expect } from '@playwright/test';
import createNebulaRoutes from '../../utils/routes';
import { checkScreenshotBrushing, getTooltipContent, drag } from '../../utils/shared';

test.describe('distplot', () => {
  let s;
  let route;

  test.beforeAll(async () => {
    s = await serve({
      entry: path.resolve(__dirname, '../../../charts/distributionplot/dist/sn-distplot.js'),
      type: 'distributionplot',
      open: false,
      build: false,
      themes: [],
      flags: {},
      fixturePath: 'test/integration/distplot/__fixtures__',
    });

    route = createNebulaRoutes(s.url);
  });

  test.afterAll(async () => {
    s.close();
  });

  test.describe('Interaction', () => {
    test.describe('Brushing', () => {
      test('select by point ', async () => {
        const renderUrl = await route.renderFixture('distplot_with_others.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        await page.click('[data-key="selection-point-marker"] g circle[data-label="a"]');
        await checkScreenshotBrushing('[data-key="lasso"]', page, 'distplot_brush_point_selection.png');
      });
      test('legend single selection', async () => {
        const renderUrl = await route.renderFixture('distplot_with_others.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        const source = await page.waitForSelector('[data-key="colorLegend-cat"] g g[data-label="b"]');
        const sourceRect = await source.boundingBox();
        const clickArea = {
          x: Math.ceil(sourceRect.x + sourceRect.width / 2),
          y: Math.ceil(sourceRect.y + sourceRect.height / 2),
        };
        await page.mouse.click(clickArea.x, clickArea.y);
        await checkScreenshotBrushing('[data-key="lasso"]', page, 'distplot_brush_legend_single.png');
      });
      test('Select by Y-axis range ', async () => {
        const renderUrl = await route.renderFixture('distplot_with_others.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });

        await page.waitForSelector('svg[data-key="y-axis"]', { visible: true });
        const yAxisLabels = await page.$$('svg[data-key="y-axis"] text');
        const labelsMap = await page.$$eval('svg[data-key="y-axis"] text', (ticks) =>
          ticks.map((tick) => tick.textContent === '0,5' || tick.textContent === '1,5')
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
        await checkScreenshotBrushing('[data-key="rangeMeasure"]', page, 'distplot_brush_y_axis_range_selection.png');
      });
      test('Select by X-axis range ', async () => {
        const renderUrl = await route.renderFixture('distplot_with_others.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });

        await page.waitForSelector('svg[data-key="x-axis"]', { visible: true });
        const yAxisLabels = await page.$$('svg[data-key="x-axis"] text');
        const labelsMap = await page.$$eval('svg[data-key="x-axis"] text', (ticks) =>
          ticks.map((tick) => tick.textContent === 'X' || tick.textContent === 'Others')
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
        await checkScreenshotBrushing('[data-key="rangeDim"]', page, 'distplot_brush_x_axis_range_selection.png');
      });
    });

    test.describe('Tooltip', () => {
      test('Point data', async () => {
        const renderUrl = await route.renderFixture('distplot_with_others.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        page.locator('[data-key="selection-point-marker"] g circle[data-label="a"]');
        await page.hover('[data-key="selection-point-marker"] g circle[data-label="a"]');
        expect(await getTooltipContent(page)).toEqual('a, X Dim2: a Avg(Expression2): 0,09');
      });
    });
  });
});
