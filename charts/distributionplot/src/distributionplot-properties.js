import { fontResolver as createFontResolver, setValue, getValue } from 'qlik-chart-modules';
import HyperCubeDefGenerator from '@qlik/common/picasso/hypercube-def-generator/hypercube-def-generator';
import sortOrderBuilder from '@qlik/common/extra/sort-order/sort-order';
import ChartStyleComponent, { getChartFontResolver } from '@qlik/common/extra/chart-style-component';
import distplotUtils from './distributionplot-utils';
import propsLogic from './distributionplot-properties-logic';
import distplotSorter from './sorting/distributionplot-sorter';
import settingsRetriever from './sorting/distributionplot-sorting-settings-retriever';
import elementsRetriever from './sorting/distributionplot-sorting-elements-retriever';
import expressionSortOrderer from './sorting/distributionplot-expression-sort-orderer';
import CONSTANTS from './distributionplot-constants';
import getStylingPanelDefinition from './styling-panel-definition';

function getNumMeasures(obj) {
  return getValue(obj, 'qHyperCubeDef.qMeasures.length', 0);
}
function getNumDimensions(obj) {
  return getValue(obj, 'qHyperCubeDef.qDimensions.length', 0);
}

function persistentColorsShowFunc(data) {
  return (
    !getValue(data, 'color.point.auto') &&
    getValue(data, 'color.point.mode') === 'byDimension' &&
    getNumMeasures(data) <= 1
  );
}

export default function propertyDefinition(env) {
  const { flags, translator } = env;
  const theme = env.anything.sense.theme;

  // Feature Flags
  const stylingPanelEnabled = env.flags.isEnabled('SENSECLIENT_IM_2018_STYLINGPANEL_DIST_PLOT');
  const bkgOptionsEnabled = env.flags.isEnabled('SENSECLIENT_IM_2018_DIST_BG');

  const lookupColorInPalette = (color) => {
    const palette = theme.getDataColorPickerPalettes()[0].colors;
    const index = palette.indexOf(color);
    return { color, index };
  };

  const colors = {
    translation: 'properties.colors',
    type: 'items',
    items: {
      colors: {
        type: 'items',
        items: {
          pointColor: {
            type: 'items',
            translation: 'properties.colorsAndLegend',
            grouped: true,
            items: {
              colors: {
                type: 'items',
                items: {
                  autoColor: {
                    ref: 'color.point.auto',
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
                    ref: 'color.point.mode',
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
                      return !getValue(data, 'color.point.auto', true);
                    },
                  },
                  boxColor: {
                    ref: 'color.box.paletteColor',
                    translation: 'properties.distributionPlot.boxColor',
                    type: 'object',
                    component: 'color-picker',
                    dualOutput: true,
                    defaultValue() {
                      const color = theme.getStyle(CONSTANTS.CHART_ID, 'box', 'fill');
                      return lookupColorInPalette(color);
                    },
                  },
                  paletteColor: {
                    ref: 'color.point.paletteColor',
                    translation: 'properties.distributionPlot.pointColor',
                    type: 'object',
                    component: 'color-picker',
                    dualOutput: true,
                    show(data) {
                      return (
                        !getValue(data, 'color.point.auto', true) &&
                        getValue(data, 'color.point.mode', 'primary') === 'primary'
                      );
                    },
                    defaultValue() {
                      const color = theme.getDataColorSpecials().primary;
                      return lookupColorInPalette(color);
                    },
                  },
                  attributeExpression: {
                    type: 'string',
                    component: 'expression',
                    expressionType: 'measure',
                    schemaIgnore: true,
                    ref: 'color.point.expression.qValueExpression.qExpr',
                    translation: 'Common.Expression',
                    show(data) {
                      return (
                        !getValue(data, 'color.point.auto') && getValue(data, 'color.point.mode') === 'byExpression'
                      );
                    },
                  },
                  expressionIsColor: {
                    ref: 'color.point.expressionIsColor',
                    translation: 'properties.expressionIsColor',
                    type: 'boolean',
                    defaultValue: true,
                    show: false,
                  },
                },
              },
            },
          },
        },
      },
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
  const fontResolver = getChartFontResolver(theme, translator, CONSTANTS.CHART_ID, createFontResolver, flags);
  const styleOptions = ChartStyleComponent(fontResolver, theme, CONSTANTS.CHART_ID);
  const presentation = {
    type: 'items',
    translation: 'properties.presentation',
    items: {
      stylingPanel: stylingPanelEnabled && getStylingPanelDefinition(bkgOptionsEnabled, styleOptions, flags),
      orientation: {
        ref: 'orientation',
        type: 'string',
        component: 'item-selection-list',
        defaultValue: 'horizontal',
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
      showDistBackground: {
        ref: 'presentation.visibleComponents',
        translation: 'properties.show',
        type: 'string',
        component: 'dropdown',
        defaultValue: 'points_box',
        options: [
          {
            value: 'points_box',
            translation: 'properties.distributionPlot.pointsAndBox',
          },
          {
            value: 'points',
            translation: 'properties.distributionPlot.pointsOnly',
          },
          {
            value: 'box',
            translation: 'properties.distributionPlot.boxOnly',
          },
        ],
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

  presentation.items.bubbleScaleItems = {
    type: 'items',
    items: {
      bubbleScales: {
        type: 'integer',
        component: 'slider',
        ref: 'dataPoint.bubbleScales',
        translation: 'properties.dataPoints.bubbleSizes', // we may need translation for bubbleScales instead
        min: 20,
        max: CONSTANTS.BUBBLE_SCALES_MAX,
        step: 5,
        defaultValue: 100,
        show(data) {
          return data.qHyperCubeDef.qMeasures.length < 2 && data.presentation.visibleComponents !== 'box';
        },
      },
    },
  };

  presentation.items.jitter = {
    type: 'string',
    component: 'switch',
    ref: 'dataPoint.displacement',
    translation: 'properties.distributionPlot.jitter',
    defaultValue: 'none',
    options: [
      {
        value: 'none',
        translation: 'properties.off',
      },
      {
        value: 'jitter',
        translation: 'properties.on',
      },
    ],
    show(data) {
      return data.presentation.visibleComponents !== 'box';
    },
  };

  // These will be added to the distplot drop-down
  // properties.distributionPlot.min, properties.distributionPlot.max

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
    show(properties, handler) {
      const hasSecondDimension = getValue(handler.layout, `${CONSTANTS.HYPERCUBE_PATH}.qDimensionInfo.length`) > 1;
      return hasSecondDimension;
    },
    items: {
      dimensionAxisTitle: {
        component: 'header',
        type: 'string',
        show(properties, handler) {
          return getValue(handler.layout, `${CONSTANTS.HYPERCUBE_PATH}.qDimensionInfo.length`) > 1;
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
            show(properties, handler) {
              return (
                getValue(handler.layout, `${CONSTANTS.HYPERCUBE_PATH}.qDimensionInfo.length`) > 1 &&
                getValue(handler.layout, 'orientation') !== 'horizontal'
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
            show(properties, handler) {
              return getValue(handler.layout, `${CONSTANTS.HYPERCUBE_PATH}.qDimensionInfo.length`) > 1;
            },
          },
        },
      },
    },
  };

  function updateAltLabel(data, byDefRef) {
    const byDef = getValue(data, byDefRef, undefined);
    if (!byDef || typeof byDef.label === 'undefined') {
      return;
    }
    if (byDef.label.charAt(0) === '=') {
      data.color.point.altLabel = {
        qStringExpression: {
          qExpr: byDef.label.substr(1),
        },
      };
    } else {
      data.color.point.altLabel = byDef.label;
    }
  }

  const label = (data) => {
    if (getValue(data, 'color.point.auto'))
      return translator.get('Simple.Color.Auto', translator.get('properties.colorMode.primary'));
    return translator.get('Common.Custom');
  };

  const colorModeOptions = (data) => {
    const options = [
      {
        value: 'primary',
        translation: 'properties.colorMode.primary',
      },
      {
        value: 'byDimension',
        translation: 'properties.colorMode.byDimension',
      },
    ];
    if (getValue(data, 'color.point.mode') === 'byExpression') {
      options.push({
        value: 'byExpression',
        translation: 'properties.colorMode.byExpression',
      });
    }
    return options;
  };

  const getLabel = (data, args) => {
    if (data.color.point.byDimDef?.type === 'libraryItem') {
      const libId = data.color.point.byDimDef?.key ?? '';
      const qDimensionInfo = args.handler.layout.qUndoExclude?.qHyperCube?.qDimensionInfo ?? [];
      for (let i = 0; i < qDimensionInfo.length; i++) {
        const qAttrDimInfo = qDimensionInfo[i].qAttrDimInfo;
        if (qAttrDimInfo) {
          for (let j = 0; j < qAttrDimInfo.length; j++) {
            if (qAttrDimInfo[j].colorMapRef === libId) return qAttrDimInfo[j].qFallbackTitle;
          }
        }
      }
      return '';
    }

    return data.color.point.byDimDef?.label ?? '';
  };

  const byDimensionOptions = (data, handler, args) => {
    if (data.qHyperCubeDef?.qDimensions?.length) {
      const options = data.qHyperCubeDef?.qDimensions.map((d, index) => ({
        value: index,
        label: translator.get('properties.colorBy.currentDimension', index + 1),
      }));
      if ((data.color?.point?.byDimDef?.activeDimensionIndex ?? -1) < 0) {
        options.push({
          value: -1,
          label: getLabel(data, args),
        });
      }
      return options;
    }
    return [];
  };

  const showPointPaletteColor = (data, handler) => {
    const useMeasureBaseColor =
      getValue(data, 'color.point.useBaseColors') === 'measure' && propsLogic.measuresHasBaseColors(handler);
    const useDimensionBaseColor =
      getValue(data, 'color.point.useBaseColors') === 'dimension' && propsLogic.dimensionsHasBaseColors(handler);
    return propsLogic.isColorBySingle(data) && !useMeasureBaseColor && !useDimensionBaseColor;
  };

  const showDisclaimer = (data, handler) =>
    !getValue(data, 'color.point.auto', undefined) &&
    getValue(data, 'color.point.mode', undefined) === 'primary' &&
    !showPointPaletteColor(data, handler);

  const simpleColors = {
    items: {
      disclaimer: {
        show(data, handler) {
          return flags.isEnabled('SIMPLE_PROPERTIES_LIBRARY_COLOR') ? false : showDisclaimer(data, handler);
        },
      },
      simpleItems: {
        show(data, handler) {
          return flags.isEnabled('SIMPLE_PROPERTIES_LIBRARY_COLOR') ? true : !showDisclaimer(data, handler);
        },
        items: {
          autoColor: {
            ref: 'color.point.auto',
            undefinedValue: false,
            label,
            change: (data) => {
              if (!getValue(data, 'color.point.auto')) {
                setValue(data, 'color.point.mode', 'primary');
                setValue(data, 'color.point.useBaseColors', 'off');
              }
            },
          },
          colorMode: {
            ref: 'color.point.mode',
            options: colorModeOptions,
            show(data) {
              return !propsLogic.isColorAuto(data);
            },
            change(data) {
              if (getValue(data, 'color.point.mode', undefined) === 'primary') {
                const useBaseColors = getValue(data, 'color.point.useBaseColors', undefined);
                if (useBaseColors !== undefined && useBaseColors !== 'off') {
                  setValue(data, 'color.point.useBaseColors', 'off');
                }
              }
            },
            globalChange() {},
          },
          colorByDimension: {
            ref: 'color.point.byDimDef.activeDimensionIndex',
            options: byDimensionOptions,
            show(data, handler, args) {
              return propsLogic.isColorByDimension(data) && byDimensionOptions(data, handler, args).length > 1;
            },
            change(data) {
              updateAltLabel(data, 'color.point.byDimDef');
            },
          },
          baseColors: {
            type: 'items',
            items: {
              useBaseColor: {
                ref: 'color.point.useBaseColors',
                show(data, handler) {
                  const mode = getValue(data, 'color.point.mode', 'primary');
                  return (
                    flags.isEnabled('SIMPLE_PROPERTIES_LIBRARY_COLOR') &&
                    !propsLogic.isColorAuto(data) &&
                    mode === 'primary' &&
                    (propsLogic.measuresHasBaseColors(handler) || propsLogic.dimensionsHasBaseColors(handler))
                  );
                },
              },
            },
          },
          paletteColor: {
            ref: 'color.point.paletteColor',
            translation: 'properties.distributionPlot.pointColor',
            show: showPointPaletteColor,
          },
          // Switch for showing/hiding custom color schemes
          useDimColVal: {
            ref: 'color.point.useDimColVal',
            show(data, handler, args) {
              const activeDimId = data.color.point?.byDimDef?.activeDimensionIndex ?? null;
              const hasValueColors = propsLogic.hasDimValueColors(args.handler, activeDimId);
              return (
                flags.isEnabled('SIMPLE_PROPERTIES_LIBRARY_COLOR') &&
                hasValueColors &&
                propsLogic.isColorByDimension(data) &&
                propsLogic.isDimensionLibraryItem(data)
              );
            },
          },
          boxColor: {
            ref: 'color.box.paletteColor',
            translation: 'properties.distributionPlot.boxColor',
            type: 'object',
            component: 'color-picker',
            dualOutput: true,
            defaultValue() {
              const color = theme.getStyle(CONSTANTS.CHART_ID, 'box', 'fill');
              return lookupColorInPalette(color);
            },
            show(data) {
              return !getValue(data, 'color.point.auto', true);
            },
          },
        },
      },
    },
  };

  const colorsAndLegend = {
    uses: 'colorsAndLegend',
    items: {
      colors: {
        globalChange: propsLogic.onGlobalChangeColors,
        items: {
          autoColor: {
            ref: 'color.point.auto',
            undefinedValue: false,
          },
          colorMode: {
            ref: 'color.point.mode',
            options(data) {
              const options = [];
              options.push({
                value: 'primary',
                translation: 'properties.colorMode.primary',
              });
              options.push({
                value: 'byDimension',
                translation: 'properties.colorMode.byDimension',
              });
              if (getNumDimensions(data) >= 1) {
                options.push({
                  value: 'byExpression',
                  translation: 'properties.colorMode.byExpression',
                });
              }
              return options;
            },
            show(data) {
              return !propsLogic.isColorAuto(data);
            },
            globalChange() /* data, handler */ {}, // overriding with empty func
          },
          colorByDimension: {
            ref: 'color.point.byDimDef',
            show(data) {
              const isColorByDimension = propsLogic.isColorByDimension(data);
              return isColorByDimension;
            },
            change(data) {
              updateAltLabel(data, 'color.point.byDimDef');
            },
          },
          colorByMeasure: {
            ref: 'color.point.byMeasureDef',
            show(data) {
              return propsLogic.isColorByMeasure(data);
            },
            change(data) {
              updateAltLabel(data, 'color.point.byMeasureDef');
            },
          },
          colorByLabel: {
            ref: 'color.point.altLabel',
            show: propsLogic.showColorByLabel,
            change(data) {
              // Store the custom label in either the dim or the measure (temporary) property. The label is further handled in globalChangeColors()
              const colorMode = getValue(data, 'color.point.mode');

              const altLabel = getValue(data, 'color.point.altLabel', '');
              let byDef;

              switch (colorMode) {
                case 'byMeasure':
                  byDef = data.color.point.byMeasureDef;
                  break;
                case 'byDimension':
                  byDef = data.color.point.byDimDef;
                  break;
                default:
                  break;
              }

              if (!byDef) {
                return;
              }

              byDef.label = altLabel.qStringExpression ? `=${altLabel.qStringExpression.qExpr}` : altLabel;
            },
          },
          baseColors: {
            type: 'items',
            items: {
              useBaseColor: {
                ref: 'color.point.useBaseColors',
                show(data, handler) {
                  const mode = getValue(data, 'color.point.mode', 'primary');
                  return (
                    !propsLogic.isColorAuto(data) &&
                    mode === 'primary' &&
                    (propsLogic.measuresHasBaseColors(handler) || propsLogic.dimensionsHasBaseColors(handler))
                  );
                },
              },
              measureColor: {
                translation: 'properties.libraryColors',
                component: 'measure-color',
                show(data, handler) {
                  return (
                    !getValue(data, 'color.point.auto') &&
                    getValue(data, 'color.point.mode') === 'byMultiple' && // Base color indicator should only be shown when we are in "Custom" / "byMultiple" mode
                    getValue(data, 'color.point.useBaseColors') === 'measure' && // Use base colors must be active
                    // && baseColorSupport.isSupported( data.visualization ) // Visualization must support base colors
                    handler.layout.qHyperCube.qMeasureInfo.length > 1 && // More than one color must be rendered
                    propsLogic.measuresHasBaseColors(handler)
                  ); // At least one of the colors must be a base color
                },
              },
            },
          },
          paletteColor: {
            ref: 'color.point.paletteColor',
            translation: 'properties.distributionPlot.pointColor',
            show(data, handler) {
              const useMeasureBaseColor =
                getValue(data, 'color.point.useBaseColors') === 'measure' && propsLogic.measuresHasBaseColors(handler);
              const useDimensionBaseColor =
                getValue(data, 'color.point.useBaseColors') === 'dimension' &&
                propsLogic.dimensionsHasBaseColors(handler);
              return propsLogic.isColorBySingle(data) && !useMeasureBaseColor && !useDimensionBaseColor;
            },
          },
          // Switch for showing/hiding custom color schemes
          useDimColVal: {
            ref: 'color.point.useDimColVal',
            show(data) {
              return propsLogic.isColorByDimension(data) && propsLogic.isDimensionLibraryItem(data);
            },
          },
          useMeasureGradient: {
            ref: 'color.point.useMeasureGradient',
            translation: 'properties.libraryColors',
            type: 'boolean',
            component: 'switch',
            schemaIgnore: true,
            defaultValue: false,
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
            show(data) {
              const auto = getValue(data, 'color.point.auto');
              const mode = getValue(data, 'color.point.mode');
              return !auto && mode === 'byMeasure' && getValue(data, 'color.point.byMeasureDef.type') === 'libraryItem';
            },
          },
          // // -- Custom color scheme for color by dimensions --
          persistentColors: {
            ref: 'color.point.persistent',
            show(data) {
              if (
                !getValue(data, 'color.point.auto') &&
                getValue(data, 'color.point.mode') === 'byDimension' &&
                getValue(data, 'color.point.byDimDef.type') === 'libraryItem'
              ) {
                return persistentColorsShowFunc(data) && !getValue(data, 'color.point.useDimColVal');
              }
              return persistentColorsShowFunc(data);
            },
          },
          // // -- Color scheme measure
          colorSchemeMeasure: {
            ref: 'color.point.measureScheme',
            show(data) {
              return !propsLogic.isColorAuto(data) && propsLogic.isColorByMeasure(data);
            },
          },
          reverseScheme: {
            ref: 'color.point.reverseScheme',
            change(data) {
              // Also store att data.color.reverseScheme here due to logic connected with the color scheme which would be best left alone (to be continued…).
              data.color.reverseScheme = data.color.point.reverseScheme;
            },
            show(data) {
              return !propsLogic.isColorAuto(data) && propsLogic.isColorByMeasure(data);
            },
          },
          // // -- Color scheme dimension
          colorSchemeDimension: {
            ref: 'color.point.dimensionScheme',
            show(data) {
              const show =
                propsLogic.isColorByDimension(data) &&
                (!propsLogic.isDimensionLibraryItem(data) || !getValue(data, 'color.point.useDimColVal'));
              return show;
            },
          },
          customRange: {
            show(data) {
              return !propsLogic.isColorAuto(data);
            },
            items: {
              autoMinMax: {
                ref: 'color.point.autoMinMax',
                show(data) {
                  return propsLogic.isColorByMeasure(data);
                },
              },
              min: {
                ref: 'color.point.measureMin',
                show(data) {
                  return propsLogic.isColorByMeasure(data) && getValue(data, 'color.point.autoMinMax') === false;
                },
                invalid(data) {
                  if (getValue(data, 'color.point.minMax') === 'minMax') {
                    return getValue(data, 'color.point.measureMin') >= getValue(data, 'color.point.measureMax');
                  }
                  return false;
                },
              },
              max: {
                ref: 'color.point.measureMax',
                show(data) {
                  return propsLogic.isColorByMeasure(data) && getValue(data, 'color.point.autoMinMax') === false;
                },
                invalid(data) {
                  if (getValue(data, 'color.point.minMax') === 'minMax') {
                    return getValue(data, 'color.point.measureMin') >= getValue(data, 'color.point.measureMax');
                  }
                  return false;
                },
              },
            },
          },
          attributeExpression: {
            ref: 'color.point.expression.qValueExpression.qExpr',
            show(data) {
              return propsLogic.isColorByExpression(data);
            },
          },
          expressionIsColor: {
            ref: 'color.point.expressionIsColor',
            show: false,
          },
          boxColor: {
            ref: 'color.box.paletteColor',
            translation: 'properties.distributionPlot.boxColor',
            type: 'object',
            component: 'color-picker',
            dualOutput: true,
            defaultValue() {
              const color = theme.getStyle(CONSTANTS.CHART_ID, 'box', 'fill');
              return lookupColorInPalette(color);
            },
            show(data) {
              return !getValue(data, 'color.point.auto', true);
            },
          },
        },
      },
      simpleColors,
      legend: {
        show: propsLogic.showLegend,
        type: 'items',
        items: {
          show: {
            // ref: "legend.show",
            snapshot: {
              tid: 'property-legend',
            },
          },
          dock: {
            // ref: "legend.dock",
            show(data) {
              const show = propsLogic.showLegend(data) && getValue(data, 'legend.show', true);
              return show;
            },
          },
          showTitle: {
            // ref: "legend.showTitle",
            show(data) {
              const show = propsLogic.showLegend(data) && getValue(data, 'legend.show', true);
              return show;
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
              return props.qHyperCubeDef.qDimensions?.length && props.qHyperCubeDef.qMeasures?.length;
            },
          },
          dimensionTitle: {
            component: 'checkbox',
            ref: 'dimensionAxis.show',
            type: 'string',
            translation: 'Simple.Label.Dimension.Hide',
            defaultValue: 'all',
            show(props) {
              return props.qHyperCubeDef.qDimensions?.length > 1 && props.qHyperCubeDef.qMeasures?.length;
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
              return props.qHyperCubeDef.qDimensions?.length && props.qHyperCubeDef.qMeasures?.length;
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
      colors: colorsAndLegend || colors,
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

  const defaultExpressionItem = sortOrderBuilder.expression(`${CONSTANTS.SORT_CRITERIA}.sortByExpression`);
  const expressionItem = {
    type: 'items',
    items: {
      toggled: defaultExpressionItem.items.toggled,
      sortByElement: {
        component: 'sort-by-element',
        expressionRef: CONSTANTS.SORTING_EXPRESSION,
        elementRef: CONSTANTS.SORTING_ELEMENT_ID,
        show: distplotUtils.isSortByExpression,
        elements(args) {
          return HyperCubeDefGenerator.getAllHyperCubeExpressions(
            args.properties.qHyperCubeDef,
            args.layout.qHyperCube,
            args.model.app
          ).then((expressions) => {
            const settings = settingsRetriever.getSettings(args.layout);

            return elementsRetriever.getElements(expressions.measures, expressions.dimensions, settings, translator);
          });
        },
      },
      order: defaultExpressionItem.items.order,
    },
  };

  const sorting = {
    type: 'items',
    translation: 'properties.sorting',
    schemaIgnore: true,
    grouped: false,
    globalChange(data, handler, args) {
      if (args) {
        expressionSortOrderer.updateSortOrder(data, args.prevProperties);
      }
    },
    items: {
      autoSort: {
        ref: CONSTANTS.AUTO_SORT,
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
        show: distplotUtils.hasMultipleDimensions,
        change(data, handler, properties, args) {
          if (data && distplotUtils.hasMultipleDimensions(data) && handler.layout) {
            return distplotSorter.applySorting(data, handler.layout, args.model.app, null, translator);
          }
          return undefined;
        },
        classification: {
          section: 'sorting',
          tags: ['simple'],
        },
        reset(data) {
          data.sorting = { autoSort: true };
        },
      },
      simpleSorting: {
        component: 'sorting-with-elements',
        expressionRef: CONSTANTS.SORTING_EXPRESSION,
        elementRef: CONSTANTS.SORTING_ELEMENT_ID,
        sortCriteriasRef: CONSTANTS.SORT_CRITERIA,
        show(properties) {
          return distplotUtils.hasMultipleDimensions(properties) && !distplotUtils.isAutoSort(properties);
        },
        elements(args) {
          return HyperCubeDefGenerator.getAllHyperCubeExpressions(
            args.handler.properties.qHyperCubeDef,
            args.handler.layout.qHyperCube,
            args.model.app
          ).then((expressions) => {
            const settings = settingsRetriever.getSettings(args.layout);

            return elementsRetriever.getElements(expressions.measures, expressions.dimensions, settings, translator);
          });
        },
        classification: {
          section: 'sorting',
          tags: ['simple'],
          exclusive: true,
        },
      },
      sortingItems: {
        type: 'items',
        grouped: true,
        show(properties) {
          return distplotUtils.hasMultipleDimensions(properties) && !distplotUtils.isAutoSort(properties);
        },
        items: {
          expression: expressionItem,
          numeric: sortOrderBuilder.numeric(`${CONSTANTS.SORT_CRITERIA}.sortByNumeric`),
          ascii: sortOrderBuilder.ascii(`${CONSTANTS.SORT_CRITERIA}.sortByAscii`),

          defaultSortMessage: {
            component: 'text',
            translation: 'properties.sorting.defaultSortingMessage',
            show(properties) {
              return (
                !distplotUtils.isSortByExpression(properties) &&
                !distplotUtils.isSortByNumeric(properties) &&
                !distplotUtils.isSortByAscii(properties)
              );
            },
          },
        },
      },
      noData: {
        component: 'text',
        translation: 'Common.NoData',
        style: 'hint',
        show(properties) {
          return !distplotUtils.hasMultipleDimensions(properties);
        },
        classification: {
          section: 'sorting',
          tags: ['simple'],
        },
      },
    },
  };

  const dimensions = {
    uses: 'dimensions',
  };

  const measures = {
    uses: 'measures',
  };

  const data = {
    uses: 'data',
    grouped: true,
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
      sorting,
      addons,
      settings,
    },
  };
}
