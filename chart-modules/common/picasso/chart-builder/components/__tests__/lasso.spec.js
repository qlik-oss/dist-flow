import '../../../../../../../test/unit/node-setup';
import chai from 'chai';
import lasso from '../lasso';

const expect = chai.expect;

describe('chart builder - lasso component', () => {
  let expectedSettings;
  beforeEach(() => {
    expectedSettings = {
      key: 'lasso',
      type: 'brush-lasso',
      displayOrder: 99,
      settings: {
        brush: {
          components: [],
        },
        lasso: {
          fill: 'rgba(0, 0, 0, 0)',
          stroke: 'rgba(102,102,102,1)',
          strokeWidth: 2,
          opacity: 1,
          strokeDasharray: null, // '10, 4',
        },
        startPoint: {
          r: 10,
          fill: 'rgba(0, 152, 69, 1)',
          strokeWidth: 0,
          opacity: 1,
        },
      },
    };
  });

  it('should return lasso settings with default values', () => {
    const lassoSettings = lasso();

    expect(lassoSettings).to.deep.equal(expectedSettings);
  });

  it('should return lasso settings with extended values', () => {
    const options = {
      brushKey: 'select-thing',
      brushComponents: ['marker-thing'],
    };
    const lassoSettings = lasso({ key: 'lasso-thing' }, options);
    expectedSettings.key = 'lasso-thing';
    expectedSettings.settings.brush.components.push({
      contexts: ['select-thing'],
      data: ['elemNo'],
      key: 'marker-thing',
    });
    expect(lassoSettings).to.deep.equal(expectedSettings);
  });
});
