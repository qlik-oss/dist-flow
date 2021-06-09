import sinon from 'sinon';
import chai from 'chai';
import util from '../../../../js/lib/util';
import BINNING_DEFAULTS from '../binning-defaults';
import histogramUtils from '../histogram-utils';

const expect = chai.expect;

describe('Histogram util function ', () => {
  const sandbox = sinon.createSandbox();

  describe('binning related functions', () => {
    const layout = {
      fake: true,
    };

    let utilMock;

    beforeEach(() => {
      utilMock = sandbox.mock(util);
    });

    afterEach(() => {
      sandbox.restore();
    });

    // getBinSize
    it('should have a function to get the bin size setting from a layout', () => {
      expect(histogramUtils.getBinSize).to.be.a('function');
    });

    it('should get the bin size setting using the correct parameters', () => {
      utilMock.expects('getValue').once().withArgs(layout, 'bins.binSize', BINNING_DEFAULTS.BIN_SIZE);

      histogramUtils.getBinSize(layout);

      utilMock.verify();
    });

    // getBinCount
    it('should have a function to get the bin count setting from a layout', () => {
      expect(histogramUtils.getBinCount).to.be.a('function');
    });

    it('should get the bin count setting using the correct parameters', () => {
      utilMock
        .expects('getValue')
        .once()
        // Should not return BINNING_DEFAULTS.BIN_COUNT anymore, we need to know if it's left empty by the user
        // so that we can then use the Sturges' formula to calculate the binCount in the derived hypercube
        .withArgs(layout, 'bins.binCount', undefined);

      histogramUtils.getBinCount(layout);

      utilMock.verify();
    });

    describe('derivedBinCount', () => {
      it('should return the default value if the binCount is not numeric', () => {
        utilMock
          .expects('getValue')
          .once()
          .withArgs(layout, 'qUndoExclude.bins.binCount', BINNING_DEFAULTS.BIN_COUNT)
          .returns('qwerty');

        expect(histogramUtils.getDerivedBinCount(layout)).to.equal(BINNING_DEFAULTS.BIN_COUNT);

        utilMock.verify();
      });

      it('should return 1 if the binCount is less than 1', () => {
        utilMock
          .expects('getValue')
          .once()
          .withArgs(layout, 'qUndoExclude.bins.binCount', BINNING_DEFAULTS.BIN_COUNT)
          .returns(0);

        expect(histogramUtils.getDerivedBinCount(layout)).to.equal(1);

        utilMock.verify();
      });

      it("should return round the number with ceil of it's not an integer", () => {
        utilMock
          .expects('getValue')
          .once()
          .withArgs(layout, 'qUndoExclude.bins.binCount', BINNING_DEFAULTS.BIN_COUNT)
          .returns(4.3);

        expect(histogramUtils.getDerivedBinCount(layout)).to.equal(5);

        utilMock.verify();
      });

      it("should return the number of it's a valid binCount", () => {
        utilMock
          .expects('getValue')
          .once()
          .withArgs(layout, 'qUndoExclude.bins.binCount', BINNING_DEFAULTS.BIN_COUNT)
          .returns(12);

        expect(histogramUtils.getDerivedBinCount(layout)).to.equal(12);

        utilMock.verify();
      });
    });

    // getBinOffset
    it('should have a function to get the bin offset setting from a layout', () => {
      expect(histogramUtils.getBinOffset).to.be.a('function');
    });

    it('should get the bin offset setting using the correct parameters', () => {
      utilMock.expects('getValue').once().withArgs(layout, 'bins.offset', BINNING_DEFAULTS.OFFSET);

      histogramUtils.getBinOffset(layout);

      utilMock.verify();
    });

    // isAutoBin
    it('should have a function to get the auto setting from a layout', () => {
      expect(histogramUtils.getBinOffset).to.be.a('function');
    });

    it('should get the bin auto setting using the correct parameters', () => {
      utilMock.expects('getValue').once().withArgs(layout, 'bins.auto', BINNING_DEFAULTS.AUTO);

      histogramUtils.isAutoBin(layout);

      utilMock.verify();
    });

    // isCountDistinct
    it('should have a function to get the count distinct setting from a layout', () => {
      expect(histogramUtils.isCountDistinct).to.be.a('function');
    });

    it('should get the count distinct setting using the correct parameters', () => {
      utilMock.expects('getValue').once().withArgs(layout, 'bins.countDistinct', BINNING_DEFAULTS.COUNT_DISTINCT);

      histogramUtils.isCountDistinct(layout);

      utilMock.verify();
    });
  });
});
