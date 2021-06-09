
import chai from 'chai';
import histogramProperties from '../histogram-properties';

const expect = chai.expect;

describe('histogram-properties ', () => {
  describe('Binning', () => {
    const binning = histogramProperties.items.bins;

    it('should be able to adjust the number of bins when auto is false and binMode is maxCount', () => {
      const data = {
        bins: {
          auto: false,
          binCount: 10,
          binSize: 10,
          offset: 0,
          binMode: 'maxCount',
        },
      };

      expect(binning.items.binCount.show(data)).to.be.true;
    });

    it('should be able to adjust the size of bins and offset when auto is false and bin mode is size', () => {
      const data = {
        bins: {
          auto: false,
          binCount: 10,
          binSize: 10,
          offset: 0,
          binMode: 'size',
        },
      };

      expect(binning.items.binSize.show(data)).to.be.true;
      expect(binning.items.offset.show(data)).to.be.true;
    });
  });
});
