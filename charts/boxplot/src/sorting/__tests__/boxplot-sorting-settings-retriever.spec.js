// 
import chai from 'chai';
import boxplotSortingSettingsRetriever from '../boxplot-sorting-settings-retriever';
import SETTINGS from '../boxplot-sorting-settings';

const expect = chai.expect;

describe('boxplot-sorting-settings-retriever', () => {
  it('should expose the correct api', () => {
    expect(Object.keys(boxplotSortingSettingsRetriever).length).to.equal(1);
    expect(boxplotSortingSettingsRetriever).to.have.keys(['getSettings']);
  });

  describe('getSettings', () => {
    const layout = {
      boxplotDef: {
        qHyperCube: {
          qDimensionInfo: [{}, {}],
        },
      },
    };

    it('should return correct settings when cardinality is ten or less', () => {
      const cardinalities = [-10, 0, 5, 10];

      cardinalities.forEach((cardinality) => {
        layout.boxplotDef.qHyperCube.qDimensionInfo[1].qCardinal = cardinality;

        const settings = boxplotSortingSettingsRetriever.getSettings(layout);

        expect(settings, `Cardinality: ${cardinality}`).to.equal(SETTINGS.ASCII);
      });
    });

    it('should select correct settings when cardinality is larger than ten', () => {
      const cardinalities = [11, 100];

      cardinalities.forEach((cardinality) => {
        layout.boxplotDef.qHyperCube.qDimensionInfo[1].qCardinal = cardinality;

        const settings = boxplotSortingSettingsRetriever.getSettings(layout);

        expect(settings, `Cardinality: ${cardinality}`).to.equal(SETTINGS.BOX_MIDDLE);
      });
    });
  });
});
