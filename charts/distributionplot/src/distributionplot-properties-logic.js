import propertyResolver from '../../../assets/client/utils/property-resolver';
import AdvancedColorer from '../../../assets/objects/picasso/advanced-colorer';

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
  return propertyResolver.getValue(data, 'color.point.byDimDef.type') === 'libraryItem';
}

function isMeasureLibraryItem(data) {
  return propertyResolver.getValue(data, 'color.point.byMeasureDef.type') === 'libraryItem';
}

function isColorAuto(data) {
  return propertyResolver.getValue(data, 'color.point.auto') === true;
}

function isColorBySingle(data) {
  return !isColorAuto(data) && propertyResolver.getValue(data, 'color.point.mode', 'primary') === 'primary';
}

function isColorByDimension(data) {
  return !isColorAuto(data) && propertyResolver.getValue(data, 'color.point.mode') === 'byDimension';
}

function isColorByMeasure(data) {
  return !isColorAuto(data) && propertyResolver.getValue(data, 'color.point.mode') === 'byMeasure';
}

function isColorByExpression(data) {
  return !isColorAuto(data) && propertyResolver.getValue(data, 'color.point.mode') === 'byExpression';
}

// function getMeasureSchemeOptions( data ) {
// 	var ret = [];
// 	var ordinalScales = Theme.scales;
// 	var isReverse = function( data ) {
// 		// This must be a function since Angular creates a binding to it (otherwise won't update reverse)
// 		return propertyResolver.getValue( data, "color.point.reverseScheme" ) !== true;
// 	};

// 	ordinalScales.forEach( function ( scale ) {
// 		if ( !scale.disabled ) {
// 			var option = {
// 				component: 'color-scale',
// 				reverse: isReverse,
// 				translation: scale.translation || scale.name,
// 				value: scale.propertyValue
// 			};
// 			if ( scale.type === "class-pyramid" ) {
// 				option.colors = scale.scale[scale.scale.length - 1];
// 				option.type = "classes";
// 			} else {
// 				option.colors = scale.scale;
// 				option.type = "gradient";
// 			}

// 			ret.push( option );
// 		}
// 	}, this );

// 	return ret;
// }

function measuresHasBaseColors(handler) {
  return (
    propertyResolver.getValue(handler, 'layout.qHyperCube.qMeasureInfo', []).filter((info) => !!getBaseColor(info))
      .length > 0
  );
}

function dimensionsHasBaseColors(handler) {
  return (
    propertyResolver.getValue(handler, 'layout.qHyperCube.qDimensionInfo', []).filter((info) => !!getBaseColor(info))
      .length > 0
  );
}

function onGlobalChangeColors(data) {
  AdvancedColorer.updateColorDef(data, 'qHyperCubeDef.', data.color.point);
}

/**
 * Logic for showing/hiding legend section
 * @param {object} data
 */
function showLegend(data) {
  const mode = propertyResolver.getValue(data, 'color.point.mode', 'primary');
  return mode !== 'primary' && mode !== 'byExpression' && isColorAuto(data) === false;
}

function showColorByLabel(data) {
  // We only want to show if we are not coloring by a "library item" or Coloring by "n:th dimension"
  const isDimAndNotLibraryItem = isColorByDimension(data) && isDimensionLibraryItem(data) === false;

  const isMeasureAndNotLibraryItem = isColorByMeasure(data) && isMeasureLibraryItem(data) === false;
  const hasActiveDimensionIndex = propertyResolver.getValue(data, 'color.point.byDimDef.activeDimensionIndex') > -1;
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

export default {
  // getMeasureSchemeOptions: getMeasureSchemeOptions,
  // getBaseColor: getBaseColor,

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
};
