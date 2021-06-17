import { getValue } from 'qlik-chart-modules';

function hasSecondDimension(layout, rootPath) {
  rootPath = rootPath ? `${rootPath}.` : '';
  return getValue(layout, `${rootPath}qHyperCube.qDimensionInfo.length`) > 1;
}

function hasSecondMeasure(layout, rootPath) {
  rootPath = rootPath ? `${rootPath}.` : '';
  return getValue(layout, `${rootPath}qHyperCube.qMeasureInfo.length`) > 1;
}

function getOuterDimensionSizeOfMax2Dims(layout, rootPath) {
  if (!hasSecondDimension(layout, rootPath)) {
    return 1;
  }
  return getStackedCubeSizeOf2Dims(layout, rootPath);
}

function getStackedCubeSizeOf1Dim(layout, rootPath) {
  rootPath = rootPath ? `${rootPath}.` : '';
  return getValue(layout, `${rootPath}qHyperCube.qSize.qcy`);
}

function getStackedCubeSizeOf2Dims(layout, rootPath) {
  rootPath = rootPath ? `${rootPath}.` : '';
  if (getValue(layout, `${rootPath}qHyperCube.qStackedDataPages.0.qData.length`)) {
    return (
      getValue(layout, `${rootPath}qHyperCube.qStackedDataPages.0.qData.0.qSubNodes.length`, 0) +
      getValue(layout, `${rootPath}qHyperCube.qStackedDataPages.0.qData.0.qDown`, 0) +
      getValue(layout, `${rootPath}qHyperCube.qStackedDataPages.0.qData.0.qUp`, 0)
    );
  }
  const index = getValue(layout, `${rootPath}qHyperCube.qEffectiveInterColumnSortOrder.0`);
  const dimInfo = getValue(layout, `${rootPath}qHyperCube.qDimensionInfo.${index}`);

  // Use the larger of the two possible values (depending on if the outer dimension contains any null value)
  // can cause some extra cache misses in the hypercube cache, but solves SUI-2065
  return getDimensionSize(dimInfo);
}

function getStackedCubeSizeOfMax2Dims(layout, rootPath) {
  if (!hasSecondDimension(layout, rootPath)) {
    return getStackedCubeSizeOf1Dim(layout, rootPath);
  }
  return getStackedCubeSizeOf2Dims(layout, rootPath);
}

function getHyperCube(layout, path) {
  if (!layout) {
    return null;
  }
  layout = path ? getValue(layout, path) : layout;
  return layout && layout.qHyperCube ? layout.qHyperCube : null;
}

function getDimensionSize(dimInfo) {
  return dimInfo.qCardinalities.qHypercubeCardinal;
}

export default {
  getHyperCube,
  hasSecondDimension,
  hasSecondMeasure,
  getStackedCubeSizeOf2Dims,
  getStackedCubeSizeOfMax2Dims,
  getOuterDimensionSizeOfMax2Dims,
  getDimensionSize,
};
