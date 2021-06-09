import chai from 'chai';
import sinon from 'sinon';
import boxplotData from '../boxplot-data';

const expect = chai.expect;

describe('boxplot-data', () => {
  let sandbox;
  let measureProperties;
  let dimensionProperties;
  let translator;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    measureProperties = {
      orientation: '',
    };

    dimensionProperties = {
      qHyperCubeDef: {
        qDimensions: [],
      },
      orientation: '',
    };

    translator = {
      get: (property) => property,
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('measures.description', () => {
    it("should return 'properties.yAxis' when vertical orientation", () => {
      measureProperties.orientation = 'vertical';
      const description = boxplotData.measures.description(measureProperties);
      expect(description).to.equal('properties.yAxis');
    });

    it("should return 'properties.xAxis' when horizontal orientation", () => {
      measureProperties.orientation = 'horizontal';
      const description = boxplotData.measures.description(measureProperties);
      expect(description).to.equal('properties.xAxis');
    });
  });

  describe('dimensions.description', () => {
    it("should return 'Visualizations.Descriptions.Box' when index zero", () => {
      dimensionProperties.qHyperCubeDef.qDimensions = [{}];
      const description = boxplotData.dimensions.description(dimensionProperties, 0);
      expect(description).to.equal('Visualizations.Descriptions.Box');
    });

    it("should return 'properties.xAxis' when three dimensions, index not two and vertical orientation", () => {
      dimensionProperties.qHyperCubeDef.qDimensions = [{}, {}, {}];
      dimensionProperties.orientation = 'vertical';
      const description = boxplotData.dimensions.description(dimensionProperties, 1);
      expect(description).to.equal('properties.xAxis');
    });

    it("should return 'properties.yAxis' when three dimensions, index not two and horizontal orientation", () => {
      dimensionProperties.qHyperCubeDef.qDimensions = [{}, {}, {}];
      dimensionProperties.orientation = 'horizontal';
      const description = boxplotData.dimensions.description(dimensionProperties, 1);
      expect(description).to.equal('properties.yAxis');
    });
  });
});
