import chai from 'chai';
import axis from '../axis';

const expect = chai.expect;

describe('chart builder - axis component', () => {
  let expectedSettings;
  let theme;

  beforeEach(() => {
    theme = {
      getStyle: jest.fn().mockImplementation((chartID, path, attr) => `themed:${path}.${attr}`),
    };
    expectedSettings = {
      key: 'axis',
      type: 'axis',
      dock: 'bottom',
      brush: { trigger: [], consume: [] },
      settings: {
        title: {
          fontSize: 'themed:axis.title.fontSize',
          fontFamily: 'themed:axis.title.fontFamily',
          fill: 'themed:axis.title.color',
        },
        line: {
          show: true,
          strokeWidth: 1,
          stroke: 'themed:axis.line.major.color',
        },
        labels: {
          fill: 'themed:axis.label.name.color',
          fontSize: 'themed:axis.label.name.fontSize',
          fontFamily: 'themed:axis.label.name.fontFamily',
          mode: 'auto',
          tiltAngle: 40,
          maxEdgeBleed: 75,
          maxSize: 150,
        },
        ticks: { stroke: 'themed:axis.line.major.color' },
        minorTicks: { stroke: 'themed:axis.line.major.color' },
      },
    };
  });

  it('should return axis settings with default values', () => {
    const axisSettings = axis(null, { theme });
    expect(axisSettings).to.deep.equal(expectedSettings);
  });

  it('should return x-axis settings with default values', () => {
    expectedSettings.key = 'x-axis';
    expectedSettings.scale = 'x';

    const axisSettings = axis.xAxis(null, { theme });

    expect(axisSettings).to.deep.equal(expectedSettings);
  });

  it('should return y-axis settings with default values', () => {
    expectedSettings.key = 'y-axis';
    expectedSettings.dock = 'left';
    expectedSettings.scale = 'y';

    const axisSettings = axis.yAxis(null, { theme });

    expect(axisSettings).to.deep.equal(expectedSettings);
  });

  it('should return x-axis settings for RTL', () => {
    expectedSettings.key = 'x-axis';
    expectedSettings.scale = 'x';
    expectedSettings.settings.labels.tiltAngle = -40;

    const axisSettings = axis.xAxis({}, { isRtl: true, theme });

    expect(axisSettings).to.deep.equal(expectedSettings);
  });
});
