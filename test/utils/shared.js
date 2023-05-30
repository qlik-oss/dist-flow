import { expect } from '@playwright/test';

async function getTooltipContent(page) {
  const tooltip = await page.waitForSelector('.pic-tooltip', { visible: true });
  const tooltipContent = await tooltip.$$eval('.pic-tooltip-content tr td', (dataEntries) =>
    dataEntries.map((dataEntry) => dataEntry.textContent)
  );
  return tooltipContent.join(' ');
}

async function checkScreenshotBrushing(selector, page, nameOfFile) {
  const sourceToMoveMouse = await page.waitForSelector('[data-key="lasso"]');
  const moveMouseToAvoidTooltip = await sourceToMoveMouse.boundingBox();
  await page.mouse.move(moveMouseToAvoidTooltip.x, moveMouseToAvoidTooltip.y);
  await page.waitForTimeout(250);
  const element = page.locator(selector, { state: 'visible' });
  const image = await page.screenshot({ clip: await element.boundingBox() });
  expect(image).toMatchSnapshot(nameOfFile);
}

async function drag(page, from, to, options) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, options);
  await page.mouse.up();
}

export { checkScreenshotBrushing, getTooltipContent, drag };
