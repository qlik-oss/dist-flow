import chai from 'chai';
import range from '../range';

const expect = chai.expect;

describe('chart builder - range component', () => {
  let expectedSettings;

  beforeEach(() => {
    expectedSettings = {
      key: 'range',
      type: 'brush-range',
      displayOrder: 99,
      settings: {
        fill: 'rgba(0, 0, 0, 0)',
        multiple: true,
        direction: 'vertical',
        target: {
          fill: 'rgba( 82, 204, 82, 0.2 )',
          fillActive: 'rgba(82, 204, 82, 0.4)',
        },
        bubbles: {
          align: 'end',
        },
      },
    };
  });

  it('should return range settings with default values', () => {
    const rangeSettings = range();

    expect(rangeSettings).to.deep.equal(expectedSettings);
  });

  it('should return range settings with extended values', () => {
    const options = {
      brushKey: 'select-thing',
      brushScale: 'dimension-thing',
      brushAxis: 'x-thing',
      isHorizontal: true,
    };
    const rangeSettings = range({ key: 'dim-range-thing' }, options);
    expectedSettings.key = 'dim-range-thing';
    expectedSettings.dock = '@x-thing';
    expectedSettings.settings.brush = 'select-thing';
    expectedSettings.settings.scale = 'dimension-thing';
    expectedSettings.settings.direction = 'horizontal';
    expectedSettings.settings.target.component = 'x-thing';
    expectedSettings.settings.bubbles.align = 'start';

    expect(rangeSettings).to.deep.equal(expectedSettings);
  });

  it('should place bubbles correctly', () => {
    const options = {
      brushKey: 'select-thing',
      brushScale: 'dimension-thing',
      brushAxis: 'x-thing',
      brushArea: 'area-thing',
      isHorizontal: true,
      dock: 'far',
    };
    expectedSettings.key = 'dim-range-thing';
    expectedSettings.dock = '@x-thing,@area-thing';
    expectedSettings.settings.brush = 'select-thing';
    expectedSettings.settings.scale = 'dimension-thing';
    expectedSettings.settings.direction = 'horizontal';
    expectedSettings.settings.target.component = 'x-thing';
    expectedSettings.settings.bubbles.align = 'end';

    let rangeSettings = range({ key: 'dim-range-thing' }, options);
    expect(rangeSettings).to.deep.equal(expectedSettings);

    options.isHorizontal = false;
    options.dock = 'far';
    rangeSettings = range({ key: 'dim-range-thing' }, options);
    expectedSettings.settings.bubbles.align = 'start';
    expectedSettings.settings.direction = 'vertical';
    expect(rangeSettings).to.deep.equal(expectedSettings);

    options.isHorizontal = true;
    options.dock = 'near';
    rangeSettings = range({ key: 'dim-range-thing' }, options);
    expectedSettings.settings.bubbles.align = 'start';
    expectedSettings.settings.direction = 'horizontal';
    expect(rangeSettings).to.deep.equal(expectedSettings);

    options.isHorizontal = false;
    options.dock = 'near';
    rangeSettings = range({ key: 'dim-range-thing' }, options);
    expectedSettings.settings.bubbles.align = 'end';
    expectedSettings.settings.direction = 'vertical';
    expect(rangeSettings).to.deep.equal(expectedSettings);
  });
});
