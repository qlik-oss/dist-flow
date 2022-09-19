// import propertyResolver from '../../../assets/client/utils/property-resolver';
import { getValue } from 'qlik-chart-modules';
import AdvancedColorer from '@qlik/common/picasso/advanced-colorer';

// Privates

function getBaseColor(info) {
  if (!info) {
    return false;
  }
  if (info.coloring && info.coloring.baseColor && info.coloring.baseColor.color) {
    return info.coloring.baseColor;
  }
  if (info.baseColor && info.baseColor.color) {
    return info.baseColor;
  }
  return false;
}

// Public

function isDimensionLibraryItem(data) {
  return getValue(data, 'color.point.byDimDef.type') === 'libraryItem';
}

function isMeasureLibraryItem(data) {
  return getValue(data, 'color.point.byMeasureDef.type') === 'libraryItem';
}

function isColorAuto(data) {
  return getValue(data, 'color.point.auto') === true;
}

function isColorBySingle(data) {
  return !isColorAuto(data) && getValue(data, 'color.point.mode', 'primary') === 'primary';
}

function isColorByDimension(data) {
  return !isColorAuto(data) && getValue(data, 'color.point.mode') === 'byDimension';
}

function isColorByMeasure(data) {
  return !isColorAuto(data) && getValue(data, 'color.point.mode') === 'byMeasure';
}

function isColorByExpression(data) {
  return !isColorAuto(data) && getValue(data, 'color.point.mode') === 'byExpression';
}

function measuresHasBaseColors(handler) {
  return getValue(handler, 'layout.qHyperCube.qMeasureInfo', []).filter((info) => !!getBaseColor(info)).length > 0;
}

function dimensionsHasBaseColors(handler) {
  return getValue(handler, 'layout.qHyperCube.qDimensionInfo', []).filter((info) => !!getBaseColor(info)).length > 0;
}

function onGlobalChangeColors(data) {
  AdvancedColorer.updateColorDef(data, 'qHyperCubeDef.', data.color.point);
}

/**
 * Logic for showing/hiding legend section
 * @param {object} data
 */
function showLegend(data) {
  const mode = getValue(data, 'color.point.mode', 'primary');
  return mode !== 'primary' && mode !== 'byExpression' && isColorAuto(data) === false;
}

function showColorByLabel(data) {
  // We only want to show if we are not coloring by a "library item" or Coloring by "n:th dimension"
  const isDimAndNotLibraryItem = isColorByDimension(data) && isDimensionLibraryItem(data) === false;

  const isMeasureAndNotLibraryItem = isColorByMeasure(data) && isMeasureLibraryItem(data) === false;
  const hasActiveDimensionIndex = getValue(data, 'color.point.byDimDef.activeDimensionIndex') > -1;
  return (isDimAndNotLibraryItem && !hasActiveDimensionIndex) || isMeasureAndNotLibraryItem;
}

function onChangeCalcCond(data) {
  const baseCube = data?.qHyperCubeDef;
  const generatedCube = data?.qUndoExclude?.qHyperCubeDef;
  if (baseCube && generatedCube) {
    generatedCube.qCalcCond = baseCube.qCalcCond;
    generatedCube.qCalcCondition = baseCube.qCalcCondition;
  }
}

function hasDimValueColors(handler, activeDimId) {
  return handler.layout.qHyperCube.qDimensionInfo[activeDimId]?.coloring?.hasValueColors ?? true;
}

export default {
  measuresHasBaseColors,
  dimensionsHasBaseColors,
  onGlobalChangeColors,
  onChangeCalcCond,

  isColorByDimension,
  isColorByMeasure,
  isColorAuto,
  isColorByExpression,
  isColorBySingle,
  isDimensionLibraryItem,
  isMeasureLibraryItem,
  showLegend,
  showColorByLabel,
  hasDimValueColors,
};
