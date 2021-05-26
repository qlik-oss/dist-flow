import '../../../../../../../test/unit/node-setup';
import chai from 'chai';
import axis from '../axis';

const expect = chai.expect;

describe('chart builder - axis component', () => {
  let expectedSettings;

  beforeEach(() => {
    expectedSettings = {
      key: 'axis',
      type: 'axis',
      dock: 'bottom',
      brush: { trigger: [], consume: [] },
      settings: {
        title: {
          fontSize: '12px',
          fontFamily: 'QlikView Sans, sans-serif',
          fill: '#333333',
        },
        line: { show: true, strokeWidth: 1, stroke: '#cccccc' },
        labels: {
          fill: '#595959',
          fontSize: '12px',
          fontFamily: 'QlikView Sans, sans-serif',
          mode: 'auto',
          tiltAngle: 40,
          maxEdgeBleed: 75,
          maxSize: 150,
        },
        ticks: { stroke: '#cccccc' },
        minorTicks: { stroke: '#cccccc' },
      },
    };
  });

  it('should return axis settings with default values', () => {
    const axisSettings = axis();
    expect(axisSettings).to.deep.equal(expectedSettings);
  });

  it('should return x-axis settings with default values', () => {
    expectedSettings.key = 'x-axis';
    expectedSettings.scale = 'x';

    const axisSettings = axis.xAxis();

    expect(axisSettings).to.deep.equal(expectedSettings);
  });

  it('should return y-axis settings with default values', () => {
    expectedSettings.key = 'y-axis';
    expectedSettings.dock = 'left';
    expectedSettings.scale = 'y';

    const axisSettings = axis.yAxis(null);

    expect(axisSettings).to.deep.equal(expectedSettings);
  });

  it('should return x-axis settings for RTL', () => {
    expectedSettings.key = 'x-axis';
    expectedSettings.scale = 'x';
    expectedSettings.settings.labels.tiltAngle = -40;

    const axisSettings = axis.xAxis({}, { isRtl: true });

    expect(axisSettings).to.deep.equal(expectedSettings);
  });
});
