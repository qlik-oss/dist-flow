// import translator from '../../../../js/lib/translator';
import boxplotUtils from '../boxplot-utils';

//
// Implementation details
//
function getElementIds(properties) {
  const measures = properties.qUndoExclude.box.qHyperCubeDef.qMeasures;

  const elementIds = measures.map((measure) => measure.boxElement);

  return elementIds;
}

function getElements(properties, settings, translator) {
  const measures = properties.qUndoExclude.box.qHyperCubeDef.qMeasures;

  const elements = measures.map((measure) => {
    const translationKey = boxplotUtils.BOXELEMENTS[measure.boxElement].translationKey;

    const element = {
      id: measure.boxElement,
      label: translator.get(translationKey),
      exp: measure.qDef.qDef,
      isDefault: measure.boxElement === settings.ELEMENT,
    };

    return element;
  });

  return elements;
}

const boxplotSortingElementsRetriever = {
  getElementIds,
  getElements,
};

export default boxplotSortingElementsRetriever;
