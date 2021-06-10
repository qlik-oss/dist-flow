import chai from 'chai';
import histogramDataFn from '../histogram-data';

const expect = chai.expect;

describe('histogram-data', () => {
  let histogramData;

  beforeEach(() => {
    const translator = {
      get: (property) => property,
    };
    const env = { translator };
    histogramData = histogramDataFn(env).targets[0];
  });

  describe('dimensions.description', () => {
    it("should return 'Visualization.Histogram.Binning'", () => {
      expect(histogramData.dimensions.description()).to.equal('Visualization.Histogram.Binning');
    });
  });
});
