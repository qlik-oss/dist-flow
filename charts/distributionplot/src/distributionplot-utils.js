import { getValue } from '@qlik/chart-modules';
import CONSTANTS from './distributionplot-constants';

function hasMultipleDimensions(container) {
  // var hasMultiple = container.qHyperCubeDef && container.qHyperCubeDef.qDimensions.length > 1;
  const hasMultiple =
    (container.qHyperCubeDef && container.qHyperCubeDef.qDimensions.length > 1) ||
    (container.qHyperCube && container.qHyperCube.qDimensionInfo && container.qHyperCube.qDimensionInfo.length > 1);
  return hasMultiple;
}

function getOuterDimensionCardinality(layout) {
  const qHyperCube = getValue(layout, CONSTANTS.HYPERCUBE_PATH);
  if (!hasMultipleDimensions(layout)) {
    return 1;
  }
  return qHyperCube && qHyperCube.qDimensionInfo[1].qCardinal;
}

function isAutoSort(properties) {
  return getValue(properties, CONSTANTS.AUTO_SORT, false);
}

function isSortByExpression(properties) {
  return getValue(properties, `${CONSTANTS.SORT_CRITERIA}.sortByExpression`, 0) !== 0;
}

function isSortByNumeric(properties) {
  return getValue(properties, `${CONSTANTS.SORT_CRITERIA}.sortByNumeric`, 0) !== 0;
}

function isSortByAscii(properties) {
  return getValue(properties, `${CONSTANTS.SORT_CRITERIA}.sortByAscii`, 0) !== 0;
}

const distplotUtils = {
  hasMultipleDimensions,
  getOuterDimensionCardinality,
  isAutoSort,
  isSortByExpression,
  isSortByNumeric,
  isSortByAscii,
};

export default distplotUtils;
