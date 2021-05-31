import sorterFactory from '@qlik/common/picasso/sorting/base-derived/sorter-factory';
import sorterFacade from '@qlik/common/picasso/sorting/base-derived/sorter-facade';
import settingsRetriever from './boxplot-sorting-settings-retriever';
import elementsRetriever from './boxplot-sorting-elements-retriever';

//
// Implementation details
//
function applySorting(properties, layout, translator) {
  const getSettingsFn = function () {
    return settingsRetriever.getSettings(layout);
  };

  const getElementsFn = function () {
    const settings = getSettingsFn();

    return elementsRetriever.getElements(properties, settings, translator);
  };

  const sorter = sorterFactory.create(getSettingsFn, getElementsFn);
  const outerDimension = properties.qUndoExclude.box.qHyperCubeDef.qDimensions[0];
  const chartSorting = properties.boxplotDef.sorting;

  sorterFacade.applySorting(sorter, outerDimension, chartSorting);
}

const boxplotSorter = {
  applySorting,
};

export default boxplotSorter;
