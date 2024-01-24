import { getValue, setValue } from 'qlik-chart-modules';
import attributeExpsUtil from '../extra/attribute-expression-util';
import LogicHelper from '../extra/property-logic-helper';
import NumberFormatUtil from '../extra/number-format-util';

// Hardcoded hack. Should be fixed when we have a better solution.
// This solves the problem with supporting base colors for old objects.
// This also fixes the conversion problem.

const baseNotSupported = ['scatterplot', 'map'];

const baseDimSupported = ['map'];

export default {
  baseColor: {
    isSupported(type) {
      return type && type.length && baseNotSupported.indexOf(type) === -1;
    },
    isDimSupported(type) {
      // Used for Auto coloring. Usually we limit coloring by dimension library color to visualizations with
      // one dimension but map is special case with 2 dimensions. However, only one is visible to the user.
      return type && type.length && baseDimSupported.indexOf(type) !== -1;
    },
  },
  colorBy: {},
  colorByUpdater(properties, path, markerSettings, srcPath) {
    this.updateColorDef(properties, srcPath, markerSettings);
    this.updateHypercubeAttributes(properties, path, markerSettings);
  },
  updateColorDef(properties, path, markerSettings) {
    const mode = getValue(markerSettings, 'mode');
    const auto = getValue(markerSettings, 'auto');
    const dimensions = getValue(properties, `${path}qDimensions`, []);
    const measures = getValue(properties, `${path}qMeasures`, []);
    let item;
    let dim;
    let attrDim;
    let colorByDefinition;

    if (!auto && mode === 'byDimension' && dimensions.length) {
      item = getValue(markerSettings, 'byDimDef');

      if (item) {
        setAltLabel(markerSettings, item.label);
      }

      if (item && item.activeDimensionIndex > -1) {
        item.activeDimensionIndex = Math.min(item.activeDimensionIndex, dimensions.length - 1); // Set to last active dimension index if index if out of bounds
        dim = dimensions[item.activeDimensionIndex];
        colorByDefinition = LogicHelper.getColorByDefinition('dimension', false, dim);
        colorByDefinition.activeDimensionIndex = item.activeDimensionIndex;
        setColorByPropertyDef(markerSettings, colorByDefinition);
      } else if (!item || !item.key) {
        dim = dimensions[dimensions.length - 1];

        attrDim = attributeExpsUtil.getById(dim.qAttributeDimensions, attributeExpsUtil.IDMAP.COLOR_BY_ALTERNATIVE);
        setColorByPropertyDef(markerSettings, LogicHelper.getColorByDefinition('dimension', !!attrDim, attrDim || dim));
      }
    } else if (!auto && mode === 'byMeasure' && dimensions.length) {
      throw new Error('not suported in any 444-chart');
    } else if (mode === 'byMultiple' && measures.length < 2) {
      setValue(markerSettings, 'mode', 'primary');
    }
  },
  updateHypercubeAttributes(properties, path, markerSettings) {
    const mode = getValue(markerSettings, 'mode');
    const auto = getValue(markerSettings, 'auto');
    const dimensions = getValue(properties, `${path}qDimensions`, []);
    const measures = getValue(properties, `${path}qMeasures`, []);
    const exclDimensions = getValue(properties, `${path}qLayoutExclude.qHyperCubeDef.qDimensions`, []);

    if (!auto && mode === 'byDimension' && dimensions.length) {
      // Clear old qAttributeDimension/qAttributeExpression and add a qAttributeDimension for the current dimension
      resolveColorByPropertyDef(
        markerSettings,
        true,
        dimensions,
        exclDimensions,
        measures,
        getValue(markerSettings, 'byDimDef.label')
      );
    } else if (!auto && mode === 'byMeasure' && dimensions.length) {
      // Clear old qAttributeDimension/qAttributeExpression and add a qAttributeExpression for the current measure
      resolveColorByPropertyDef(
        markerSettings,
        false,
        dimensions,
        exclDimensions,
        measures,
        getValue(markerSettings, 'byMeasureDef.label')
      );
    } else {
      // Remove color by properties
      clearColorByItem(dimensions, exclDimensions);
    }
  },
  setColorByPropertyDef,
  resolveColorByPropertyDef,
  clearColorByItem,
};

function clearColorByItem(dimensions, exclDimensions) {
  dimensions.forEach((dim) => {
    cleanAttributeByType(dim, attributeExpsUtil.IDMAP.COLOR_BY_ALTERNATIVE, 'qAttributeDimensions');
    cleanAttributeByType(dim, attributeExpsUtil.IDMAP.COLOR_BY_ALTERNATIVE, 'qAttributeExpressions');
  });
  exclDimensions.forEach((dim) => {
    cleanAttributeByType(dim, attributeExpsUtil.IDMAP.COLOR_BY_ALTERNATIVE, 'qAttributeDimensions');
    cleanAttributeByType(dim, attributeExpsUtil.IDMAP.COLOR_BY_ALTERNATIVE, 'qAttributeExpressions');
  });
}

function cleanAttributeByType(target, type, attribute) {
  if (target[attribute]) {
    const index = attributeExpsUtil.getIndexById(target[attribute], type);
    if (index >= 0) {
      target[attribute].splice(index, 1);
    }
  } else {
    target[attribute] = []; // eslint-disable-line no-param-reassign
  }
}

function wrapFieldName(name) {
  return name.split(' ').length > 1 && name[0] !== '=' && name[0] !== '[' ? `[${name}]` : name;
}

function setColorByPropertyDef(properties, item, expression, keepMode) {
  const itemType = expression ? 'expression' : item.type;
  let mode = properties.mode;
  const label = item.label || item.name || '';

  setAltLabel(properties, label);

  switch (itemType) {
    case 'field':
      mode = 'byDimension';
      properties.byDimDef = {
        label: item.label || wrapFieldName(item.name),
        key: wrapFieldName(item.name),
        type: 'expression',
        activeDimensionIndex: item.activeDimensionIndex,
      }; // eslint-disable-line no-param-reassign
      break;
    case 'expression':
      mode = 'byMeasure';
      properties.byMeasureDef = {
        label: expression || item.label || item.name,
        key: expression || item.name,
        type: 'expression',
      }; // eslint-disable-line no-param-reassign
      break;
    case 'dimension':
      mode = 'byDimension';
      properties.byDimDef = {
        label: item.name,
        key: item.id,
        type: 'libraryItem',
        activeDimensionIndex: item.activeDimensionIndex,
      }; // eslint-disable-line no-param-reassign
      break;
    case 'measure':
      mode = 'byMeasure';
      properties.byMeasureDef = { label: item.name, key: item.id, type: 'libraryItem' };
      if (properties.formatting) {
        NumberFormatUtil.useMasterNumberFormat(properties.formatting);
      }
      break;
    default:
      break;
  }
  if (!keepMode) {
    properties.auto = false; // eslint-disable-line no-param-reassign
    properties.mode = mode; // eslint-disable-line no-param-reassign
  }
}

function resolveColorByPropertyDef(properties, isDim, dimensions, exclDimensions, measures, customLabel) {
  clearColorByItem(dimensions, exclDimensions);
  const dim = dimensions[dimensions.length - 1];
  if (dim) {
    const item = isDim ? getValue(properties, 'byDimDef') : getValue(properties, 'byMeasureDef');
    const qNumFormat = getValue(properties, 'formatting.qNumFormat');
    const isCustomFormatted = getValue(properties, 'formatting.isCustomFormatted');

    if (item) {
      const attribExps = attributeExpsUtil.create(attributeExpsUtil.IDMAP.COLOR_BY_ALTERNATIVE);
      switch (item.type) {
        case 'expression':
          attribExps.label = customLabel || item.label;
          if (isDim) {
            attribExps.qDef = item.key;
          } else {
            attribExps.qExpression = item.key;
            if (qNumFormat) {
              attribExps.qNumFormat = qNumFormat;
              attribExps.isCustomFormatted = isCustomFormatted;
            }
          }

          if (attribExps.label && attribExps.label.charAt(0) === '=') {
            attribExps.labelExpRef = 'color.altLabel';
          }
          break;
        case 'libraryItem':
          if (!isDim) {
            // Figure out if we are using a library item that matches one in data
            let inIndex = -1;
            measures.forEach((mea, index) => {
              if (item.key === mea.qLibraryId) {
                inIndex = index;
              }
            });
            attribExps.matchMeasure = inIndex;
            if (qNumFormat) {
              attribExps.qNumFormat = qNumFormat;
              attribExps.isCustomFormatted = isCustomFormatted;
            }
          }
          attribExps.qLibraryId = item.key;
          attribExps.colorMapRef = item.key;
          break;
        default:
          break;
      }
      if (isDim) {
        attribExps.qSortBy = { qSortByAscii: 1 };
        dim.qAttributeDimensions.push(attribExps);
      } else {
        dim.qAttributeExpressions.push(attribExps);
      }
    }
  }
}

function setAltLabel(properties, label) {
  if (!label) {
    return;
  }

  const isExpression = label.charAt(0) === '=';

  properties.altLabel = isExpression ? { qStringExpression: { qExpr: label.substr(1) } } : label;
}
