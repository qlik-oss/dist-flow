import extend from 'extend';
import { getValue } from 'qlik-chart-modules';

import ChartView from '@qlik/common/picasso/chart-view';
import ChartBuilder from '@qlik/common/picasso/chart-builder/chart-builder';
import DerivedProperties from '@qlik/common/picasso/derived-properties/derived-properties';
import SelectionHandler from '@qlik/common/picasso/selections/selections-handler';
import DependentInteractions from '@qlik/common/picasso/selections/dependent-interactions';
import TooltipHandler from '@qlik/common/picasso/tooltip/tooltips-handler';
import ScrollHandler from '@qlik/common/picasso/scroll/scroll-handler';
import DisclaimerAttributesUtil from '@qlik/common/picasso/disclaimer/disclaimer-attributes-util';
import formatting from '@qlik/common/picasso/formatting';

import stringUtil from '@qlik/common/extra/string-util';
import chartStyleUtils from '@qlik/common/extra/chart-style-utils';
import ObjectUtils from '@qlik/common/extra/object-utils';
import Color from '@qlik/common/extra/color-cache';

import { getAxisLabelStyle, getAxisTitleStyle } from '@qlik/common/extra/chart-style-component';
import DataScroller from './boxplot-data-scroller';
import CubeGenerator from './boxplot-cubes-generator';
import tooltipRenderer from './boxplot-box-tooltip-renderer';

const chartID = 'object.boxPlot';
const dataPath = 'qUndoExclude';
const BOX_PATH = `${dataPath}/box/qHyperCube`;
const OUTLIERS_PATH = `${dataPath}/outliers/qHyperCube`;
const HYPERCUBE_PATH = 'boxplotDef';
const MAX_GLYPH_COUNT = 20;
const MAX_OUTLIERS = 3000;

/**
 * Checks whether a dimensions is locked or not
 * @param layout - layout for boxplot
 * @param {boolean} inner - set to true to return the status of the inner dimension, default is false
 * @returns {boolean} - true is the dimension is locked, otherwise false
 */
function getLockedDim(layout, inner) {
  let dimInfos;

  if (inner) {
    dimInfos =
      layout.qUndoExclude &&
      layout.qUndoExclude.outliers &&
      layout.qUndoExclude.outliers.qHyperCube &&
      layout.qUndoExclude.outliers.qHyperCube.qDimensionInfo &&
      layout.qUndoExclude.outliers.qHyperCube.qDimensionInfo.length
        ? layout.qUndoExclude.outliers.qHyperCube.qDimensionInfo
        : undefined;
  } else {
    dimInfos =
      layout.qUndoExclude &&
      layout.qUndoExclude.box &&
      layout.qUndoExclude.box.qHyperCube &&
      layout.qUndoExclude.box.qHyperCube.qDimensionInfo &&
      layout.qUndoExclude.box.qHyperCube.qDimensionInfo.length
        ? layout.qUndoExclude.box.qHyperCube.qDimensionInfo
        : undefined;
  }

  if (!dimInfos) {
    return false;
  }
  const idx = inner ? 2 : 0;

  return dimInfos[idx] ? !!dimInfos[idx].qLocked : false;
}

function shouldSelectInInnerDim(layout) {
  return (
    layout.qUndoExclude &&
    (layout.qUndoExclude.box.qHyperCube.qSize.qcy <= 1 || getLockedDim(layout)) &&
    !getLockedDim(layout, true)
  );
}

function getDimensions(layout) {
  return getValue(layout, 'boxplotDef.qHyperCube.qDimensionInfo', []);
}

function getHasSecondDimension(layout) {
  return getDimensions(layout).length > 1;
}

function getIsHorizontal(orientation) {
  return orientation ? orientation === 'horizontal' : true;
}

function getSelectionSettingsArray(setting) {
  if (Array.isArray(setting)) {
    return setting;
  }
  return setting ? [setting] : [];
}

function getDataSize(layout) {
  return getValue(layout, 'qUndoExclude.box.qHyperCube.qSize.qcy', 0);
}

function getPicassoScrollSettings(layout, viewSize) {
  return {
    viewSize,
    max: getDataSize(layout),
  };
}

function getMaxGlyphCountForDimAxis(layout) {
  const qDimensionInfo = layout.boxplotDef.qHyperCube.qDimensionInfo;
  const qApprMaxGlyphCount = getHasSecondDimension(layout) ? qDimensionInfo[1].qApprMaxGlyphCount : 0;
  return Math.min(MAX_GLYPH_COUNT, qApprMaxGlyphCount);
}

function getDrillIndices(layout) {
  const dimensions = getDimensions(layout);
  return dimensions.map((dim) => dim.qGroupPos);
}

function getHashData(properties, app) {
  const hashData = {
    box: properties.boxplotDef,
  };
  const libId = properties.boxplotDef.qHyperCubeDef.qMeasures[0]?.qLibraryId;
  if (libId) {
    return app.getMeasure(libId).then((measure) =>
      measure.getProperties().then((measureProps) => {
        hashData.measureFormat = {
          qNumFormat: measureProps.qMeasure.qNumFormat,
          isCustomFormatted: measureProps.qMeasure.isCustomFormatted,
        };
        return hashData;
      })
    );
  }
  return Promise.resolve(hashData);
}

function generateDerivedProperties(layout, properties, app, translator) {
  const drillIndices = getDrillIndices(layout);
  return CubeGenerator.generateHyperCubes(properties, drillIndices, layout, app, translator);
}

function updateOnScrollViewChanged() {
  if (this.layout && getHasSecondDimension(this.layout)) {
    // Only run this if there are 2 dimensions
    this._scrollHandler.onResize();
    this._dataScroller.updateCacheSize();
  }
}

function hasPointMarker(layout) {
  return (
    layout.boxplotDef.elements && layout.boxplotDef.elements.outliers && layout.boxplotDef.elements.outliers.include
  );
}

function isSingleSelect(layout, index) {
  const isSingleSelection = getValue(layout, `boxplotDef.qHyperCube.qDimensionInfo.${index}.qIsOneAndOnlyOne`) || false;
  return isSingleSelection;
}

/**
 * Disables/Enables measure- dimension range selection depending if the field is locked or not.
 * ( Don't forget to update this, when we switch to hierarchical data structure )
 * Example:
 * Inner dim locked, outer dim opened -> Dimension range selection available, measure range selection available
 * Inner dim opened, outer dim locked -> Dimension range selection unavailable, measure range selection unavailable
 * @param lockedDim - Array of boolean(s) determining which dimensions are locked or not
 * @param layout - Object describing layout of box plot
 * @returns {object} that gives the status of measure and dimension range selection
 */
function setRangeSelStatus(lockedDim, layout) {
  const rangeSelStatus = {};
  if (!getHasSecondDimension(layout) || lockedDim) {
    rangeSelStatus.isOpenDim = false;
    rangeSelStatus.isOpenMea = false;
  } else {
    rangeSelStatus.isOpenDim = !isSingleSelect(layout, 1); // select range is deactivated when outer dim is single select
    rangeSelStatus.isOpenMea = true;
  }
  return rangeSelStatus;
}

function getColorFromExpValue(obj, theme) {
  let color = Color.retriveColor(obj.qNum === 'NaN' ? obj.qText : obj.qNum, 'argb');
  if (color.isInvalid()) {
    color = Color.retriveColor(theme.getDataColorSpecials().nil);
  }
  return color.toRGBA();
}

const BoxPlot = ChartView.extend('BoxPlot', {
  namespace: '.boxplot',

  init({ $element, backendApi, environment, flags, lasso, layout, selectionsApi, picasso }) {
    this._super(picasso, $element, environment, backendApi, selectionsApi);
    this.flags = flags;

    this._derivedProperties = new DerivedProperties();

    this.picassoElement.__do_not_use_findShapes = this.chartInstance.findShapes.bind(this.chartInstance); // to allow access to renderered content via DOM

    const includeOutliers = getValue(layout, 'boxplotDef.elements.outliers.include');
    const dataPaths = includeOutliers ? [BOX_PATH, OUTLIERS_PATH] : [BOX_PATH];

    this._selectionHandler = SelectionHandler.create({
      model: backendApi.model,
      chartInstance: this.chartInstance,
      selectionsApi,
      dataPaths,
      selectPaths: dataPaths.map((p) => `/${p}Def`),
      isLassoDisabled: this.isLassoDisabled.bind(this),
      lasso,
    });
    this._tooltipHandler = TooltipHandler.create(this.chartInstance, $element, chartID);
    this._scrollHandler = new ScrollHandler(
      this.chartInstance,
      $element,
      this.getSlicedData.bind(this),
      this.updateChart.bind(this)
    );
    this._dataScroller = new DataScroller(backendApi, this.getData, this._scrollHandler);

    this.backendApi.setCacheOptions({ maxStackedValues: MAX_OUTLIERS });
    this._colorCache = {};

    this.setDataPaths(dataPaths);
  },

  getSlicedData(top, height) {
    return this._dataScroller.getSlicedData(this.layout, top, height);
  },

  updateScrollHandlerState(b) {
    if (b !== undefined) {
      this._disableScrolling = !!b;
    }
    this._scrollHandler.setDisabled(!getHasSecondDimension(this.layout) || this._disableScrolling);
  },

  updateConstraints(constraints) {
    const navigation = !constraints.active;
    const tooltip = !constraints.passive;
    const selection = !constraints.select && !constraints.active;

    this._scrollHandler[navigation ? 'on' : 'off']();
    this._tooltipHandler[tooltip ? 'on' : 'off']();
    this._selectionHandler[selection ? 'on' : 'off']();
  },
  off() {
    this._scrollHandler.off();
    this._tooltipHandler.off();
    this._selectionHandler.off();
  },
  _getBoxMarkerSettings(layout, selectionSettings, tooltipSettings) {
    const { theme } = this.environment;
    const boxFillColor = layout.boxplotDef.color.auto
      ? theme.getStyle(chartID, 'box.box', 'fill')
      : theme.getColorPickerColor(layout.boxplotDef.color.box.paletteColor);
    const contrastMedianLine = chartStyleUtils.getContrastingGrey(boxFillColor).toHex();

    // Do not use selection trigger when selecting in inner dimension
    const brushTrigger = shouldSelectInInnerDim(layout) ? [] : getSelectionSettingsArray(selectionSettings.trigger);
    const brushConsume = getSelectionSettingsArray(selectionSettings.consume);

    if (this._tooltipHandler.isOn()) {
      brushTrigger.push(tooltipSettings.box.trigger);
      brushConsume.push.apply(brushConsume, tooltipSettings.box.consume);
    }

    const boxMarkerSettings = {
      displayOrder: 1100,
      settings: {
        whisker: {
          width: 0.5,
          stroke: theme.getStyle(chartID, 'box.whisker', 'stroke'),
          show: layout.boxplotDef.presentation.whiskers.show,
        },
        box: {
          width: 0.5,
          maxWidthPx: 30,
          fill: boxFillColor,
          stroke: theme.getStyle(chartID, 'box.box', 'stroke'),
          strokeWidth: 1,
        },
        median: {
          strokeWidth: 1,
          stroke: contrastMedianLine,
        },
        minor: {
          scale: 'measure',
        },
        line: {
          strokeWidth: 1,
          stroke: theme.getStyle(chartID, 'box.line', 'stroke'),
        },
        orientation: layout.orientation,
      },
      brush: {
        trigger: brushTrigger,
        consume: brushConsume,
      },
      data: {
        source: BOX_PATH,
        extract: {
          field: 'qMeasureInfo/0',
          props: {
            min: { field: 'qMeasureInfo/0' },
            start: { field: 'qMeasureInfo/1' },
            med: { field: 'qMeasureInfo/2' },
            end: { field: 'qMeasureInfo/3' },
            max: { field: 'qMeasureInfo/4' },
            minMeasure: {
              field: 'qMeasureInfo/0',
              reduce: 'first',
              reduceLabel: 'none',
              value(v) {
                return v;
              },
            },
            startMeasure: {
              field: 'qMeasureInfo/1',
              reduce: 'first',
              reduceLabel: 'none',
              value(v) {
                return v;
              },
            },
            medMeasure: {
              field: 'qMeasureInfo/2',
              reduce: 'first',
              reduceLabel: 'none',
              value(v) {
                return v;
              },
            },
            endMeasure: {
              field: 'qMeasureInfo/3',
              reduce: 'first',
              reduceLabel: 'none',
              value(v) {
                return v;
              },
            },
            maxMeasure: {
              field: 'qMeasureInfo/4',
              reduce: 'first',
              reduceLabel: 'none',
              value(v) {
                return v;
              },
            },
            tooltip: '',
          },
        },
      },
    };

    if (getHasSecondDimension(layout)) {
      boxMarkerSettings.data.extract.field = 'qDimensionInfo/0';
      boxMarkerSettings.data.extract.props.elemNo = {};
      boxMarkerSettings.data.extract.props.tooltip = {
        field: 'qDimensionInfo/0',
        value(v) {
          return v;
        },
      };
    }

    if (!layout.boxplotDef.color.auto && layout.boxplotDef.color.mode === 'byExpression') {
      if (layout.qUndoExclude.box.qHyperCube.qMeasureInfo[0].qAttrExprInfo.length === 0) {
        // For backward compatibility
        boxMarkerSettings.settings.box.fill = Color.retriveColor(theme.getDataColorSpecials().nil).toRGBA();
      } else {
        const attrExprs = ObjectUtils.mapArrayToObject(
          layout.qUndoExclude.box.qHyperCube.qMeasureInfo[0].qAttrExprInfo,
          'id',
          true
        );
        const colorAttrExprIndex = attrExprs.colorByExpression && attrExprs.colorByExpression.index;
        if (colorAttrExprIndex > -1) {
          const colorSource = `qMeasureInfo/0/qAttrExprInfo/${colorAttrExprIndex}`;
          boxMarkerSettings.data.extract.props.color = {
            field: colorSource,
            value(v) {
              if (typeof v.qText === 'string') {
                const color = Color.retriveColor(v.qText);
                if (!color.isInvalid()) {
                  return color.toRGBA();
                }
              }
              if (typeof v.qNum === 'number') {
                return Color.retriveColor(v.qNum, 'argb').toRGBA();
              }
              return Color.retriveColor(theme.getDataColorSpecials().nil).toRGBA();
            },
          };
          boxMarkerSettings.settings.box.fill = { ref: 'color' };
        }
      }
    }

    return boxMarkerSettings;
  },
  _clearColorCache() {
    this._colorCache = {};
  },
  _updateColorCache(layout) {
    const { theme } = this.environment;
    const colorCache = this._colorCache;
    const qMatrix = layout.qUndoExclude.box.qHyperCube.qDataPages[0].qMatrix;
    const attrExprs = ObjectUtils.mapArrayToObject(
      layout.qUndoExclude.box.qHyperCube.qMeasureInfo[0].qAttrExprInfo,
      'id',
      true
    );
    qMatrix.forEach((row) => {
      colorCache[row[0].qElemNumber] = getColorFromExpValue(
        row[1].qAttrExps.qValues[attrExprs.colorByExpression.index],
        theme
      );
    });
  },
  _getColorFromElemNo(elemNo) {
    return this._colorCache[elemNo];
  },
  _useColorCache(layout) {
    if (!hasPointMarker(layout)) {
      return false;
    }
    const colorByExpression = !layout.boxplotDef.color.auto && layout.boxplotDef.color.mode === 'byExpression';
    if (!colorByExpression) {
      return false;
    }
    if (layout.qUndoExclude.box.qHyperCube.qMeasureInfo[0].qAttrExprInfo.length === 0) {
      // For backward compatibility
      return false;
    }
    if (!getHasSecondDimension(layout)) {
      return false;
    }
    return true;
  },

  _getPointMarkerSettings(layout, selectionSettings, tooltipSettings) {
    const { theme } = this.environment;
    const pointFillColor = layout.boxplotDef.color.auto
      ? theme.getDataColorSpecials().primary
      : theme.getColorPickerColor(layout.boxplotDef.color.point.paletteColor);
    const pointStrokeColor = chartStyleUtils.getContrastingTransparent(pointFillColor);

    const brushTrigger = getSelectionSettingsArray(selectionSettings.trigger);
    const brushConsume = getSelectionSettingsArray(selectionSettings.consume);
    if (this._tooltipHandler.isOn()) {
      brushTrigger.push(tooltipSettings.point.trigger);
      brushConsume.push.apply(brushConsume, tooltipSettings.point.consume);
    }

    const pointMarkerSettings = {
      displayOrder: 1000,
      settings: {
        fill: pointFillColor,
        stroke: pointStrokeColor,
        size: 0.2,
        strokeWidth: 1,
        sizeLimits: {
          maxRelExtent: 10, // need to override default in order to allow the maximum size of the points to be much higher
          maxPx: 10,
        },
      },
      brush: {
        trigger: brushTrigger,
        consume: brushConsume,
      },
      data: {
        source: OUTLIERS_PATH,
        extract: {
          field: 'qDimensionInfo/1',
          props: {
            elemNo: { field: 'qDimensionInfo/1' },
            inner: { field: 'qDimensionInfo/1' },
            tooltip: {
              field: 'qDimensionInfo/1',
              value(v) {
                return v;
              },
            },
            measure: {
              field: 'qMeasureInfo/0',
              reduce: 'first',
              reduceLabel: 'none',
              value(v) {
                return v;
              },
            },
          },
        },
      },
    };

    const sortOutliers = getValue(layout, 'boxplotDef.elements.outliers.sortOutliers');
    if (sortOutliers === false) {
      pointMarkerSettings.data.sort = (a, b) => (a.measure.value.qValue > b.measure.value.qValue ? 1 : -1);
    }

    if (getHasSecondDimension(layout)) {
      pointMarkerSettings.data.extract.field = 'qDimensionInfo/2';
      pointMarkerSettings.data.extract.props.inner.field = 'qDimensionInfo/2';
      pointMarkerSettings.data.extract.props.tooltip.field = 'qDimensionInfo/2';
      pointMarkerSettings.data.extract.props.outer = {
        field: 'qDimensionInfo/1',
        value(v) {
          return v;
        },
      };
      if (shouldSelectInInnerDim(layout)) {
        pointMarkerSettings.data.extract.props.elemNo.field = 'qDimensionInfo/2';
      }
    }

    if (!layout.boxplotDef.color.auto && layout.boxplotDef.color.mode === 'byExpression') {
      if (layout.qUndoExclude.box.qHyperCube.qMeasureInfo[0].qAttrExprInfo.length === 0) {
        // For backward compatibility
        pointMarkerSettings.settings.fill = Color.retriveColor(theme.getDataColorSpecials().nil).toRGBA();
      } else {
        // Until picasso fully suport using box color for outlier color
        const qMatrix = layout.qUndoExclude.box.qHyperCube.qDataPages[0].qMatrix;
        const self = this;
        this._clearColorCache();
        if (getHasSecondDimension(layout)) {
          pointMarkerSettings.settings.fill = function (d) {
            return self._getColorFromElemNo(d.datum.outer.value.qElemNo);
          };
        } else {
          const attrExprs = ObjectUtils.mapArrayToObject(
            layout.qUndoExclude.box.qHyperCube.qMeasureInfo[0].qAttrExprInfo,
            'id',
            true
          );
          pointMarkerSettings.settings.fill = getColorFromExpValue(
            qMatrix[0][0].qAttrExps.qValues[attrExprs.colorByExpression.index],
            theme
          );
        }
      }
    }

    return pointMarkerSettings;
  },

  _getDimAxisSettings(layout, selectionSettings) {
    // Do not use selection trigger when selecting in inner dimension
    const brushTrigger = shouldSelectInInnerDim(layout) ? [] : getSelectionSettingsArray(selectionSettings.trigger);
    const brushConsume = getSelectionSettingsArray(selectionSettings.consume);
    const containerSize =
      this.picassoElement.getBoundingClientRect()[layout.orientation === 'vertical' ? 'height' : 'width'];
    const maxLengthPx = containerSize / 4; // Label size should not be more than 25% of the container size
    const adjustedMaxGlyphCount = stringUtil.getAdjustedMaxGlyphCount(
      getMaxGlyphCountForDimAxis(this.layout || layout),
      layout.qUndoExclude.box.qHyperCube.qDataPages[0].qMatrix,
      0
    );
    return {
      brush: {
        trigger: brushTrigger,
        consume: brushConsume,
      },
      settings: {
        labels: {
          mode: layout.orientation === 'vertical' ? layout.dimensionAxis.label : 'auto',
          maxGlyphCount: adjustedMaxGlyphCount, // To mitigate SUI-1445 and SUI-4401
          maxLengthPx, // Picasso version 0.5.3 does not support function here
        },
        paddingEnd: 4,
      },
    };
  },
  createChartSettings(layout) {
    const isRtl = this.isRtl();
    const { theme } = this.environment;
    const isHorizontal = getIsHorizontal(layout.orientation);
    const hasSecondDimension = getHasSecondDimension(layout);
    const dimInfo = layout[HYPERCUBE_PATH].qHyperCube.qDimensionInfo;
    const isSnapshot = !!layout.snapshotData;

    const measureDirection = isHorizontal ? 'x' : 'y';
    const dimensionDirection = isHorizontal ? 'y' : 'x';

    // Create components
    const chartBuilder = ChartBuilder.create({
      chartID,
      theme,
      isRtl,
      flags: this.flags,
    });

    let dimAxisSelectionSettings = {};
    let boxSelectionSettings = {};
    let pointSelectionSettings = {};

    if (this._selectionHandler.isOn()) {
      const outerSelectionSettings = this._selectionHandler.setUp({
        contexts: ['select'],
        data: ['elemNo'],
        datasets: [BOX_PATH, OUTLIERS_PATH],
        isSingleSelect: isSingleSelect(layout, 1),
      });
      if (hasSecondDimension) {
        this.chartInstance
          .brush('select')
          .addKeyAlias(`${OUTLIERS_PATH}/qDimensionInfo/1`, `${BOX_PATH}/qDimensionInfo/0`);
      } else {
        this.chartInstance.brush('select').removeKeyAlias(`${OUTLIERS_PATH}/qDimensionInfo/1`);
      }

      dimAxisSelectionSettings = {
        trigger: extend(true, {}, outerSelectionSettings.trigger, { data: [''] }),
        consume: [extend(true, {}, outerSelectionSettings.consume, { data: [''] })],
      };
      boxSelectionSettings = {
        trigger: outerSelectionSettings.trigger,
        consume: [outerSelectionSettings.consume],
      };
      pointSelectionSettings = {
        trigger: outerSelectionSettings.trigger,
        consume: [outerSelectionSettings.consume],
      };
    }
    const tooltipSettings = { point: {}, box: {} };
    if (this._tooltipHandler.isOn()) {
      tooltipSettings.point = this._tooltipHandler.setUp({
        chartBuilder,
        environment: this.environment,
        tooltipKey: 'point-tooltip',
        dataPath: OUTLIERS_PATH,
        data: hasSecondDimension ? ['inner', dimensionDirection] : ['inner'],
        contexts: ['pointTip'],
        componentKey: 'point-marker',
        rowResolver(field, measureContent) {
          return {
            value: formatting.formatMeasureValue(field, measureContent),
            label: layout.boxplotDef.qHyperCube.qMeasureInfo[0].qFallbackTitle,
          };
        },
        measureRows: ['measure'],
        labelData: hasSecondDimension ? ['tooltip', 'outer'] : ['tooltip'],
      });
      tooltipSettings.box = this._tooltipHandler.setUp({
        chartBuilder,
        environment: this.environment,
        tooltipKey: 'box-tooltip',
        renderer: tooltipRenderer,
        dataPath: BOX_PATH,
        data: [''],
        contexts: ['boxTip'],
        componentKey: 'box-marker',
        headerResolver(values) {
          return (
            (hasSecondDimension ? `${values[0]} - ` : '') + layout.boxplotDef.qHyperCube.qMeasureInfo[0].qFallbackTitle
          );
        },
        rowResolver(field, measureContent) {
          const measurePath = `${measureContent.source.key}/${measureContent.source.field}`.replace(/\//g, '.'); // getValue works only with .
          const measureInfo = getValue(layout, measurePath);
          const attrExprs = ObjectUtils.mapArrayToObject(measureInfo.qAttrExprInfo, 'id', true);
          const tooltipExpr = attrExprs.tooltip;
          let tooltipLabel;

          if (!tooltipExpr) {
            tooltipLabel = measureInfo.qFallbackTitle;
          } else {
            const qAttrExpxValues = measureContent.value.qAttrExps.qValues;
            tooltipLabel = qAttrExpxValues[tooltipExpr.index] ? qAttrExpxValues[tooltipExpr.index].qText : '';
          }

          return {
            value: formatting.formatMeasureValue(field, measureContent),
            label: tooltipLabel,
          };
        },
        measureRows: ['maxMeasure', 'endMeasure', 'medMeasure', 'startMeasure', 'minMeasure'], // Should be a mapped path under extract, mandatory to display tooltip
        labelData: ['tooltip'], // Should be a mapped path under extract, mandatory to display tooltip,
        filterShapes(shapes) {
          const boxContainer = [];
          if (shapes.length > 0) {
            for (let i = 0; i < shapes.length; i++) {
              if (shapes[i].type === 'container') {
                boxContainer.push(shapes[i]);
                break;
              }
            }
          }
          return boxContainer;
        },
      });
    }

    const lockedOuterDim = getLockedDim(layout);
    const rangeSelStatus = setRangeSelStatus(lockedOuterDim, layout);
    const handlers = {
      scrollHandler: this._scrollHandler,
      selectionHandler: this._selectionHandler,
    };
    const keys = {
      componentKey: shouldSelectInInnerDim(layout) && hasPointMarker(layout) ? 'point-marker' : 'box-marker',
      lassoBrushKey: 'select',
      dimRangeBrushKey: 'select',
      measureRangeBrushKey: null,
      areaBrushKey: this.flags.isEnabled('BOX_MEASURE_RANGE') ? 'select' : null,
    };

    if (this._dependentActions) {
      this._dependentActions.destroy();
    }
    this._dependentActions = DependentInteractions.create(handlers, layout.orientation, isRtl, keys, rangeSelStatus);

    chartBuilder.addPreset('dimension-measure-chart', {
      // common
      isRtl,
      includeDimensionAxis: hasSecondDimension,
      orientation: layout.orientation,
      selectionsEnabled: this._selectionHandler.isOn(),
      theme,

      // measure scale
      measureSource: ['qMeasureInfo/0', 'qMeasureInfo/1', 'qMeasureInfo/2', 'qMeasureInfo/3', 'qMeasureInfo/4'],

      // dimension scale
      dimensionSource: 'qDimensionInfo/0',

      // measure axis and title
      measureAxisProperties: layout.measureAxis, // used by both
      measureTitleText: layout[HYPERCUBE_PATH].qHyperCube.qMeasureInfo[0].qFallbackTitle,

      // dimension axis and title
      dimensionAxisProperties: layout.dimensionAxis, // used by both
      dimensionAxisSettings: this._getDimAxisSettings(layout, dimAxisSelectionSettings, tooltipSettings),
      dimensionTitleText: (dimInfo && dimInfo[dimInfo.length - 1] && dimInfo[dimInfo.length - 1].qFallbackTitle) || '',

      // grid lines
      gridlines: layout.gridlines,

      // scroll
      hasNavigation: !isSnapshot,
      isNavigationEnabledFn: () => this._scrollHandler.isOn(),
      scrollSettings: getPicassoScrollSettings(layout, this._scrollHandler.getScrollViewSizeInItem()),

      // Lasso
      enableLasso: true,
      lasso: {
        brushKey: 'select',
        brushComponents: shouldSelectInInnerDim(layout) ? ['point-marker'] : ['box-marker', 'point-marker'],
      },

      // Dim range
      enableDimRange: true,
      dimRange: {
        brushKey: 'select',
        brushAxis: isHorizontal ? 'y-axis' : 'x-axis',
        brushArea: 'box-marker',
        brushScale: 'dimension',
      },

      // Measure range
      enableAreaRange: !!this.flags.isEnabled('BOX_MEASURE_RANGE'),
      areaRange: {
        brushKey: 'select',
        brushAxis: isHorizontal ? 'x-axis' : 'y-axis',
        brushData: ['elemNo'],
        brushArea: 'box-marker',
        brushScale: 'measure',
        brushComponents: ['box-marker'],
      },

      brushActions: this._dependentActions?.gestures,

      // ref-lines
      refLines: layout.refLine && layout.refLine.refLines,
      axisTitleStyle: getAxisTitleStyle(chartID, theme, layout),
      axisLabelStyle: getAxisLabelStyle(chartID, theme, layout),
    });

    const settings = chartBuilder.getSettings();

    // Box marker
    const boxMarkerSettings = this._getBoxMarkerSettings(layout, boxSelectionSettings, tooltipSettings);
    if (hasSecondDimension) {
      boxMarkerSettings.settings.major = { scale: 'dimension' };
    }
    chartBuilder.addComponent('box-marker', boxMarkerSettings);

    // Point marker
    if (hasPointMarker(layout)) {
      const pointMarkerSettings = this._getPointMarkerSettings(layout, pointSelectionSettings, tooltipSettings);

      settings.scales.measure.data.fields.push({
        source: OUTLIERS_PATH,
        field: 'qMeasureInfo/0',
      });

      pointMarkerSettings.data.extract.props[measureDirection] = { field: 'qMeasureInfo/0' };
      pointMarkerSettings.settings[measureDirection] = { scale: 'measure' };
      if (hasSecondDimension) {
        pointMarkerSettings.data.extract.props[dimensionDirection] = { field: 'qDimensionInfo/1' };
        pointMarkerSettings.settings[dimensionDirection] = { scale: 'dimension' };
      }

      chartBuilder.addComponent('point-marker', pointMarkerSettings);
    }

    // Add snapshot settings
    this.addSnapshotChartSettings(settings, layout);

    return settings;
  },

  resize() {
    if (!this.layout) {
      return;
    }
    updateOnScrollViewChanged.call(this);
    this._super();
  },
  paint() {
    const isSnapshot = !!this.layout.snapshotData;
    if (!isSnapshot && !this.environment.options.viewState) {
      this.updateScrollHandlerState(false);
    }

    if (!this._orientation) {
      this._orientation = this.layout.orientation;
    }
    if (this._orientation !== this.layout.orientation) {
      updateOnScrollViewChanged.call(this);
      this._orientation = this.layout.orientation;
    }
    const layout = this.layout;

    const self = this;

    const undoExclude = layout.qUndoExclude;

    if (!undoExclude) {
      return Promise.resolve();
    }

    this._tooltipHandler.closeTooltip();

    const haveBoxData = undoExclude.box && undoExclude.box.qHyperCube.qDataPages.length;
    const haveOutliersData =
      !layout.boxplotDef.elements.outliers.include ||
      (undoExclude.outliers && undoExclude.outliers.qHyperCube.qStackedDataPages.length);

    if (haveBoxData && haveOutliersData) {
      let retProm;
      if (
        !isSnapshot &&
        getHasSecondDimension(layout) &&
        this._scrollHandler.isDataSizeChanged(
          layout.qUndoExclude.box.qHyperCube.qDataPages[0].qMatrix.length,
          layout.qUndoExclude.box.qHyperCube.qSize.qcy
        )
      ) {
        const _super = this._super;
        retProm = this._scrollHandler.getViewData().finally(() => _super.call(self));
      } else {
        retProm = this._super();
      }

      return retProm;
    }
    return Promise.resolve();
  },
  destroy() {
    this._super();
    this._dataScroller.destroy();
  },
  setSnapshotData(snapshotLayout) {
    this._super(snapshotLayout);
    // eslint-disable-next-line no-param-reassign
    snapshotLayout.qUndoExclude.box.qHyperCube.qDataPages = this.layout.qUndoExclude.box.qHyperCube.qDataPages;
    if (snapshotLayout.boxplotDef.elements.outliers.include) {
      // eslint-disable-next-line no-param-reassign
      snapshotLayout.qUndoExclude.outliers.qHyperCube.qStackedDataPages =
        this.layout.qUndoExclude.outliers.qHyperCube.qStackedDataPages;
    }
    return Promise.resolve(snapshotLayout);
  },
  getViewState() {
    return {
      scroll: Math.round(this._scrollHandler.getScrollState()),
    };
  },

  getDisclaimerAttributes(layout) {
    const showDisclaimer = this.flags.isEnabled('SHOW_DISCLAIMER') ? !(layout.showDisclaimer === false) : true;
    const scrollSettings = getPicassoScrollSettings(layout, this._scrollHandler.getScrollViewSizeInItem());
    let explicitLimitedData;
    if (
      showDisclaimer &&
      !getHasSecondDimension(layout) &&
      layout.boxplotDef.elements.outliers.include &&
      layout.qUndoExclude.outliers.qHyperCube.qSize.qcy > 10000
    ) {
      explicitLimitedData = true;
    } else {
      explicitLimitedData =
        showDisclaimer &&
        DisclaimerAttributesUtil.getLimitedDataAttribute(
          layout && layout.qUndoExclude && layout.qUndoExclude.outliers && layout.qUndoExclude.outliers.qHyperCube,
          { maxNbrOfDimensions: 3 }
        );
    }
    return {
      data: layout.qUndoExclude && layout.qUndoExclude.box,
      supportedDisclaimers: {
        LimitedData: showDisclaimer && explicitLimitedData,
      },
      options: {
        bottom: true,
        paddingBottom: explicitLimitedData && scrollSettings && scrollSettings.viewSize < scrollSettings.max,
        supportNegative: true,
        explicitLimitedData,
      },
    };
  },

  updateChart(layout, settings, isPartialData) {
    if (this._useColorCache(layout)) {
      this._updateColorCache(layout);
    }
    this._super(layout, settings, isPartialData);
  },

  updateDerivedProperties(properties, layout) {
    const { app, translator } = this.environment;
    const self = this;
    const model = self.backendApi.model;

    return getHashData(properties, app).then((hashData) =>
      self._derivedProperties
        .addDefaultHyperCubeHash(properties.boxplotDef.qHyperCubeDef, layout.boxplotDef.qHyperCube, app, hashData)
        .then((hashData) => {
          const settings = {
            layout,
            properties,
            model,
            hashData,
            generateDerivedProperties(layout, properties) {
              return generateDerivedProperties(layout, properties, app, translator);
            },
          };

          return self._derivedProperties.updateDerivedProperties(settings);
        })
    );
  },

  updateData(layout) {
    const self = this;
    const isSnapshot = !!layout.snapshotData;

    return self._super(layout).then(() => {
      if (self._destroyed) {
        return Promise.reject();
      }
      layout = self.layout; // eslint-disable-line no-param-reassign

      self._scrollHandler.setOptions({ direction: layout.orientation === 'horizontal' ? 'vertical' : 'horizontal' }); // the scroll orientation is inverted to the chart orientation

      if (isSnapshot) {
        return Promise.resolve();
      }

      // Derived properties are up to date, go ahead and update data

      self.updateScrollHandlerState(true);
      const { viewState } = self.environment.options;
      if (viewState) {
        self._scrollHandler.updateViewState(getDataSize(layout));
        self._scrollHandler.setScrollState(viewState.scroll);
      } else {
        self._scrollHandler.resetScroll();
      }

      const undoExclude = layout.qUndoExclude;
      const includeOutliers = getValue(layout, 'boxplotDef.elements.outliers.include');
      const propPaths = [];
      const dataPaths = [BOX_PATH];
      if (getHasSecondDimension(layout)) {
        propPaths.push('/qUndoExclude/box/qHyperCubeDef');
      }
      if (includeOutliers) {
        propPaths.push('/qUndoExclude/outliers/qHyperCubeDef');
        dataPaths.push(OUTLIERS_PATH);
        self._dataScroller.updateOutliersCache(layout);
      }
      self.setDataPaths(dataPaths);
      self.backendApi.updateCache(undoExclude.box);

      if (getHasSecondDimension(layout)) {
        const start = viewState ? viewState.scroll : self._scrollHandler.getScrollState();
        return self.getSlicedData(start, self._scrollHandler.getScrollViewSizeInItem());
      }
      const dfds = [self.getData(self.backendApi, undoExclude.box.qHyperCube, { height: 1 })];
      if (includeOutliers) {
        dfds.push(
          self.getData(self._dataScroller.getOutliersCache(), undoExclude.outliers.qHyperCube, {
            height: undoExclude.outliers.qHyperCube.qSize.qcy,
          })
        );
      }
      return Promise.all(dfds);
    });
  },

  isLassoDisabled() {
    const layout = this.layout;
    const dimsInfo = getValue(layout, 'boxplotDef.qHyperCube.qDimensionInfo');
    const isAllDimsSingleSelect =
      dimsInfo.length === dimsInfo.filter((dimInfo) => dimInfo.qIsOneAndOnlyOne === true).length;
    return isAllDimsSingleSelect;
  },
});

export default BoxPlot;
