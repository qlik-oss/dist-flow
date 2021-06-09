import chai from 'chai';
import legend from '../categorical-legend';

const expect = chai.expect;

describe('chart builder - legend component', () => {
  let theme;
  beforeEach(() => {
    theme = {
      getStyle: jest.fn(),
    };
  });

  it('should return ref lines settings with default', () => {
    const legendSettings = legend({}, { chartWidth: 100, chartHeight: 200, theme });

    expect(legendSettings.settings.layout.direction).to.equal('ltr');
    expect(legendSettings.dock).to.equal('bottom');
  });

  it('should return legend settings with rtl values', () => {
    const legendSettings = legend({}, { chartWidth: 200, chartHeight: 100, isRtl: true, theme });

    expect(legendSettings.settings.layout.direction).to.equal('rtl');
    expect(legendSettings.dock).to.equal('left');
  });
});
