import sorterFactory from '@qlik/common/picasso/sorting/base-derived/sorter-factory';
import sorterFacade from '@qlik/common/picasso/sorting/base-derived/sorter-facade';
import HyperCubeDefGenerator from '@qlik/common/picasso/hypercube-def-generator/hypercube-def-generator';
import settingsRetriever from './distributionplot-sorting-settings-retriever';
import elementsRetriever from './distributionplot-sorting-elements-retriever';

function throwError(message) {
  throw new Error(`distributionplot-sorter.applySorting: ${message}`);
}

function validate(properties) {
  const qHyperCubeDef = properties.qHyperCubeDef;
  if (!qHyperCubeDef) {
    throwError("no 'qHyperCubeDef' in properties arg");
  } else if (!qHyperCubeDef.qDimensions) {
    throwError("no 'qHyperCubeDef.qDimensions' in properties arg");
  } else if (!qHyperCubeDef.qMeasures) {
    throwError("no 'qHyperCubeDef.qMeasures' in properties arg");
  } else if (!qHyperCubeDef.qDimensions.length || qHyperCubeDef.qDimensions.length < 2) {
    throwError("'qHyperCubeDef.qDimensions' has no outer dimension");
  }
}

function setSorting(properties, layout, expressions, translator) {
  if (!properties.qUndoExclude) {
    return;
  }

  if (!properties.sorting) {
    properties.sorting = { autoSort: true };
  }

  const dimensions = properties.qUndoExclude.qHyperCubeDef.qDimensions;

  if (dimensions.length >= 2) {
    properties.qUndoExclude.qHyperCubeDef.qInterColumnSortOrder = [0, 2, 1];
  } else {
    properties.qUndoExclude.qHyperCubeDef.qInterColumnSortOrder = [1, 0];
  }

  const getSettingsFn = function () {
    return settingsRetriever.getSettings(layout);
  };

  const getElementsFn = function () {
    const settings = getSettingsFn();

    return elementsRetriever.getElements(expressions.measures, expressions.dimensions, settings, translator);
  };

  const sorter = sorterFactory.create(getSettingsFn, getElementsFn);
  const outerDimension = dimensions[0];
  const chartSorting = properties.sorting;

  sorterFacade.applySorting(sorter, outerDimension, chartSorting);
}

function applySorting(properties, layout, app, exps, translator) {
  validate(properties);

  if (exps) {
    return setSorting(properties, layout, exps, translator);
  }

  return HyperCubeDefGenerator.getAllHyperCubeExpressions(properties.qHyperCubeDef, layout.qHyperCube, app).then(
    (expressions) => {
      setSorting(properties, layout, expressions, translator);
    }
  );
}

const distplotSorter = {
  applySorting,
};

export default distplotSorter;
