// import '../../../../../test/unit/node-setup';
import chai from 'chai';
import sinon from 'sinon';
import distplotData from '../distributionplot-data';
import translator from '../../../../js/lib/translator';

const expect = chai.expect;

describe('distributionplot-data', () => {
  let sandbox;
  let measureProperties;
  let dimensionProperties;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    measureProperties = {
      orientation: '',
    };

    dimensionProperties = {
      orientation: '',
    };

    sandbox.stub(translator, 'get').callsFake((property) => property);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('measures.description', () => {
    it("should return 'properties.yAxis' when vertical orientation", () => {
      measureProperties.orientation = 'vertical';
      const description = distplotData.measures.description(measureProperties);
      expect(description).to.equal('properties.yAxis');
    });

    it("should return 'properties.xAxis' when horizontal orientation", () => {
      measureProperties.orientation = 'horizontal';
      const description = distplotData.measures.description(measureProperties);
      expect(description).to.equal('properties.xAxis');
    });
  });

  describe('dimension.description', () => {
    it("should return 'Visualizations.Descriptions.Point' when index zero", () => {
      const description = distplotData.dimensions.description(dimensionProperties, 0);
      expect(description).to.equal('Visualizations.Descriptions.Point');
    });

    it("should return 'properties.xAxis' when index not zero and vertical orientation", () => {
      dimensionProperties.orientation = 'vertical';
      const description = distplotData.dimensions.description(dimensionProperties, 1);
      expect(description).to.equal('properties.xAxis');
    });

    it("should return 'properties.yAxis' when index not zero and horizontal orientation", () => {
      dimensionProperties.orientation = 'horizontal';
      const description = distplotData.dimensions.description(dimensionProperties, 1);
      expect(description).to.equal('properties.yAxis');
    });
  });
});
