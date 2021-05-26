import '../../../../../../../test/unit/node-setup';
import chai from 'chai';
import legend from '../categorical-legend';

const expect = chai.expect;

describe('chart builder - legend component', () => {
  it('should return ref lines settings with default', () => {
    const legendSettings = legend({}, { chartWidth: 100, chartHeight: 200 });

    expect(legendSettings.settings.layout.direction).to.equal('ltr');
    expect(legendSettings.dock).to.equal('bottom');
  });

  it('should return legend settings with rtl values', () => {
    const legendSettings = legend({}, { chartWidth: 200, chartHeight: 100, isRtl: true });

    expect(legendSettings.settings.layout.direction).to.equal('rtl');
    expect(legendSettings.dock).to.equal('left');
  });
});
