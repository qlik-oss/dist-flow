// 
import chai from 'chai';
import distributionplotSortingSettingsRetriever from '../distributionplot-sorting-settings-retriever';
import SETTINGS from '../distributionplot-sorting-settings';

const expect = chai.expect;

describe('distributionplot-sorting-settings-retriever', () => {
  it('should expose the correct api', () => {
    expect(Object.keys(distributionplotSortingSettingsRetriever).length).to.equal(1);
    expect(distributionplotSortingSettingsRetriever).to.have.keys(['getSettings']);
  });

  describe('getSettings', () => {
    const layout = {
      qHyperCube: {
        qDimensionInfo: [{}, {}],
      },
    };

    it('should return correct settings when cardinality is ten or less', () => {
      const cardinalities = [-10, 0, 5, 10];

      cardinalities.forEach((cardinality) => {
        layout.qHyperCube.qDimensionInfo[1].qCardinal = cardinality;

        const settings = distributionplotSortingSettingsRetriever.getSettings(layout);

        expect(settings, `Cardinality: ${cardinality}`).to.equal(SETTINGS.ASCII);
      });
    });

    it('should select correct settings when cardinality is larger than ten', () => {
      const cardinalities = [11, 100];

      cardinalities.forEach((cardinality) => {
        layout.qHyperCube.qDimensionInfo[1].qCardinal = cardinality;

        const settings = distributionplotSortingSettingsRetriever.getSettings(layout);

        expect(settings, `Cardinality: ${cardinality}`).to.equal(SETTINGS.DIST_MAX);
      });
    });
  });
});
