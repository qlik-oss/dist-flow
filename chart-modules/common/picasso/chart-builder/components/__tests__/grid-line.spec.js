import chai from 'chai';
import gridLine from '../grid-line';

const expect = chai.expect;

describe('chart builder - grid-line component', () => {
  let theme;
  beforeEach(() => {
    theme = {
      getStyle: jest.fn().mockReturnValue('value-in-theme'),
    };
  });

  const expectedSettings = {
    displayOrder: -1,
    key: 'grid-line',
    type: 'grid-line',
    x: null,
    y: null,
    ticks: { stroke: 'value-in-theme' },
    minorTicks: { stroke: 'value-in-theme' },
  };

  it('should return grid line settings with default values', () => {
    const gridLineSettings = gridLine(null, { theme });

    expect(gridLineSettings).to.deep.equal(expectedSettings);
  });
});
