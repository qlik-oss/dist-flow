// 
import chai from 'chai';
import sinon from 'sinon';
import boxplotSortingElementsRetriever from '../boxplot-sorting-elements-retriever';
import boxplotUtils from '../../boxplot-utils';
import translator from '../../../../../js/lib/translator';

const expect = chai.expect;
let sandbox;

describe('boxplot-sorting-elements-retriever', () => {
  let properties;
  let settings;
  const oldBoxElements = boxplotUtils.BOXELEMENTS;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    boxplotUtils.BOXELEMENTS = {
      boxMiddle: {
        translationKey: 'boxMiddleTranslationKey',
      },
      firstWhisker: {
        translationKey: 'firstWhiskerTranslationKey',
      },
      lastWhisker: {
        translationKey: 'lastWhiskerTranslationKey',
      },
    };

    sandbox.stub(translator, 'get').callsFake((translationKey) => `${translationKey}_translated`);

    properties = {
      qUndoExclude: {
        box: {
          qHyperCubeDef: {
            qMeasures: [
              {
                boxElement: 'boxMiddle',
                qDef: {
                  qDef: 'Avg(1)',
                },
              },
              {
                boxElement: 'firstWhisker',
                qDef: {
                  qDef: 'Min(2)',
                },
              },
              {
                boxElement: 'lastWhisker',
                qDef: {
                  qDef: 'Max(3)',
                },
              },
            ],
          },
        },
      },
    };

    settings = {
      ELEMENT: 'boxMiddle',
    };
  });

  afterEach(() => {
    sandbox.restore();
    boxplotUtils.BOXELEMENTS = oldBoxElements;
  });

  it('should expose the correct api', () => {
    expect(Object.keys(boxplotSortingElementsRetriever).length).to.equal(2);
    expect(boxplotSortingElementsRetriever).to.have.keys(['getElementIds', 'getElements']);
  });

  describe('getElementIds', () => {
    it('should return correct element ids', () => {
      const elementIds = boxplotSortingElementsRetriever.getElementIds(properties);

      expect(elementIds).to.deep.equal(['boxMiddle', 'firstWhisker', 'lastWhisker']);
    });

    it('should return element ids ordered the same as elements returned by getElements', () => {
      const elementIds = boxplotSortingElementsRetriever.getElementIds(properties);
      const elements = boxplotSortingElementsRetriever.getElements(properties, settings);

      elementIds.forEach((id, index) => {
        expect(id).to.equal(elements[index].id);
      });
    });
  });

  describe('getElements', () => {
    it('should call translator.get with correct translation keys', () => {
      boxplotSortingElementsRetriever.getElements(properties, settings);

      expect(translator.get.calledThrice).to.be.true;
      expect(translator.get.getCall(0).calledWithExactly('boxMiddleTranslationKey')).to.be.true;
      expect(translator.get.getCall(1).calledWithExactly('firstWhiskerTranslationKey')).to.be.true;
      expect(translator.get.getCall(2).calledWithExactly('lastWhiskerTranslationKey')).to.be.true;
    });

    it('should return correct elements', () => {
      const elements = boxplotSortingElementsRetriever.getElements(properties, settings);

      expect(elements).to.deep.equal([
        {
          id: 'boxMiddle',
          label: 'boxMiddleTranslationKey_translated',
          exp: 'Avg(1)',
          isDefault: true,
        },
        {
          id: 'firstWhisker',
          label: 'firstWhiskerTranslationKey_translated',
          exp: 'Min(2)',
          isDefault: false,
        },
        {
          id: 'lastWhisker',
          label: 'lastWhiskerTranslationKey_translated',
          exp: 'Max(3)',
          isDefault: false,
        },
      ]);
    });

    it('should return elements ordered the same as element ids returned by getElementIds', () => {
      const elements = boxplotSortingElementsRetriever.getElements(properties, settings);
      const elementIds = boxplotSortingElementsRetriever.getElementIds(properties);

      elements.forEach((element, index) => {
        expect(element.id).to.equal(elementIds[index]);
      });
    });
  });
});
