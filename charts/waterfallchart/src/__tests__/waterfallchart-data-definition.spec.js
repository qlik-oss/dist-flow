import chai from 'chai';
import waterfallDataFn from '../waterfallchart-data-definition';

const expect = chai.expect;

describe('waterfall-data-definition', () => {
  let waterfallData;

  beforeEach(() => {
    const translator = { get: (property) => property };
    const env = { translator };
    waterfallData = waterfallDataFn(env).targets[0];
  });

  describe('measures.description', () => {
    it("should return 'Visualizations.Descriptions.Bars'", () => {
      expect(waterfallData.measures.description()).to.equal('Visualizations.Descriptions.Bars');
    });
  });
});
