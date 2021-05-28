import util from '../../../js/lib/util';
import propertyResolver from '../../../assets/client/utils/property-resolver';
import propertyLogicModule from '../../../assets/client/utils/default-property-logic';
import translator from '../../../js/lib/translator';
import histogramUtils from './histogram-utils';
import propsLogic from './histogram-properties-logic';

const propertyLogic = propertyLogicModule.getLogicFor('hard', 'default');
const maxCountMode = 'maxCount';
const sizeMode = 'size';

function inAdvancedMode(data) {
  return !(data.bins && data.bins.auto);
}

function showBinCount(data) {
  return inAdvancedMode(data) && data.bins.binMode === maxCountMode;
}

const measureAxis = {
  uses: 'axis.picasso.measureAxis',
  items: {
    label: {
      type: 'string',
      expression: 'optional',
      expressionType: 'StringExpression',
      ref: 'measureAxis.label',
      defaultValue: '',
      translation: 'Common.Label',
      placeholderTranslation: 'Visualization.Histogram.MeasureAxisLabel',
    },
  },
};

const dimensionAxis = {
  uses: 'axis.picasso.dimensionAxis',
  items: {
    othersGroup: {
      items: {
        label: {
          show: false, // SUI-2470
        },
      },
    },
  },
};

const colors = {
  translation: 'properties.colors',
  type: 'items',
  items: {
    colors: {
      type: 'items',
      items: {
        barColor: {
          ref: 'color.bar.paletteColor',
          translation: 'properties.histogram.barColor',
          type: 'object',
          component: 'color-picker',
          dualOutput: true,
          defaultValue: propertyLogic.color.paletteColor.defaultValue,
        },
      },
    },
  },
};

const presentation = {
  type: 'items',
  translation: 'properties.presentation',
  items: {
    gridLines: {
      type: 'items',
      snapshot: {
        tid: 'property-gridLines',
      },
      items: {
        showGridLines: {
          ref: 'gridlines.auto',
          type: 'boolean',
          translation: 'properties.gridLine.spacing',
          component: 'switch',
          defaultValue: true,
          options: [
            {
              value: true,
              translation: 'Common.Auto',
            },
            {
              value: false,
              translation: 'Common.Custom',
            },
          ],
        },
        gridSpacing: {
          ref: 'gridlines.spacing',
          type: 'number',
          component: 'dropdown',
          defaultValue: 2,
          options: [
            {
              value: 0,
              translation: 'properties.gridLine.noLines',
            },
            {
              value: 2,
              translation: 'properties.gridLine.medium',
            },
            {
              value: 3,
              translation: 'properties.gridLine.narrow',
            },
          ],
          show(data) {
            return data.gridlines && !data.gridlines.auto;
          },
        },
      },
    },
    showLabels: {
      ref: 'dataPoint.showLabels',
      type: 'boolean',
      translation: 'properties.dataPoints.labelmode',
      component: 'switch',
      defaultValue: false,
      options: [
        {
          value: true,
          translation: 'Common.Auto',
        },
        {
          value: false,
          translation: 'properties.off',
        },
      ],
      snapshot: {
        tid: 'property-dataPoints',
      },
    },
  },
};

const settings = {
  uses: 'settings',
  items: {
    presentation,
    colors,
    measureAxis,
    dimensionAxis,
  },
};

const addons = {
  type: 'items',
  component: 'expandable-items',
  translation: 'properties.addons',
  items: {
    dataHandling: {
      uses: 'dataHandling',
      items: {
        calcCond: {
          uses: 'calcCond',
          change: propsLogic.onChangeCalcCond,
        },
      },
    },
    refLines: {
      uses: 'reflines',
      items: {
        colorBackground: {
          show: false,
        },
      },
    },
  },
};

const dimensions = {
  uses: 'dimensions',
  translation: 'Common.Fields',
  alternativeTranslation: 'properties.alternative.fields',
  items: {
    dimensionLimits: {
      show: false,
      items: {
        otherMode: {
          readOnly: false,
        },
        otherSortMode: {
          show(itemData /* , handler */) {
            return propertyResolver.getValue(itemData, 'qOtherTotalSpec.qOtherMode') === 'OTHER_COUNTED';
          },
        },
        otherCounted: {
          show(itemData /* , handler */) {
            return propertyResolver.getValue(itemData, 'qOtherTotalSpec.qOtherMode') === 'OTHER_COUNTED';
          },
        },
        otherLimitMode: {
          show(itemData /* , handler */) {
            const limitMode = propertyResolver.getValue(itemData, 'qOtherTotalSpec.qOtherMode');
            return limitMode === 'OTHER_ABS_LIMITED' || limitMode === 'OTHER_REL_LIMITED';
          },
        },
        otherLimit: {
          show(itemData /* , handler */) {
            const limitMode = propertyResolver.getValue(itemData, 'qOtherTotalSpec.qOtherMode');
            return limitMode === 'OTHER_ABS_LIMITED' || limitMode === 'OTHER_REL_LIMITED';
          },
        },
        calculatedAgainstMessage: {
          show: true,
          label() {
            const measureName = translator.get('properties.histogram.staticMeasureName');
            return translator.get('Properties.DimensionLimits.CalculatedAgainst', measureName);
          },
        },
      },
    },
    others: {
      show: false,
      items: {
        suppressOther: {
          defaultValue: true,
        },
      },
    },
  },
};

const measures = {
  uses: 'measures',
};

const innerData = {
  uses: 'data',
  // grouped: true,
  items: {
    dimensions,
    measures,
  },
};

const data = {
  translation: 'Common.Data',
  type: 'items',
  items: {
    innerData,
  },
};

const customBinMode = {
  ref: 'bins.binMode',
  type: 'string',
  component: 'dropdown',
  options: [
    {
      value: maxCountMode,
      translation: 'Visualization.Histogram.Binning.NumberOfBinsOption',
    },
    {
      value: sizeMode,
      translation: 'Visualization.Histogram.Binning.BarWidthOption',
    },
  ],
  defaultValue: maxCountMode,
  show(data) {
    return inAdvancedMode(data);
  },
};

const bins = {
  translation: 'Visualization.Histogram.Bins',
  type: 'items',
  component: 'items',
  items: {
    auto: {
      ref: 'bins.auto',
      translation: 'Visualization.Histogram.Binning',
      component: 'switch',
      type: 'boolean',
      defaultValue: true,
      undefinedValue: false,
      options: [
        {
          value: true,
          translation: 'Visualization.Histogram.Binning.Auto',
        },
        {
          value: false,
          translation: 'Visualization.Histogram.Binning.Custom',
        },
      ],
    },
    autoMessage: {
      component: 'text',
      translation: 'Visualization.Histogram.Binning.AutoDescription',
      show(data /* , handler, args */) {
        return !inAdvancedMode(data);
      },
    },

    mode: customBinMode,

    binCount: {
      ref: 'bins.binCount',
      type: 'number',
      expression: 'optional',
      expressionType: 'ValueExpression',
      translation: 'Visualization.Histogram.Binning.BinCount',
      defaultValue: '',
      convertFunctions: {
        get(getter, definition, args) {
          const binCount = args.properties.bins.binCount;

          if (histogramUtils.isEmpty(binCount)) {
            return histogramUtils.getDerivedBinCount(args.layout);
          }

          return getter(null) || '';
        },
        set(value, setter, definition) {
          setter(definition.type, value, undefined);
        },
      },
      show: showBinCount,
    },
    binMessage: {
      component: 'text',
      translation: 'Visualization.Histogram.Binning.BinCountRounding',
      show(data /* , handler, args */) {
        const binCount = propertyResolver.getValue(data, 'bins.binCount');
        const isExpression = typeof binCount === 'object';

        return (
          showBinCount(data) &&
          !histogramUtils.isEmpty(binCount) &&
          !isExpression &&
          !util.isInteger(binCount) &&
          binCount > 0
        );
      },
    },
    minBinMessage: {
      component: 'text',
      translation: 'Visualization.Histogram.Binning.BinCountMin',
      show(data) {
        const binCount = propertyResolver.getValue(data, 'bins.binCount');

        return !!(showBinCount(data) && !histogramUtils.isEmpty(binCount) && binCount <= 0);
      },
    },
    binSize: {
      ref: 'bins.binSize',
      type: 'number',
      expression: 'optional',
      expressionType: 'ValueExpression',
      defaultValue: 10,
      show(data) {
        return inAdvancedMode(data) && data.bins.binMode === sizeMode;
      },
      translation: 'Visualization.Histogram.Binning.BinSize',
    },

    offset: {
      ref: 'bins.offset',
      type: 'number',
      expression: 'optional',
      expressionType: 'ValueExpression',
      show(data) {
        return inAdvancedMode(data) && data.bins.binMode === sizeMode;
      },
      translation: 'Visualization.Histogram.Binning.Offset',
    },

    distinct: {
      ref: 'bins.countDistinct',
      type: 'boolean',
      defaultValue: false,
      component: 'checkbox',
      translation: 'Visualization.Histogram.CountDistinct',
    },
  },
};

export default {
  type: 'items',
  component: 'accordion',
  items: {
    data,
    bins,
    addons,
    settings,
  },
};
