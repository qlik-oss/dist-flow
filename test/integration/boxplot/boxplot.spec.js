import path from 'path';
import serve from '@nebula.js/cli-serve';
import { test, chromium } from '@playwright/test';
import createNebulaRoutes from '../../utils/routes';
import { checkScreenshotBrushing, drag } from '../../utils/shared';

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
      test('legend single selection', async () => {
        const renderUrl = await route.renderFixture('boxplot_basic_4.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        const source = await page.waitForSelector('[data-key="x-axis"]');
        const sourceRect = await source.boundingBox();

        const from = {
          x: sourceRect.x + sourceRect.width / 4,
          y: sourceRect.y + sourceRect.height / 2,
        };

        const to = {
          x: sourceRect.x + sourceRect.width / 2,
          y: sourceRect.y + sourceRect.height / 2,
        };

        await drag(page, from, to, { steps: 30 });
        await checkScreenshotBrushing('[data-key="lasso"]', page, 'boxplot_brush_legend_single.png');
      });
    });
  });
});
