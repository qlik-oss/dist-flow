// import '../../../../../test/unit/node-setup';
import chai from 'chai';
import sinon from 'sinon';
import histogramData from '../histogram-data';
import translator from '../../../../js/lib/translator';

const expect = chai.expect;

describe('histogram-data', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(translator, 'get').callsFake((property) => property);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('dimensions.description', () => {
    it("should return 'Visualization.Histogram.Binning'", () => {
      expect(histogramData.dimensions.description()).to.equal('Visualization.Histogram.Binning');
    });
  });
});
