import { setValue, getValue, fontResolver as createFontResolver } from 'qlik-chart-modules';
import sortOrderBuilder from '@qlik/common/extra/sort-order/sort-order';
import ChartStyleComponent, { getChartFontResolver } from '@qlik/common/extra/chart-style-component';
import settingsRetriever from './sorting/boxplot-sorting-settings-retriever';
import elementsRetriever from './sorting/boxplot-sorting-elements-retriever';
import boxplotUtils from './boxplot-utils';
import propsLogic from './boxplot-properties-logic';
import boxplotSorter from './sorting/boxplot-sorter';
import ObjectUtils from './object-utils/object-utils';
import getStylingPanelDefinition from './styling-panel-definition';

const chartID = 'object.boxPlot';

const SORTING_REFS = {
  AUTO_SORT: 'boxplotDef.sorting.autoSort',
  SORT_CRITERIA: 'boxplotDef.sorting.sortCriteria',
  ELEMENT_ID: 'boxplotDef.sorting.elementId',
  EXPRESSION: 'boxplotDef.sorting.expression',
};

export default function propertyDefinition(env) {
  const { flags, translator } = env;
  const theme = env.anything.sense.theme;

  const stylingPanelEnabled = flags.isEnabled('SENSECLIENT_IM_2019_STYLINGPANEL_BOXPLOT');
  const bkgOptionsEnabled = flags.isEnabled('SENSECLIENT_IM_2019_BOXPLOT_BG');

  const lookupColorInPalette = (color) => {
    const palette = theme.getDataColorPickerPalettes()[0].colors;
    const index = palette.indexOf(color);
    return { color, index };
  };

  const boxColor = {
    ref: 'boxplotDef.color.box.paletteColor',
    translation: 'properties.boxplot.boxColor',
    type: 'object',
    component: 'color-picker',
    dualOutput: true,
    show(data) {
      return (
        !getValue(data, 'boxplotDef.color.auto', true) &&
        getValue(data, 'boxplotDef.color.mode', 'primary') === 'primary'
      );
    },
    defaultValue() {
      const color = theme.getStyle(chartID, 'box.box', 'fill');
      return lookupColorInPalette(color);
    },
  };

  const outlierColor = {
    ref: 'boxplotDef.color.point.paletteColor',
    translation: 'properties.boxplot.outlierColor',
    type: 'object',
    component: 'color-picker',
    dualOutput: true,
    show(data) {
      return (
        !getValue(data, 'boxplotDef.color.auto', true) &&
        getValue(data, 'boxplotDef.color.mode', 'primary') === 'primary'
      );
    },
    defaultValue() {
      const color = theme.getDataColorSpecials().primary;
      return lookupColorInPalette(color);
    },
  };

  const colorModeOptions = (data) => {
    const options = [
      {
        value: 'primary',
        translation: 'properties.colorMode.primary',
      },
    ];
    if (getValue(data, 'boxplotDef.color.mode') === 'byExpression') {
      options.push({
        value: 'byExpression',
        translation: 'properties.colorMode.byExpression',
      });
    }
    return options;
  };

  const simpleColors = {
    classification: {
      section: 'color',
      tags: ['simple'],
      exclusive: true,
    },
    type: 'items',
    items: {
      simpleItems: {
        items: {
          autoColor: {
            ref: 'boxplotDef.color.auto',
            type: 'boolean',
            forceLabel: true,
            label: (data) => {
              if (getValue(data, 'boxplotDef.color.auto'))
                return translator.get('Simple.Color.Auto', translator.get('properties.colorMode.primary'));
              return translator.get('Common.Custom');
            },
            change: (data) => {
              if (!getValue(data, 'boxplotDef.color.auto')) {
                setValue(data, 'boxplotDef.color.mode', 'primary');
              }
            },
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
          colorMode: {
            ref: 'boxplotDef.color.mode',
            type: 'string',
            component: 'dropdown',
            options: colorModeOptions,
            defaultValue: 'primary',
            show(data) {
              return !getValue(data, 'boxplotDef.color.auto', true);
            },
          },
          boxColor,
          outlierColor,
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
          autoColor: {
            ref: 'boxplotDef.color.auto',
            type: 'boolean',
            translation: 'properties.colors',
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
          colorMode: {
            ref: 'boxplotDef.color.mode',
            type: 'string',
            component: 'dropdown',
            options() {
              return [
                {
                  value: 'primary',
                  translation: 'properties.colorMode.primary',
                },
                {
                  value: 'byExpression',
                  translation: 'properties.colorMode.byExpression',
                },
              ];
            },
            defaultValue: 'primary',
            show(data) {
              return !getValue(data, 'boxplotDef.color.auto', true);
            },
          },
          boxColor,
          outlierColor,
          attributeExpression: {
            type: 'string',
            component: 'expression',
            expressionType: 'measure',
            schemaIgnore: true,
            ref: 'boxplotDef.color.expression.qValueExpression.qExpr',
            translation: 'Common.Expression',
            show(data) {
              return (
                !getValue(data, 'boxplotDef.color.auto', true) &&
                getValue(data, 'boxplotDef.color.mode') === 'byExpression'
              );
            },
          },
          expressionIsColor: {
            ref: 'boxplotDef.color.expressionIsColor',
            translation: 'properties.expressionIsColor',
            type: 'boolean',
            defaultValue: true,
            show: false,
          },
        },
      },
      simpleColors,
    },
  };

  const general = {
    items: {
      showDisclaimer: {
        translation: 'properties.showDisclaimer',
        type: 'boolean',
        ref: 'showDisclaimer',
        component: 'switch',
        show() {
          return flags.isEnabled('SHOW_DISCLAIMER');
        },
        defaultValue: true,
        options: [
          {
            value: true,
            translation: 'Common.Show',
          },
          {
            value: false,
            translation: 'properties.hide',
          },
        ],
      },
    },
  };
  const fontResolver = getChartFontResolver(theme, translator, chartID, createFontResolver, flags);
  const styleOptions = ChartStyleComponent(fontResolver, theme, chartID);
  const presentation = {
    type: 'items',
    translation: 'properties.presentation',
    items: {
      stylingPanel: stylingPanelEnabled && getStylingPanelDefinition(bkgOptionsEnabled, styleOptions),
      orientation: {
        ref: 'orientation',
        type: 'string',
        component: 'item-selection-list',
        defaultValue: 'vertical',
        horizontal: true,
        items: [
          {
            component: 'icon-item',
            icon: 'direction_up_down',
            labelPlacement: 'bottom',
            translation: 'properties.orientation.vertical',
            value: 'vertical',
          },
          {
            icon: 'direction_left_right',
            component: 'icon-item',
            labelPlacement: 'bottom',
            translation: 'Common.Horizontal',
            value: 'horizontal',
          },
        ],
      },
      showWhiskers: {
        ref: 'boxplotDef.presentation.whiskers.show',
        translation: 'properties.boxplot.showWhiskers',
        type: 'boolean',
        defaultValue: true,
      },
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
              // Gridlines "wide" option can be implemented when Picasso supports displaying a
              // gridline every other tick: http://rd-picasso.rdlund.qliktech.com/picasso/master/docs/dist/components/grid-line.html
              // {
              // 	value: 1,
              // 	translation: "properties.gridLine.wide"
              // },
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
    },
  };

  const measureAxis = {
    uses: 'axis.picasso.measureAxis',
    items: {
      startAt: {
        type: 'string',
        component: 'dropdown',
        translation: 'properties.axis.startAt',
        readOnly: (data) =>
          !data.measureAxis.autoMinMax && !(data.measureAxis.minMax === 'min' && data.measureAxis.min === 0),
        options: [
          {
            value: 'zero',
            translation: 'properties.axis.startAt.zero',
          },
          {
            value: 'lowest',
            translation: 'properties.axis.startAt.lowest',
          },
        ],
        defaultValue: 'lowest',
        convertFunctions: {
          get(getter, definition, args, data) {
            const { autoMinMax, minMax, min } = data?.measureAxis || {};
            if (autoMinMax === true) {
              return 'lowest';
            }
            if (!autoMinMax && minMax === 'min' && min === 0) {
              return 'zero';
            }
            return getter(definition.type);
          },
          set(value, setter, definition, args, data) {
            if (value === 'zero') {
              setValue(data, 'measureAxis.autoMinMax', false);
              setValue(data, 'measureAxis.minMax', 'min');
              setValue(data, 'measureAxis.min', 0);
            } else {
              setValue(data, 'measureAxis.autoMinMax', true);
            }
          },
        },
        classification: {
          section: 'axis',
          tags: ['simple'],
          exclusive: true,
        },
      },
    },
  };

  const dimensionAxis = {
    uses: 'axis.picasso.dimensionAxis',
    show(properties, handler, args) {
      const hasSecondDimension = getValue(args.layout, 'boxplotDef.qHyperCube.qDimensionInfo.length') > 1;
      return hasSecondDimension;
    },
    items: {
      dimensionAxisTitle: {
        component: 'header',
        type: 'string',
        show(properties, handler, args) {
          return getValue(args.layout, 'boxplotDef.qHyperCube.qDimensionInfo.length') > 1;
        },
        classification: {
          section: 'axis',
          tags: ['simple'],
          exclusive: true,
        },
      },
      othersGroup: {
        items: {
          label: {
            show(properties, handler, args) {
              return (
                getValue(args.layout, 'boxplotDef.qHyperCube.qDimensionInfo.length') > 1 &&
                getValue(args.layout, 'orientation') !== 'horizontal'
              );
            },
            options: flags.isEnabled('SENSECLIENT_LAYERED_LABELS')
              ? [
                  {
                    value: 'auto',
                    translation: 'Common.Auto',
                  },
                  {
                    value: 'horizontal',
                    translation: 'Common.Horizontal',
                  },
                  {
                    value: 'tilted',
                    translation: 'properties.labels.tilted',
                  },
                  {
                    value: 'layered',
                    translation: 'properties.labels.layered',
                  },
                ]
              : undefined,
          },
          dock: {
            show(properties, handler, args) {
              return getValue(args.layout, 'boxplotDef.qHyperCube.qDimensionInfo.length') > 1;
            },
          },
        },
      },
    },
  };

  const simpleLabels = {
    items: {
      labels: {
        items: {
          header: {
            show(props) {
              return (
                props.boxplotDef?.qHyperCubeDef?.qDimensions?.length &&
                props.boxplotDef?.qHyperCubeDef?.qMeasures?.length
              );
            },
          },
          dimensionTitle: {
            component: 'checkbox',
            ref: 'dimensionAxis.show',
            type: 'string',
            translation: 'Simple.Label.Dimension.Hide',
            defaultValue: 'all',
            show(props) {
              return (
                props.boxplotDef?.qHyperCubeDef?.qDimensions?.length > 1 &&
                props.boxplotDef?.qHyperCubeDef?.qMeasures?.length
              );
            },
            convertFunctions: {
              get(getter, def, args, data) {
                return data.dimensionAxis.show === 'labels' || data.dimensionAxis.show === 'none';
              },
              set(value, setter, def, args, data) {
                data.dimensionAxis.show = value ? 'labels' : 'all';
              },
            },
          },
          measureTitle: {
            component: 'checkbox',
            ref: 'measureAxis.show',
            type: 'string',
            translation: 'Simple.Label.Measure.Hide',
            defaultValue: 'all',
            show(props) {
              return (
                props.boxplotDef?.qHyperCubeDef?.qDimensions?.length &&
                props.boxplotDef?.qHyperCubeDef?.qMeasures?.length
              );
            },
            convertFunctions: {
              get(getter, def, args, data) {
                return data.measureAxis.show === 'labels' || data.measureAxis.show === 'none';
              },
              set(value, setter, def, args, data) {
                data.measureAxis.show = value ? 'labels' : 'all';
              },
            },
          },
        },
      },
    },
  };

  const settings = {
    uses: 'settings',
    items: {
      simpleLabels,
      general,
      presentation,
      colors,
      measureAxis,
      dimensionAxis,
    },
  };

  const defaultExpressionItem = sortOrderBuilder.expression(`${SORTING_REFS.SORT_CRITERIA}.sortByExpression`);
  const expressionItem = {
    type: 'items',
    items: {
      toggled: defaultExpressionItem.items.toggled,
      sortByElement: {
        component: 'sort-by-element',
        expressionRef: SORTING_REFS.EXPRESSION,
        elementRef: SORTING_REFS.ELEMENT_ID,
        show(properties) {
          return getValue(properties, `${SORTING_REFS.SORT_CRITERIA}.sortByExpression`, 0) !== 0;
        },
        elements(args) {
          if (!args.properties.qUndoExclude || !args.properties.qUndoExclude.hashCode) {
            return Promise.reject();
          }

          const settings = settingsRetriever.getSettings(args.layout);
          const elements = elementsRetriever.getElements(args.properties, settings, translator);

          return Promise.resolve(elements);
        },
      },
      order: defaultExpressionItem.items.order,
    },
  };

  //
  // Privates
  //
  function hasMultipleDimensions(properties) {
    let hasMultiple = properties.boxplotDef.qHyperCubeDef && properties.boxplotDef.qHyperCubeDef.qDimensions.length > 1;

    if (typeof hasMultiple === 'undefined') {
      hasMultiple = false;
    }

    return hasMultiple;
  }

  const sorting = {
    type: 'items',
    translation: 'properties.sorting',
    sortIndexRef: 'boxplotDef.qHyperCubeDef.qInterColumnSortOrder',
    allowMove: true,
    schemaIgnore: true,
    grouped: false,
    items: {
      autoSort: {
        ref: SORTING_REFS.AUTO_SORT,
        type: 'boolean',
        translation: 'properties.sorting',
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
        show: hasMultipleDimensions,
        change(data, handler) {
          boxplotSorter.applySorting(data, handler.layout, translator);
        },
        classification: {
          section: 'sorting',
          tags: ['simple'],
        },
        reset(data) {
          data.boxplotDef.sorting = { autoSort: true };
        },
      },
      simpleSorting: {
        component: 'sorting-with-elements',
        expressionRef: SORTING_REFS.EXPRESSION,
        elementRef: SORTING_REFS.ELEMENT_ID,
        sortCriteriasRef: SORTING_REFS.SORT_CRITERIA,
        elements(args) {
          if (!args.handler.properties.qUndoExclude || !args.handler.properties.qUndoExclude.hashCode) {
            return Promise.reject();
          }

          const settings = settingsRetriever.getSettings(args.handler.layout);
          const elements = elementsRetriever.getElements(args.handler.properties, settings, translator);

          return Promise.resolve(elements);
        },
        show(properties) {
          return hasMultipleDimensions(properties) && !getValue(properties, SORTING_REFS.AUTO_SORT);
        },
        classification: {
          section: 'sorting',
          tags: ['simple'],
          exclusive: true,
        },
      },
      sortingItems: {
        component: 'items',
        grouped: true,
        items: {
          expression: expressionItem,
          numeric: sortOrderBuilder.numeric(`${SORTING_REFS.SORT_CRITERIA}.sortByNumeric`),
          ascii: sortOrderBuilder.ascii(`${SORTING_REFS.SORT_CRITERIA}.sortByAscii`),
          defaultSortMessage: {
            component: 'text',
            translation: 'properties.sorting.defaultSortingMessage',
            show(properties) {
              return (
                getValue(properties, `${SORTING_REFS.SORT_CRITERIA}.sortByExpression`, 0) === 0 &&
                getValue(properties, `${SORTING_REFS.SORT_CRITERIA}.sortByNumeric`, 0) === 0 &&
                getValue(properties, `${SORTING_REFS.SORT_CRITERIA}.sortByAscii`, 0) === 0
              );
            },
          },
        },
        show(properties) {
          return hasMultipleDimensions(properties) && !getValue(properties, SORTING_REFS.AUTO_SORT);
        },
      },
      noData: {
        component: 'text',
        translation: 'Common.NoData',
        style: 'hint',
        show(properties) {
          return !hasMultipleDimensions(properties);
        },
        classification: {
          section: 'sorting',
          tags: ['simple'],
        },
      },
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
          suppressZero: {
            ref: 'boxplotDef.qHyperCubeDef.qSuppressZero',
            show: false,
          },
          calcCond: {
            uses: 'calcCond',
            ref: 'boxplotDef.qHyperCubeDef',
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

  /**
   * Return default expression (as defined on the hypercube) for given element.
   *
   * @param {Object} measures qUndoExclude.box.qHyperCubeDef.qMeasures
   * @param {string} elementName e.g. firstWhisker, boxStart, ...
   */
  function getDefaultExpression(measures, elementName) {
    const measure = measures.filter((measure) => measure.boxElement === elementName)[0];
    return measure ? measure.qDef.qDef : '';
  }

  /**
   * Return default name (as defined on the hypercube) for given element.
   *
   * @param {Object} measures qUndoExclude.box.qHyperCubeDef.qMeasures
   * @param {string} elementName e.g. firstWhisker, boxStart, ...
   */
  function getDefaultName(measures, elementName) {
    const measure = measures.filter((measure) => measure.boxElement === elementName)[0];

    const attrExprs = ObjectUtils.mapArrayToObject(measure.qAttributeExpressions, 'id', true);
    return measure && attrExprs.tooltip ? measure.qAttributeExpressions[attrExprs.tooltip.index].qExpression : '';
  }

  /**
   * Property convert functions returning "auto generated" expressions when no custom expressions
   * are specified
   * @param elementName - box element i.e. "firstWhisker", "boxStart"...
   * @returns {{get: get, set: set}}
   */
  function expressionConvertFunctions(elementName) {
    return {
      get(getter, definition, args) {
        const value = args.layout.boxplotDef && args.layout.boxplotDef.elements[elementName].expression;
        if (args.properties.qUndoExclude && (value === null || value === 'NaN' || value === '')) {
          const expression = getDefaultExpression(
            args.properties.qUndoExclude.box.qHyperCubeDef.qMeasures,
            elementName
          );
          return expression || '';
        }
        return getter(null) || '';
      },
      set(value, setter, definition) {
        setter(definition.type, value, null);
      },
    };
  }

  function nameConvertFunctions(elementName) {
    return {
      get(getter, definition, args) {
        if (args.layout.boxplotDef && !args.layout.boxplotDef.elements[elementName].name) {
          return getDefaultName(args.properties.qUndoExclude.box.qHyperCubeDef.qMeasures, elementName);
        }
        return getter(definition.type);
      },
      set(value, setter, definition) {
        setter(definition.type, value, '');
      },
    };
  }

  function isNotFirstDimension(itemData, handler) {
    return getValue(handler.properties, 'boxplotDef.qHyperCubeDef.qDimensions', [])[0] !== itemData;
  }

  function inAdvancedMode(data) {
    return !(data.boxplotDef && data.boxplotDef.calculations.auto);
  }

  const dimensions = {
    // uses:"dimensions",
    ref: 'boxplotDef.qHyperCubeDef.qDimensions',
    disabledRef: 'boxplotDef.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qDimensions',
    items: {
      nullSuppression: {
        show: isNotFirstDimension,
      },
      dimensionLimits: {
        show: false,
      },
      others: {
        show: isNotFirstDimension,
        items: {
          suppressOther: {
            readOnly: true,
            defaultValue: true,
          },
        },
      },
    },
  };

  const measures = {
    uses: 'measures',
    ref: 'boxplotDef.qHyperCubeDef.qMeasures',
    disabledRef: 'boxplotDef.qHyperCubeDef.qLayoutExclude.qHyperCubeDef.qMeasures',
    items: {
      numberFormatting: {
        items: {
          numberFormattingType: {
            // remove measure expression option
            options: [{}, {}, {}, {}, {}, {}, null],
          },
        },
      },
    },
  };

  if (flags.isEnabled('MASTER_MEASURE_FORMAT')) {
    measures.items.numberFormatting = {
      items: {
        numberFormat: measures.items.numberFormatting,
      },
    };
  }

  const boxPlotMode = {
    ref: 'boxplotDef.calculations.mode',
    translation: 'properties.boxplot.preset',
    type: 'string',
    component: 'dropdown',
    options: [
      {
        value: boxplotUtils.BOXMODES.TUKEY.value,
        translation: boxplotUtils.BOXMODES.TUKEY.translation,
      },
      {
        value: boxplotUtils.BOXMODES.FRACTILES.value,
        translation: boxplotUtils.BOXMODES.FRACTILES.translation,
      },
      {
        value: boxplotUtils.BOXMODES.STDDEV.value,
        translation: boxplotUtils.BOXMODES.STDDEV.translation,
      },
    ],
    defaultValue: boxplotUtils.BOXMODES.TUKEY.value,
    show(data) {
      return !inAdvancedMode(data);
    },
  };

  const tukeyCalcParam = {
    ref: 'boxplotDef.calculations.parameters.tukey',
    translation: 'properties.boxplot.whiskerLength',
    type: 'number',
    component: 'dropdown',
    options: boxplotUtils.BOXMODES.TUKEY.calcParameters,
    defaultValue: boxplotUtils.BOXMODES.TUKEY.defaultCalcParam,
    show(data) {
      return !inAdvancedMode(data) && data.boxplotDef.calculations.mode === boxplotUtils.BOXMODES.TUKEY.value;
    },
  };

  const fractilesCalcParam = {
    ref: 'boxplotDef.calculations.parameters.fractiles',
    translation: 'properties.boxplot.whiskerPosition',
    type: 'number',
    component: 'dropdown',
    options: boxplotUtils.BOXMODES.FRACTILES.calcParameters,
    defaultValue: boxplotUtils.BOXMODES.FRACTILES.defaultCalcParam,
    show(data) {
      return !inAdvancedMode(data) && data.boxplotDef.calculations.mode === boxplotUtils.BOXMODES.FRACTILES.value;
    },
  };

  const stddevCalcParam = {
    ref: 'boxplotDef.calculations.parameters.stdDev',
    translation: 'properties.boxplot.whiskerLength',
    type: 'number',
    component: 'dropdown',
    options: boxplotUtils.BOXMODES.STDDEV.calcParameters,
    defaultValue: boxplotUtils.BOXMODES.STDDEV.defaultCalcParam,
    show(data) {
      return !inAdvancedMode(data) && data.boxplotDef.calculations.mode === boxplotUtils.BOXMODES.STDDEV.value;
    },
  };

  function getCustomExpressionFor(element) {
    return {
      type: 'items',
      translation: boxplotUtils.BOXELEMENTS[element].translationKey,
      items: {
        name: {
          ref: `boxplotDef.elements.${element}.name`,
          type: 'string',
          expression: 'optional',
          translation: 'Common.Name',
          convertFunctions: nameConvertFunctions(element),
        },
        expression: {
          ref: `boxplotDef.elements.${element}.expression`,
          component: 'expression',
          expressionType: 'ValueExpression',
          translation: 'Common.Expression',
          convertFunctions: expressionConvertFunctions(element),
        },
      },
    };
  }

  const boxDataSettings = {
    type: 'items',
    translation: 'boxplot.boxElements',
    items: {
      /* calculations:{ */
      auto: {
        ref: 'boxplotDef.calculations.auto',
        translation: 'properties.boxplot.usePreset',
        component: 'switch',
        type: 'boolean',
        defaultValue: true,
        undefinedValue: false,
        options: [
          {
            value: true,
            translation: 'properties.on',
          },
          {
            value: false,
            translation: 'properties.off',
          },
        ],
      },

      mode: boxPlotMode,

      /* parameters:{ */
      tukeyCalcParam,
      fractilesCalcParam,
      stddevCalcParam,
      /* } */

      /* } */

      customGroups: {
        component: 'expandable-items',
        show: inAdvancedMode,
        items: {
          firstWhisker: getCustomExpressionFor('firstWhisker'),
          boxStart: getCustomExpressionFor('boxStart'),
          boxMiddle: getCustomExpressionFor('boxMiddle'),
          boxEnd: getCustomExpressionFor('boxEnd'),
          lastWhisker: getCustomExpressionFor('lastWhisker'),
        },
      },
      outliers: {
        ref: 'boxplotDef.elements.outliers.include',
        translation: 'properties.boxplot.includeOutliers',
        type: 'boolean',
        defaultValue: true,
        show(data) {
          const mode = data.boxplotDef.calculations.mode;
          const calcParam = data.boxplotDef.calculations.parameters[mode];

          return !(!inAdvancedMode(data) && mode === boxplotUtils.BOXMODES.FRACTILES.value && calcParam === 0);
        },
      },
      sortOutliers: {
        ref: 'boxplotDef.elements.outliers.sortOutliers',
        translation: 'properties.boxplot.sortOutliers',
        type: 'boolean',
        defaultValue: true,
        show(data) {
          const mode = data.boxplotDef.calculations.mode;
          const calcParam = data.boxplotDef.calculations.parameters[mode];
          const showCond = !(
            !inAdvancedMode(data) &&
            mode === boxplotUtils.BOXMODES.FRACTILES.value &&
            calcParam === 0
          );
          const include = data.boxplotDef.elements.outliers.include;
          return showCond && include;
        },
      },
    },
  };

  const data = {
    uses: 'data',
    items: {
      dimensions,
      measures,
    },
  };

  return {
    type: 'items',
    component: 'accordion',
    items: {
      data,
      boxDataSettings,
      sorting,
      addons,
      settings,
    },
  };
}
