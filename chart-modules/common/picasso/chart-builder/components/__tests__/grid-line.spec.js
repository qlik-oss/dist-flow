import '../../../../../../../test/unit/node-setup';
import chai from 'chai';
import gridLine from '../grid-line';

const expect = chai.expect;

describe('chart builder - grid-line component', () => {
  const expectedSettings = {
    displayOrder: -1,
    key: 'grid-line',
    type: 'grid-line',
    x: null,
    y: null,
    ticks: { stroke: '#cccccc' },
    minorTicks: { stroke: '#cccccc' },
  };

  it('should return grid line settings with default values', () => {
    const gridLineSettings = gridLine();

    expect(gridLineSettings).to.deep.equal(expectedSettings);
  });

  it('should return grid line settings with extended values', () => {
    const gridLineSettings = gridLine();

    expect(gridLineSettings).to.deep.equal(expectedSettings);
  });
});
