import path from 'path';
import serve from '@nebula.js/cli-serve';
import { test, chromium } from '@playwright/test';
import createNebulaRoutes from '../../utils/routes';
import { checkScreenshotBrushing } from '../../utils/shared';

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
    });
  });
});
