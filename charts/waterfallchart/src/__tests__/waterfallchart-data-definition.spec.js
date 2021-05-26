// import '../../../../../test/unit/node-setup';
import chai from 'chai';
import sinon from 'sinon';
import waterfallData from '../waterfallchart-data-definition';
import translator from '../../../../js/lib/translator';

const expect = chai.expect;

describe('waterfall-data-definition', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(translator, 'get').callsFake((property) => property);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('measures.description', () => {
    it("should return 'Visualizations.Descriptions.Bars'", () => {
      expect(waterfallData.measures.description()).to.equal('Visualizations.Descriptions.Bars');
    });
  });
});
