// import '../../../../../test/unit/node-setup';
import chai from 'chai';
import BINNING_DEFAULTS from '../binning-defaults';

const expect = chai.expect;

describe('Histogram binning defaults', () => {
  it('should be frozen', () => {
    expect(BINNING_DEFAULTS).to.be.frozen;
  });

  it('should have the correct properties', () => {
    expect(BINNING_DEFAULTS.hasOwnProperty('AUTO')).to.be.true;
    expect(BINNING_DEFAULTS.hasOwnProperty('BIN_COUNT')).to.be.true;
    expect(BINNING_DEFAULTS.hasOwnProperty('BIN_SIZE')).to.be.true;
    expect(BINNING_DEFAULTS.hasOwnProperty('LABEL')).to.be.true;
    expect(BINNING_DEFAULTS.hasOwnProperty('OFFSET')).to.be.true;
    expect(BINNING_DEFAULTS.hasOwnProperty('COUNT_DISTINCT')).to.be.true;
  });

  it('should have the correct AUTO default', () => {
    expect(BINNING_DEFAULTS.AUTO).to.equal(true);
  });

  it('should have the correct BIN_COUNT default', () => {
    expect(BINNING_DEFAULTS.BIN_COUNT).to.equal(10);
  });

  it('should have the correct BIN_SIZE default', () => {
    expect(BINNING_DEFAULTS.BIN_SIZE).to.equal(10);
  });

  it('should have the correct LABEL default', () => {
    expect(BINNING_DEFAULTS.LABEL).to.equal('x');
  });

  it('should have the correct OFFSET default', () => {
    expect(BINNING_DEFAULTS.OFFSET).to.equal(0);
  });

  it('should have the correct COUNT_DISTINCT default', () => {
    expect(BINNING_DEFAULTS.COUNT_DISTINCT).to.equal(false);
  });
});
