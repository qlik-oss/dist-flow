// 
import chai from 'chai';
import sinon from 'sinon';
import distplotSortingElementsRetriever from '../distributionplot-sorting-elements-retriever';
import translator from '../../../../../js/lib/translator';

const expect = chai.expect;
let sandbox;
const innerDimName = 'innerDimName';
const outerDimName = 'outerDimName';
const measureName = 'measureName';

describe('distributionplot-sorting-elements-retriever', () => {
  let measureExpressions;
  let dimensionExpressions;
  let settings;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(translator, 'get').callsFake((translationKey) => `${translationKey}_translated`);

    measureExpressions = [measureName];

    dimensionExpressions = [innerDimName, outerDimName];

    settings = {
      ELEMENT: 'distplot-exp-max',
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should expose the correct api', () => {
    expect(Object.keys(distplotSortingElementsRetriever).length).to.equal(3);
    expect(distplotSortingElementsRetriever).to.have.keys(['getElements', 'getElementIds', 'getFractileExpression']);
  });

  describe('getElementIds', () => {
    it('should return correct element ids', () => {
      const elementIds = distplotSortingElementsRetriever.getElementIds();

      expect(elementIds).to.deep.equal(['distplot-exp-min', 'distplot-exp-max']);
    });

    it('should return element ids ordered the same as elements returned by getElements', () => {
      const elementIds = distplotSortingElementsRetriever.getElementIds();
      const elements = distplotSortingElementsRetriever.getElements(measureExpressions, dimensionExpressions, settings);

      elementIds.forEach((id, index) => {
        expect(id).to.equal(elements[index].id);
      });
    });
  });

  describe('getElements', () => {
    it('should call translator.get with correct translation keys', () => {
      const measures = [measureName];
      const dimensions = [innerDimName, outerDimName];

      distplotSortingElementsRetriever.getElements(measures, dimensions, {});

      expect(translator.get.calledTwice).to.be.true;
      expect(translator.get.getCall(0).calledWithExactly('properties.distributionPlot.min')).to.be.true;
      expect(translator.get.getCall(1).calledWithExactly('properties.distributionPlot.max')).to.be.true;
    });

    it('should return correct elements', () => {
      const elements = distplotSortingElementsRetriever.getElements(measureExpressions, dimensionExpressions, settings);

      expect(elements).to.deep.equal([
        {
          id: 'distplot-exp-min',
          label: 'properties.distributionPlot.min_translated',
          exp: `Min( total <[${outerDimName}]> Aggr( ${measureName}, [${outerDimName}], [${innerDimName}] ), 0 )`,
          isDefault: false,
        },
        {
          id: 'distplot-exp-max',
          label: 'properties.distributionPlot.max_translated',
          exp: `Max( total <[${outerDimName}]> Aggr( ${measureName}, [${outerDimName}], [${innerDimName}] ), 1 )`,
          isDefault: true,
        },
      ]);
    });

    it('should return elements ordered the same as element ids returned by getElementIds', () => {
      const elements = distplotSortingElementsRetriever.getElements(measureExpressions, dimensionExpressions, settings);
      const elementIds = distplotSortingElementsRetriever.getElementIds();

      elements.forEach((element, index) => {
        expect(element.id).to.equal(elementIds[index]);
      });
    });
  });
});
