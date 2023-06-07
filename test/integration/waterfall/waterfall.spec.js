import path from 'path';
import serve from '@nebula.js/cli-serve';
import { test, chromium, expect } from '@playwright/test';
import createNebulaRoutes from '../../utils/routes';
import { getTooltipContent } from '../../utils/shared';

test.describe('waterfallchart', () => {
  let s;
  let route;

  test.beforeAll(async () => {
    s = await serve({
      entry: path.resolve(__dirname, '../../../charts/waterfallchart/dist/sn-waterfall.js'),
      type: 'waterfallchart',
      open: false,
      build: false,
      themes: [],
      flags: {},
      fixturePath: 'test/integration/waterfall/__fixtures__',
    });

    route = createNebulaRoutes(s.url);
  });

  test.afterAll(async () => {
    s.close();
  });

  test.describe('Interaction', () => {
    test.describe('Tooltip', () => {
      test('positive, negative, subtotal and total', async () => {
        const renderUrl = await route.renderFixture('waterfall_basic_1.fix.js');
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(renderUrl, { waitUntil: 'networkidle' });
        // positive
        await page.locator('[data-key="box-marker"] g rect[data-label="Northeast Revenue"]').hover();
        expect(await getTooltipContent(page)).toEqual('Northeast Revenue: 7.23M');
        // subtotal
        await page.locator('[data-key="box-marker"] g rect[data-label="Revenue"]').hover();
        expect(await getTooltipContent(page)).toEqual('Revenue: 98.67M');
        // negative
        await page.locator('[data-key="box-marker"] g rect[data-label="Actual Amount"]').hover();
        expect(await getTooltipContent(page)).toEqual('Actual Amount: -46.26M');
        // subtotals
        await page.locator('[data-key="box-marker"] g rect[data-label="Subtotals"]').hover();
        expect(await getTooltipContent(page)).toEqual('Subtotals: 52.41M');
      });
    });
  });
});
