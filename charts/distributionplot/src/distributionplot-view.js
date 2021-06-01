import extend from 'extend';
import { getValue } from '@qlik/chart-modules';
import ChartView from '@qlik/common/picasso/chart-view';
import ChartBuilder from '@qlik/common/picasso/chart-builder/chart-builder';
import DerivedProperties from '@qlik/common/picasso/derived-properties/derived-properties';
import SelectionHandler from '@qlik/common/picasso/selections/selections-handler';
import DependentInteractions from '@qlik/common/picasso/selections/dependent-interactions';
// import TooltipHandler from '@qlik/common/picasso/tooltip/tooltips-handler';
import ScrollHandler from '@qlik/common/picasso/scroll/scroll-handler';
import legendUtils from '@qlik/common/picasso/legend/legend-utils';

import stringUtil from '@qlik/common/extra/string-util';
import Color from '@qlik/common/extra/color-cache';
import chartStyleUtils from '@qlik/common/extra/chart-style-utils';
import hypercubeUtil from '@qlik/common/extra/hypercube-util';
import DimensionColorUtil from '@qlik/common/extra/dimension-color-util';
// import ChartDataHelper from '../../../assets/objects/views/charts/chart-data-helper';

import Jitter from './jitter';
import columnOrderAdapter from './distributionplot-column-order-adapter';
import CONSTANTS from './distributionplot-constants';
import distributionPlotCubeGenerator from './distributionplot-cube-generator';

const DATA_PATH = CONSTANTS.DATA_PATH;
const HYPERCUBE_PATH = CONSTANTS.HYPERCUBE_PATH;
const HYPERCUBE_DEF_PATH = CONSTANTS.HYPERCUBE_DEF_PATH;

function getHashData(properties) {
  return {
    cube: properties[HYPERCUBE_DEF_PATH],
    sorting: properties.sorting,
    color: {
      point: properties.color.point,
    },
  };
}

function getSelectionSettingsArray(setting) {
  if (Array.isArray(setting)) {
    return setting;
  }
  return setting ? [setting] : [];
}

function getDataSize(layout) {
  return Math.min(hypercubeUtil.getOuterDimensionSizeOfMax2Dims(layout, DATA_PATH), CONSTANTS.MAX_STACKED_VALUES);
}

function getPicassoScrollSettings(layout, viewSize) {
  return {
    viewSize,
    max: getDataSize(layout),
  };
}

function getMaxGlyphCountForDimAxis(layout) {
  const qDimensionInfo = layout[DATA_PATH][HYPERCUBE_PATH].qDimensionInfo;
  const qApprMaxGlyphCount = hypercubeUtil.hasSecondDimension(layout, DATA_PATH)
    ? qDimensionInfo[0].qApprMaxGlyphCount
    : 0;
  return Math.min(CONSTANTS.MAX_GLYPH_COUNT, qApprMaxGlyphCount);
}

function updateCacheSize() {
  const k = CONSTANTS.MAX_STACKED_VALUES >= this.layout.qUndoExclude.qHyperCube.qSize.qcy ? 3 : 1; // To fix QLIK-87944
  this.backendApi.setCacheOptions({ height: k * this._scrollHandler.getScrollViewSizeInItem(), width: 3 });
}

function updateOnScrollViewChanged() {
  if (this.layout && hypercubeUtil.hasSecondDimension(this.layout, DATA_PATH)) {
    // Only run this if there are 2 dimensions
    this._scrollHandler.onResize();
    if (this.backendApi && !this.backendApi.isSnapshot) {
      updateCacheSize.call(this);
    }
  }
}

/**
 * Checks whether the dimensions is locked or not
 * @param layout - layout for distributionplot
 * @returns {bool} - true is the dimension is locked, otherwise false
 */
function getLockedDims(layout) {
  const lockedDims = [];
  const dimInfos =
    layout.qUndoExclude && layout.qUndoExclude.qHyperCube && layout.qUndoExclude.qHyperCube.qDimensionInfo
      ? layout.qUndoExclude.qHyperCube.qDimensionInfo
      : undefined;
  if (!dimInfos) {
    return false;
  }
  for (let i = 0; i < dimInfos.length; i++) {
    if (dimInfos[i].qLocked) {
      lockedDims.push(dimInfos[i].qLocked);
    } else {
      lockedDims.push(false);
    }
  }
  return lockedDims;
}

/**
 * Disables/Enables measure- dimension range selection depending if the field is locked or not.
 * Example:
 * Inner dim locked, outer dim opened -> Dimension range selection available, measure range selection unavailable
 * Inner dim opened, outer dim locked -> Dimension range selection unavailable, measure range selection available
 * @param lockedDims - Array of booleans determining which dimensions are locked or not
 * @returns {object} that gives the status of measure and dimension range selection
 */
function retrieveRangeSelStatus(lockedDims, isInnerDimSingleSelect, isOuterDimSingleSelect) {
  const rangeSelStatus = {};

  if (lockedDims.length === 1) {
    // One dim case
    rangeSelStatus.isOpenDim = false;

    if (lockedDims[0]) {
      rangeSelStatus.isOpenMea = false;
    } else {
      rangeSelStatus.isOpenMea = true;
    }
  } else if (lockedDims[0] && !lockedDims[1]) {
    rangeSelStatus.isOpenDim = false;
    rangeSelStatus.isOpenMea = true;
  } else if (!lockedDims[0] && lockedDims[1]) {
    rangeSelStatus.isOpenDim = true;
    rangeSelStatus.isOpenMea = false;
  } else if (lockedDims[0] && lockedDims[1]) {
    rangeSelStatus.isOpenDim = false;
    rangeSelStatus.isOpenMea = false;
  } else {
    rangeSelStatus.isOpenDim = true;
    rangeSelStatus.isOpenMea = true;
  }

  if (isInnerDimSingleSelect) {
    rangeSelStatus.isOpenMea = false;
  }
  if (isOuterDimSingleSelect) {
    rangeSelStatus.isOpenDim = false;
  }
  return rangeSelStatus;
}

function sliderEnabled(layout) {
  return layout.dataPoint && layout.dataPoint.bubbleScales;
}

function resetCategoricalLegendScroll() {
  const catLegend = this.chartInstance.component('legend');
  if (catLegend && catLegend.emit) {
    catLegend.emit('resetindex');
  }
}

function isSingleSelect(layout, index) {
  return getValue(layout, `qHyperCube.qDimensionInfo.${index}.qIsOneAndOnlyOne`) || false;
}

const DistributionPlot = ChartView.extend('DistributionPlot', {
  namespace: '.distributionPlot',
  defaultOptions: {
    navigation: true,
    selections: true,
    tooltips: true,
  },

  init(lasso, flags, picasso, translator, theme, $scope, $element, options, backendApi, selectionsApi, tooltipApi) {
    this._super(picasso, $scope, $element, options, backendApi, selectionsApi);
    this.flags = flags;
    this.translator = translator;
    this.theme = theme;

    this.picassoElement.__do_not_use_findShapes = this.chartInstance.findShapes.bind(this.chartInstance); // to allow access to renderered content via DOM

    this._derivedProperties = new DerivedProperties();

    if (this.hasOption('selections')) {
      this._selectionHandler = SelectionHandler.create({
        model: backendApi.model,
        chartInstance: this.chartInstance,
        selectionsApi,
        isLassoDisabled: this.isLassoDisabled.bind(this),
        selectPaths: ['/qUndoExclude/qHyperCubeDef'],
        lasso,
      });
    }
    if (this.hasOption('tooltips')) {
      // TODO: fix tooltip
      // this._tooltipHandler = TooltipHandler.create(this.chartInstance, tooltipApi, $element, CONSTANTS.CHART_ID);
      this._tooltipHandler = { on: () => {}, off: () => {}, setUp: () => {}, closeTooltip: () => {} };
    }
    this._scrollHandler = new ScrollHandler(
      this.chartInstance,
      $element,
      $element[0],
      this.getSlicedData.bind(this),
      tooltipApi,
      this.onScrollCallback.bind(this),
      'legend'
    );

    this.backendApi.setPath(`/${DATA_PATH}/${HYPERCUBE_DEF_PATH}`);
    this.backendApi.setCacheOptions({ maxStackedValues: CONSTANTS.MAX_STACKED_VALUES });

    this._maxBubbleScale = CONSTANTS.BUBBLE_SCALES_MAX;

    this._jitterTool = new Jitter();

    this.setDataPaths([`${DATA_PATH}/${HYPERCUBE_PATH}`]);
  },

  onScrollCallback(layout, settings, isPartialData) {
    const self = this;
    this._updateColorMapData(layout).then(() => {
      self.updateChart(layout, settings, isPartialData);
    });
  },

  getSlicedData(top, height) {
    const self = this;
    return this.getData(this.backendApi, this.layout[DATA_PATH][HYPERCUBE_PATH], { top, height }).then(
      () => self.layout
    );
  },

  updateScrollHandlerState(b) {
    if (b !== undefined) {
      this._disableScrolling = !!b;
    }
    this._scrollHandler.setDisabled(
      !this.hasOption('navigation') ||
        !hypercubeUtil.hasSecondDimension(this.layout, DATA_PATH) ||
        this._disableScrolling
    );
  },

  updateConstraints(constraints) {
    const navigation = !constraints.active;
    const tooltip = !constraints.passive;
    const selection = !constraints.select && !constraints.active;

    this._scrollHandler[navigation ? 'on' : 'off']();
    this._tooltipHandler[tooltip ? 'on' : 'off']();
    this._selectionHandler[selection ? 'on' : 'off']();
  },
  on() {
    this._super();
    if (this.hasOption('tooltips')) {
      this._tooltipHandler.on();
    }
    if (this.hasOption('selections')) {
      this._selectionHandler.on();
    }
    if (this.hasOption('navigation')) {
      this._scrollHandler.on();
    }
  },

  off() {
    this._super();
    if (this.hasOption('tooltips')) {
      this._tooltipHandler.off();
    }
    if (this.hasOption('selections')) {
      this._selectionHandler.off();
    }
    if (this.hasOption('navigation')) {
      this._scrollHandler.off();
    }
  },

  _getPointScale() {
    return sliderEnabled(this.layout) ? this.layout.dataPoint.bubbleScales / this._maxBubbleScale : 1;
  },

  _calcBandwidth(chartAreaSize, chart) {
    const dimScale = chart.scales().dimension;
    this._bandwidthRatio = dimScale ? dimScale.pxScale(chartAreaSize).bandwidth() : 1;
    this._bandwidthPx = chartAreaSize * this._bandwidthRatio;
  },

  _calcPointMaxSize(pointScale, bandwidthPx) {
    const maxPointSize =
      Math.min(CONSTANTS.MAX_POINT_BASE_SIZE_PX, bandwidthPx * CONSTANTS.POINT_BANDWIDTH_BASE_RATIO) * pointScale;

    this._pointMaxSizePx = Math.max(CONSTANTS.MIN_POINT_PIXELS, maxPointSize);
  },

  _calcPointSize(pointMaxSizePx, bandwidthPx) {
    this._pointSize = pointMaxSizePx / bandwidthPx;
  },

  _getDimAxisSettings(layout, selectionSettings) {
    const brushTrigger = getSelectionSettingsArray(selectionSettings.trigger);
    const brushConsume = getSelectionSettingsArray(selectionSettings.consume);
    const containerSize = this.picassoElement.getBoundingClientRect()[
      layout.orientation === 'vertical' ? 'height' : 'width'
    ];
    const adjustedMaxGlyphCount = stringUtil.getAdjustedMaxGlyphCount(
      getMaxGlyphCountForDimAxis(this.layout || layout),
      layout[DATA_PATH][HYPERCUBE_PATH].qStackedDataPages[0].qData[0].qSubNodes
    );

    const maxLengthPx = containerSize / 4; // Label size should not be more than 25% of the container size
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

  _getBoxMarkerSettings(layout, selectionSettings) {
    const boxFillColor = layout.color.point.auto
      ? this.theme.getStyle(CONSTANTS.CHART_ID, 'box', 'fill')
      : this.theme.getColorPickerColor(layout.color.box.paletteColor);
    const brushTrigger = getSelectionSettingsArray(selectionSettings.trigger);
    const brushConsume = getSelectionSettingsArray(selectionSettings.consume);

    const obj = this;

    let startField = 'qMeasureInfo/0';
    let endField = 'qMeasureInfo/0';
    if (
      hypercubeUtil.hasSecondDimension(layout, DATA_PATH) &&
      layout.qUndoExclude.qHyperCube.qDimensionInfo[0].qAttrExprInfo.length
    ) {
      startField = 'qDimensionInfo/0/qAttrExprInfo/0';
      endField = 'qDimensionInfo/0/qAttrExprInfo/1';
    }

    const boxSettings = {
      require: ['chart'],
      displayOrder: 1000,
      settings: {
        chart: this,
        box: {
          fill: boxFillColor,
          stroke: this.theme.getStyle(CONSTANTS.CHART_ID, 'box', 'stroke'),
          strokeWidth: 0,
          width: CONSTANTS.POINT_BANDWIDTH_BASE_RATIO,
          maxWidthPx: CONSTANTS.MAX_POINT_BASE_SIZE_PX,
          minWidthPx: CONSTANTS.MIN_POINT_PIXELS + CONSTANTS.BOX_PADDING * 2,
        },
        minor: { scale: 'measure' },
        orientation: layout.orientation,
      },
      beforeRender() {
        const hasVisibleComponentsProps = obj.layout.presentation && obj.layout.presentation.visibleComponents;
        const showPoints =
          hasVisibleComponentsProps && obj.layout.presentation.visibleComponents.indexOf('point') !== -1;

        const chartAreaSize = obj.layout.orientation === 'horizontal' ? this.rect.height : this.rect.width;

        obj._calcBandwidth(chartAreaSize, this.chart);
        obj._calcPointMaxSize(showPoints ? obj._getPointScale() : 1, obj._bandwidthPx);

        let jitterExpansion = 0;

        if (obj._jitter) {
          obj._calcPointSize(obj._pointMaxSizePx, obj._bandwidthPx);
          jitterExpansion = obj._pointSize * obj._bandwidthPx * CONSTANTS.JITTER_PARAMETER;
        }

        const maxWidthPx = obj._pointMaxSizePx + jitterExpansion + CONSTANTS.BOX_PADDING * 2;
        const width = maxWidthPx / obj._bandwidthPx;

        this.settings.settings.box.maxWidthPx = Math.min(obj._bandwidthPx - 2, maxWidthPx);
        this.settings.settings.box.width = width;
      },
      brush: {
        trigger: brushTrigger,
        consume: brushConsume,
      },
      data: {
        extract: {
          field: 'qDimensionInfo/0',
          trackBy() {
            return -1; // In 1 dimension case, we only want to draw one box
          },
          props: {
            start: { field: startField, reduce: 'min' },
            end: { field: endField, reduce: 'max' },
            elemNo: { field: 'qDimensionInfo/0' },
          },
        },
      },
    };

    if (hypercubeUtil.hasSecondDimension(layout, DATA_PATH)) {
      boxSettings.data.extract.field = 'qDimensionInfo/0';
      boxSettings.data.extract.trackBy = function (cell) {
        return cell.qElemNo; // Here we want to draw one box per outer dimension value
      };
      boxSettings.settings.major = { scale: 'dimension' };
    }

    return boxSettings;
  },

  _getPointMarkerSettings(layout, selectionSettings, tooltipSettings) {
    const pointFillColor = this.theme.getColorPickerColor(layout.color.point.paletteColor);
    const pointStroke = chartStyleUtils.getContrastingTransparent(pointFillColor);
    let strokeWidth = 1; // For old objects - without the dataPoint.border property

    if (layout.dataPoint && layout.dataPoint.border === false) {
      strokeWidth = 0;
    }

    const brushTrigger = getSelectionSettingsArray(selectionSettings.trigger);
    const brushConsume = getSelectionSettingsArray(selectionSettings.consume);
    if (this.hasOption('tooltips') && false) {
      brushTrigger.push(tooltipSettings.point.trigger);
      brushConsume.push.apply(brushConsume, tooltipSettings.point.consume);
    }
    const obj = this;

    const pointMarkerSettings = {
      require: ['chart'],
      displayOrder: 1100,
      settings: {
        chart: this,
        fill(d) {
          return d.datum.innerElemNo.value === -3 || d.datum.elemNo.value === -3
            ? chartStyleUtils.Theme.dataColors.othersColor
            : pointFillColor;
        },
        stroke: pointStroke,
        size: 0.3,
        strokeWidth,
        sizeLimits: {
          maxRelExtent: 10, // need to override default in order to allow the maximum size of the points to be much higher
          maxPx: CONSTANTS.MAX_POINT_BASE_SIZE_PX,
          minPx: CONSTANTS.MIN_POINT_PIXELS,
        },
        orientation: layout.orientation,
      },
      beforeRender() {
        const chartAreaSize = obj.layout.orientation === 'horizontal' ? this.rect.height : this.rect.width;
        obj._calcBandwidth(chartAreaSize, this.chart);
        obj._calcPointMaxSize(obj._getPointScale(), obj._bandwidthPx);
        obj._calcPointSize(obj._pointMaxSizePx, obj._bandwidthPx);
        if (obj._jitter) {
          const boxPaddingRelative = (CONSTANTS.BOX_PADDING * 2) / chartAreaSize;
          obj._jitterTool.calcMaxJitter(
            obj._pointSize * obj._bandwidthRatio,
            CONSTANTS.JITTER_PARAMETER,
            obj._bandwidthRatio - boxPaddingRelative
          );
        }
        this.settings.settings.sizeLimits.maxPx = obj._pointMaxSizePx;
        this.settings.settings.size = obj._pointSize;
      },
      brush: {
        trigger: brushTrigger,
        consume: brushConsume,
      },
      data: {
        extract: {
          field: 'qDimensionInfo/0',
          props: {
            innerElemNo: { field: 'qDimensionInfo/0' },
            elemNo: { field: 'qDimensionInfo/0' },
            inner: {
              field: 'qDimensionInfo/0',
              value(v) {
                return v;
              },
            },
            row: {
              field: 'qDimensionInfo/0',
              value(v) {
                return v.qRow;
              },
            },
            measure: {
              field: 'qMeasureInfo/0',
              reduce: 'first',
              value(v) {
                return v;
              },
              reduceLabel: 'none',
            },
          },
        },
      },
    };

    if (hypercubeUtil.hasSecondDimension(layout, DATA_PATH)) {
      pointMarkerSettings.data.extract.props.inner.field = 'qDimensionInfo/1';
      pointMarkerSettings.data.extract.props.innerElemNo.field = 'qDimensionInfo/1';
      pointMarkerSettings.data.extract.props.row.field = 'qDimensionInfo/1';
      pointMarkerSettings.data.extract.field = 'qDimensionInfo/1';
      pointMarkerSettings.data.extract.props.outer = {
        field: 'qDimensionInfo/0',
        value(v) {
          return v;
        },
      };
    }

    if (!layout.color.point.auto && layout.color.point.mode === 'byExpression') {
      const colorSource = 'qMeasureInfo/0/qAttrExprInfo/0';
      pointMarkerSettings.data.extract.props.pointColorNumeric = {
        field: colorSource,
        reduce: 'first',
        value(v) {
          if (typeof v.qNum === 'number') {
            return Color.retriveColor(v.qNum, 'argb').toRGBA();
          }
          return Color.retriveColor(chartStyleUtils.Theme.dataColors.nullColor).toRGBA();
        },
      };
      pointMarkerSettings.data.extract.props.pointColorString = {
        field: colorSource,
        reduce: 'first',
        value(v) {
          return v && v.qText;
        },
      };
      pointMarkerSettings.settings.fill = function (d) {
        if (typeof d.datum.pointColorString.value === 'string') {
          const color = Color.retriveColor(d.datum.pointColorString.value);
          if (!color.isInvalid()) {
            return color.toRGBA();
          }
        }
        return d.datum.pointColorNumeric.value;
      };
    }

    this.setDataPaths([`${DATA_PATH}/${HYPERCUBE_PATH}`]);
    if (!layout.color.point.auto && layout.color.point.mode === 'byDimension') {
      let colorField;
      if (layout[DATA_PATH].legendData) {
        const dimIndex = hypercubeUtil.hasSecondDimension(layout, DATA_PATH) ? 1 : 0;
        const attrDimInfo = layout[DATA_PATH][HYPERCUBE_PATH].qDimensionInfo[dimIndex].qAttrDimInfo[0];
        if (!attrDimInfo.qError) {
          colorField = `qDimensionInfo/${dimIndex}/qAttrDimInfo/0`;
          pointMarkerSettings.data.extract.props.colorElemNo = { field: colorField };
          pointMarkerSettings.data.extract.props.colorByDim = {
            field: colorField,
            value(v) {
              return v;
            },
          };
          this.chartInstance
            .brush('select-color')
            .addKeyAlias(`${DATA_PATH}/legendData/qDimensionInfo/0`, `${DATA_PATH}/${HYPERCUBE_PATH}/${colorField}`);
          this.setDataPaths([`${DATA_PATH}/${HYPERCUBE_PATH}`, `${DATA_PATH}/legendData`]);
        }
      } else {
        const colorDataInfo = this.getColoringMap().getColorDataInfo();
        if (colorDataInfo.valid && !colorDataInfo.altMode) {
          colorField = `qDimensionInfo/${colorDataInfo.dimIndex}`;
          pointMarkerSettings.data.extract.props.colorElemNo = { field: colorField };
          pointMarkerSettings.data.extract.props.colorByDim = {
            field: colorField,
            value(v) {
              return v;
            },
          };
        }
      }
    }

    const measureDirection = layout.orientation !== 'horizontal' ? 'y' : 'x';

    const getFillColor = function (data) {
      const id = [data.elemNo.value, data.innerElemNo.value];
      const measureIdx = 0;
      const value = data[measureDirection].value;
      const rowIndex = data.row.value;
      return obj.getColoringMap().getColor(id, value, measureIdx, rowIndex);
    };

    pointMarkerSettings.settings.fill = function (d) {
      return undefined;
      // eslint-disable-next-line no-unreachable
      return getFillColor(d.datum).toRGBA();
    };
    pointMarkerSettings.settings.stroke = function (d) {
      return undefined;
      // eslint-disable-next-line no-unreachable
      const fill = getFillColor(d.datum);
      return chartStyleUtils.getContrastingTransparent(fill);
    };

    // TODO: This code should be enabled when data limitation problem for stacked hyper cube is fixed(QLIK-80557)
    /*
        if( hypercubeUtil.hasSecondMeasure( layout, DATA_PATH ) ) {
            pointMarkerSettings.settings.size = { scale: { source: '/' + HYPERCUBE_PATH + '/qMeasureInfo/1', ref: 'size' } };
            pointMarkerSettings.settings.sizeLimits.maxRelDiscrete = pointSizeOverBandwidth;
            pointMarkerSettings.data.mapTo.size = { source: '/' + HYPERCUBE_PATH + '/qMeasureInfo/1' };
        }
        */

    return pointMarkerSettings;
  },

  _getPointSelectionLayerSettings(pointMarkerSettings) {
    const pointSelectionLayerSettings = extend(true, {}, pointMarkerSettings, {
      key: 'selection-point-marker',
      settings: {
        opacity: 0,
      },
    });
    pointSelectionLayerSettings.brush.consume.pop();
    pointSelectionLayerSettings.brush.consume.forEach((consume) => {
      consume.style.inactive = undefined;
      consume.style.active.opacity = 1;
    });
    pointSelectionLayerSettings.brush.trigger = [];
    return pointSelectionLayerSettings;
  },

  _getLegendData(selectionSettings) {
    return undefined;
    // eslint-disable-next-line no-unreachable
    const colorMap = this.getColoringMap();
    const colorDataInfo = colorMap.getColorDataInfo();
    let source;
    let dimIndex;
    if (colorDataInfo.altMode) {
      source = `${DATA_PATH}/legendData`;
      dimIndex = 0;
    } else {
      source = `${DATA_PATH}/${HYPERCUBE_PATH}`;
      dimIndex = colorDataInfo.dimIndex;
    }

    return legendUtils.getLegendData({
      colorMap,
      legendData: this.layout[DATA_PATH].legendData && this.layout[DATA_PATH].legendData.qDataPages[0].qMatrix,
      selectionSettings,
      dimIndex,
      source,
      translator: this.translator,
    });
  },

  createChartSettings(layout) {
    const isRtl = this.options.direction === 'rtl';
    const hasVisibleComponentsProps = layout.presentation && layout.presentation.visibleComponents;
    const showPoints = hasVisibleComponentsProps && layout.presentation.visibleComponents.indexOf('point') !== -1;
    const showBox = hasVisibleComponentsProps && layout.presentation.visibleComponents.indexOf('box') !== -1;
    this._jitter = showPoints && layout.dataPoint && layout.dataPoint.displacement === 'jitter';

    const hyperCube = layout[DATA_PATH][HYPERCUBE_PATH];
    const dimInfo = hyperCube.qDimensionInfo;

    const measureDirection = layout.orientation !== 'horizontal' ? 'y' : 'x';
    const dimensionDirection = layout.orientation !== 'horizontal' ? 'x' : 'y';

    const chartBuilder = ChartBuilder.create({
      chartID: CONSTANTS.CHART_ID,
      theme: this.theme,
      // layoutMode: this.getLayoutMode(layout),
      isRtl,
    });

    if (hyperCube.qStackedDataPages[0].qData.length === 0) {
      return chartBuilder.getSettings();
    }

    let dimAxisSelectionSettings = {};
    let boxSelectionSettings = {};
    let pointSelectionSettings = {};
    let legendSelectionSettings = {};
    if (this.hasOption('selections')) {
      const allowSelectBoxes = !showPoints && hypercubeUtil.hasSecondDimension(layout, DATA_PATH);

      this._selectionHandler.setUpStart();
      const innerSelectionSettings = this._selectionHandler.setUpBrush(
        {
          contexts: ['select-inner'],
          data: ['innerElemNo'],
          isSingleSelect: isSingleSelect(layout, 0),
        },
        true
      );
      const outerSelectionSettings = this._selectionHandler.setUpBrush(
        {
          contexts: ['select-outer'],
          data: ['elemNo'],
          isSingleSelect: isSingleSelect(layout, 1),
        },
        true
      );
      const colorSelectionSettings = this._selectionHandler.setUpBrush(
        {
          dataPath: DATA_PATH,
          contexts: ['select-color'],
          data: ['colorElemNo'],
          startOnEmptySelection: false,
        },
        true
      );
      const measureSelectionSettings = this._selectionHandler.setUpBrush(
        {
          contexts: ['select-measure'],
          data: [measureDirection],
        },
        true
      );
      this._selectionHandler.setUpDone();

      dimAxisSelectionSettings = {
        trigger: extend(true, {}, outerSelectionSettings.trigger, { data: [''] }),
        consume: [extend(true, {}, outerSelectionSettings.consume, { data: [''] })],
      };
      boxSelectionSettings = {
        trigger: allowSelectBoxes ? outerSelectionSettings.trigger : null,
        consume: [innerSelectionSettings.consume, outerSelectionSettings.consume, measureSelectionSettings.consume],
      };
      pointSelectionSettings = {
        trigger: innerSelectionSettings.trigger,
        consume: [
          innerSelectionSettings.consume,
          outerSelectionSettings.consume,
          measureSelectionSettings.consume,
          colorSelectionSettings.consume,
        ],
      };
      legendSelectionSettings = {
        trigger: [extend(true, {}, colorSelectionSettings.trigger, { data: [''] })],
        consume: [
          extend(true, {}, colorSelectionSettings.consume, { data: [''] }),
          innerSelectionSettings.consume,
          outerSelectionSettings.consume,
        ],
      };
    }
    const tooltipSettings = { point: {}, box: {} };
    const self = this;
    if (this.hasOption('tooltips')) {
      tooltipSettings.point = this._tooltipHandler.setUp({
        data: hypercubeUtil.hasSecondDimension(layout, DATA_PATH) ? ['innerElemNo', 'elemNo'] : ['innerElemNo'],
        contexts: ['pointTip'],
        componentKey: 'point-marker',
        direction: this.options.direction,
        chartView: self,
        attrDimPath: `/${HYPERCUBE_PATH}/qDimensionInfo/${
          hypercubeUtil.hasSecondDimension(layout, DATA_PATH) ? 1 : 0
        }/qAttrDimInfo/0`,
        measureRows: ['measure'], // Should be a mapped path under extract, mandatory to display tooltip
        labelData: hypercubeUtil.hasSecondDimension(layout, DATA_PATH) ? ['inner', 'outer'] : ['inner'], // Should be a mapped path under extract, mandatory to display tooltip
      });
    }

    const lockedDims = getLockedDims(layout);
    const isInnerDimSingleSelect = isSingleSelect(layout, 0);
    const isOuterDimSingleSelect = isSingleSelect(layout, 1);
    const rangeSelStatus = retrieveRangeSelStatus(lockedDims, isInnerDimSingleSelect, isOuterDimSingleSelect);
    const handlers = {
      scrollHandler: this.hasOption('navigation') && this._scrollHandler,
      selectionHandler: this.hasOption('selections') && this._selectionHandler,
    };
    const keys = {
      componentKey: showPoints ? 'point-marker' : 'box-marker',
      lassoBrushKey: 'select-inner',
      dimRangeBrushKey: 'select-outer',
      measureRangeBrushKey: 'select-measure',
      areaBrushKey: null,
      legendBrushKey: 'legend',
    };

    if (this._dependentActions) {
      this._dependentActions.destroy();
    }
    this._dependentActions = DependentInteractions.create(handlers, layout.orientation, isRtl, keys, rangeSelStatus);

    chartBuilder.addPreset('dimension-measure-chart', {
      // common
      isRtl,
      includeDimensionAxis: hypercubeUtil.hasSecondDimension(layout, DATA_PATH),
      orientation: layout.orientation,
      selectionsEnabled: this.hasOption('selections'),

      // measure scale
      measureSource: ['qMeasureInfo/0'],

      // dimension scale
      dimensionSource: 'qDimensionInfo/0',

      // measure axis and title
      measureAxisProperties: layout.measureAxis, // used by both
      measureTitleText: hyperCube.qMeasureInfo[0].qFallbackTitle,

      // dimension axis and title
      dimensionAxisProperties: layout.dimensionAxis, // used by both
      dimensionAxisSettings: this._getDimAxisSettings(layout, dimAxisSelectionSettings),
      dimensionTitleText: (dimInfo && dimInfo[0] && dimInfo[0].qFallbackTitle) || '',

      // grid lines
      gridlines: layout.gridlines,

      // scroll
      hasNavigation: this.hasOption('navigation'),

      isNavigationEnabledFn: () => this._scrollHandler.isOn(),
      scrollSettings:
        this.hasOption('navigation') && getPicassoScrollSettings(layout, this._scrollHandler.getScrollViewSizeInItem()),

      // Lasso
      enableLasso: true,
      lasso: {
        brushKey: showPoints ? 'select-inner' : 'select-outer',
        brushComponents: showPoints ? ['point-marker'] : ['box-marker'],
        brushData: showPoints ? ['innerElemNo'] : ['elemNo'],
      },

      // Dim range
      enableDimRange: true,
      dimRange: {
        brushKey: 'select-outer',
        brushAxis: layout.orientation === 'horizontal' ? 'y-axis' : 'x-axis',
        brushArea: showBox ? 'box-marker' : 'point-marker',
        brushScale: 'dimension',
      },

      // Measure range
      enableMeasureRange: showPoints,
      measureRange: {
        brushKey: 'select-measure',
        brushAxis: layout.orientation === 'horizontal' ? 'x-axis' : 'y-axis',
        brushArea: showPoints ? 'point-marker' : 'box-marker',
        brushScale: 'measure',
        multiple: true,
      },

      brushActions: this._dependentActions.gestures,

      // ref-lines
      refLines: layout.refLine && layout.refLine.refLines,
    });

    // Box marker
    if (showBox) {
      const boxMarkerSettings = this._getBoxMarkerSettings(layout, boxSelectionSettings);
      chartBuilder.addComponent('box-marker', boxMarkerSettings);
    }

    // Point marker
    if (showPoints) {
      const pointMarkerSettings = this._getPointMarkerSettings(layout, pointSelectionSettings, tooltipSettings);
      pointMarkerSettings.data.extract.props[measureDirection] = { field: 'qMeasureInfo/0' };
      pointMarkerSettings.settings[measureDirection] = { scale: 'measure' };
      if (hypercubeUtil.hasSecondDimension(layout, DATA_PATH)) {
        pointMarkerSettings.data.extract.props[dimensionDirection] = { field: 'qDimensionInfo/0', type: 'qual' };
        pointMarkerSettings.settings[dimensionDirection] = { scale: 'dimension' };
      }

      if (this._jitter) {
        pointMarkerSettings.settings[dimensionDirection] = pointMarkerSettings.settings[dimensionDirection] || {};

        const jitterTool = this._jitterTool;

        pointMarkerSettings.settings[dimensionDirection].fn = function (d) {
          let basePosition;
          if (typeof d.scale === 'function') {
            // No scale when there is only one dimension
            basePosition = d.scale(d.datum[dimensionDirection].value) + d.scale.bandwidth() * 0.5;
          } else {
            basePosition = 0.5;
          }

          return basePosition + jitterTool.getJitterValue(d.datum.value, CONSTANTS.JITTER_PARAMETER);
        };
      }

      chartBuilder.addComponent('point-marker', pointMarkerSettings);
      chartBuilder.addComponent('point-marker', this._getPointSelectionLayerSettings(pointMarkerSettings));

      const showLegend = layout.legend
        ? layout.legend.show !== false
        : !layout.color.point.auto && layout.color.point.mode === 'byDimension'; // For old apps without layout.legend
      if (showLegend) {
        this.addLegend(chartBuilder, layout.legend, isRtl, legendSelectionSettings);
      }
    }

    // Add snapshot settings
    const settings = chartBuilder.getSettings();
    this.addSnapshotChartSettings(settings, layout);

    return settings;
  },

  /**
   * Configure and add a legend to Picasso's chart config
   * @param chartBuilder {ChartBuilder}
   * @param legend {Object} A pointer to layout.legend
   * @param isRtl {Boolean}
   * @returns {void}
   */
  addLegend(chartBuilder, legend, isRtl, legendSelectionSettings) {
    const legendData = this._getLegendData(legendSelectionSettings);
    if (legendData) {
      const legendOptions = {
        dock: legend ? legend.dock : 'auto',
        chartWidth: this.picassoElement.clientWidth,
        chartHeight: this.picassoElement.clientHeight,
        show: !legend || legend.show !== false,
        showTitle: !legend || legend.showTitle !== false,
        type: 'circle',
        tableMode: true,
      };
      const catLeg = chartBuilder.addComponent(legendData.type, legendData.settings, legendOptions);
      const orientation = catLeg.dock; // Needed to find out how the legend is actually docked when in auto mode

      // Add interactions (pan, press ) for categorical color legend
      if (this.hasOption('navigation') && this.isOn()) {
        const isHorizontal = orientation === 'top' || orientation === 'bottom';
        const legendGestures = legendUtils.getCategoricalLegendPanGesture('legend', isHorizontal, isRtl);
        const settings = chartBuilder.getSettings();
        if (!settings.interactions || !settings.interactions.length || !settings.interactions[0].gestures) {
          chartBuilder.addInteraction({}, { gestures: legendGestures });
        } else {
          settings.interactions[0].gestures = settings.interactions[0].gestures.concat(legendGestures);
        }
      }
    }
  },

  resize($element, layout) {
    if (!this.layout) {
      return;
    }
    updateOnScrollViewChanged.call(this);
    this._super($element, layout);
  },

  hasValidData() {
    const layout = this.layout;
    return (
      layout[DATA_PATH] &&
      layout[DATA_PATH][HYPERCUBE_PATH] &&
      layout[DATA_PATH][HYPERCUBE_PATH].qStackedDataPages.length &&
      layout[DATA_PATH][HYPERCUBE_PATH].qStackedDataPages[0].qData
    );
  },

  paint($element) {
    if (!this.backendApi.isSnapshot && !this.options.viewState) {
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

    if (!this.hasValidData()) {
      // Data not fetched yet - wait for next paint
      return Promise.resolve();
    }

    const self = this;
    const _super = this._super;
    if (
      !this.backendApi.isSnapshot &&
      hypercubeUtil.hasSecondDimension(layout, DATA_PATH) &&
      this._scrollHandler.isDataSizeChanged(
        getValue(layout, `${DATA_PATH}.${HYPERCUBE_PATH}.qStackedDataPages.0.qData.0.qSubNodes.length`),
        hypercubeUtil.getOuterDimensionSizeOfMax2Dims(layout, DATA_PATH)
      )
    ) {
      return this._scrollHandler
        .getViewData()
        .finally(() => self._updateColorMapData(layout).then(() => _super.call(self, $element /* , layout */)));
    }
    return this._updateColorMapData(layout).then(() => _super.call(self, $element /* , layout */));
  },

  setSnapshotData(snapshotLayout) {
    this._super(snapshotLayout);
    const snapshotChartData = snapshotLayout.snapshotData.content.chartData;
    const colorMapSnapshotData = this.getColoringMap().getSnapshotChartData();
    colorMapSnapshotData.forEach((obj) => {
      snapshotChartData[obj.key] = obj.data;
    });
    snapshotLayout[DATA_PATH][HYPERCUBE_PATH].qStackedDataPages = this.layout[DATA_PATH][
      HYPERCUBE_PATH
    ].qStackedDataPages;
    snapshotLayout[DATA_PATH].legendData = this.layout[DATA_PATH].legendData;
    columnOrderAdapter.toBefore(snapshotLayout);
    return Promise.resolve(snapshotLayout);
  },
  getViewState() {
    return {
      scroll: Math.round(this._scrollHandler.getScrollState()),
    };
  },

  getDisclaimerAttributes(layout) {
    const showDisclaimer = this.flags.isEnabled('SHOW_DISCLAIMER') ? !(layout.showDisclaimer === false) : true;
    const scrollSettings =
      this.hasOption('navigation') && getPicassoScrollSettings(layout, this._scrollHandler.getScrollViewSizeInItem());
    let explicitLimitedData;
    if (showDisclaimer && !hypercubeUtil.hasSecondDimension(layout, DATA_PATH) && layout.qHyperCube.qSize.qcy > 10000) {
      explicitLimitedData = true;
    }
    return {
      data: layout && layout.qUndoExclude,
      supportedDisclaimers: {
        LimitedData: showDisclaimer && explicitLimitedData,
      },
      options: {
        paddingBottom: explicitLimitedData && scrollSettings && scrollSettings.viewSize < scrollSettings.max,
        supportNegative: true,
        explicitLimitedData,
      },
    };
  },

  _updateColorMapData(layout) {
    // TODO: fix color map
    return Promise.resolve();

    // eslint-disable-next-line no-unreachable
    const pointColor = extend({ mode: 'primary', auto: false }, layout.color.point);
    const data = {
      color: extend(true, {}, pointColor),
      visualization: layout.visualization,
      qHyperCube: layout.qUndoExclude.qHyperCube,
    };
    if (hypercubeUtil.hasSecondDimension(this.layout, DATA_PATH) && DimensionColorUtil.isByNthDimension(data.color)) {
      // change 0 -> & 1 -> 0 to match reordering in generated hypercube
      data.color.byDimDef.activeDimensionIndex = 1 - data.color.byDimDef.activeDimensionIndex;
    }

    // TODO: update color map
    // const cube = layout.qUndoExclude.qHyperCube;
    // const tree = ChartDataHelper.prepareData(
    //   cube.qStackedDataPages[0].qData,
    //   cube.qMeasureInfo,
    //   cube.qDimensionInfo,
    //   layout
    // ).dimensionTree;
    // this.getColoringMap().setDimensionTree(tree);

    // eslint-disable-next-line consistent-return
    return this.setColorMapData(data, layout.visualization);
  },
  _createColorLegendCube(dataPages) {
    const dimIndex = hypercubeUtil.hasSecondDimension(this.layout, DATA_PATH) ? 1 : 0;
    const attrDimInfo = this.layout[DATA_PATH][HYPERCUBE_PATH].qDimensionInfo[dimIndex].qAttrDimInfo[0];
    return {
      qDimensionInfo: [attrDimInfo],
      qMeasureInfo: [],
      qDataPages: dataPages,
      qMode: 'S',
      qSize: {
        qcx: 1,
        qcy: dataPages[0].qMatrix.length,
      },
    };
  },
  _updateColorData() {
    const self = this;
    return self._updateColorMapData(this.layout).then(() => {
      const colorDataInfo = self.getColoringMap().getColorDataInfo();
      if (colorDataInfo && colorDataInfo.legendPath) {
        const legendPath = `/${DATA_PATH}${colorDataInfo.legendPath}`;
        return self.backendApi.getData(colorDataInfo.legendPages, legendPath).then((dataPages) => {
          self.layout[DATA_PATH].legendData = self._createColorLegendCube(dataPages);
        });
      }
      self.layout[DATA_PATH].legendData = null;
      return undefined;
    });
  },

  updateDerivedProperties(properties, layout) {
    const self = this;
    const model = self.backendApi.model;

    return self._derivedProperties
      .addDefaultHyperCubeHash(properties.qHyperCubeDef, layout.qHyperCube, model.app, getHashData(properties))
      .then((hashData) => {
        const derivedSettings = {
          layout,
          properties,
          model,
          hashData,
          generateDerivedProperties(layout, properties) {
            return distributionPlotCubeGenerator.generateHyperCube(layout, properties, model.app);
          },
        };

        return self._derivedProperties.updateDerivedProperties(derivedSettings);
      });
  },

  updateData(layout) {
    const self = this;

    return self._super(layout).then(() => {
      if (self._destroyed) {
        return Promise.reject();
      }
      layout = self.layout; // eslint-disable-line no-param-reassign

      self._scrollHandler.setOptions({ direction: layout.orientation === 'horizontal' ? 'vertical' : 'horizontal' }); // the scroll orientation is inverted to the chart orientation

      if (self.backendApi.isSnapshot) {
        columnOrderAdapter.toAfter(layout);

        self.getColoringMap().setSnapshotChartData(layout.snapshotData.content.chartData);
        return self._updateColorMapData(layout);
      }
      self.updateScrollHandlerState(true); // No need to run it in snapshot mode
      if (self.options.viewState) {
        self._scrollHandler.updateViewState(getDataSize(layout));
        self._scrollHandler.setScrollState(self.options.viewState.scroll);
      } else {
        self._scrollHandler.resetScroll();
        resetCategoricalLegendScroll.call(self);
      }

      if (self._scrollHandler.getScrollViewSizeInItem() && !self._cacheSizeInitialized) {
        updateCacheSize.call(self);
        self._cacheSizeInitialized = true;
      }

      let promise;
      if (hypercubeUtil.hasSecondDimension(layout, DATA_PATH)) {
        promise = self.getSlicedData(
          self._scrollHandler.getScrollState(),
          self._scrollHandler.getScrollViewSizeInItem()
        );
      } else {
        promise = self.getData(self.backendApi, layout[DATA_PATH][HYPERCUBE_PATH], {
          height: layout[DATA_PATH][HYPERCUBE_PATH].qSize.qcy || 1,
        });
      }
      return promise.then(() => {
        if (self._destroyed) {
          return Promise.reject();
        }
        return undefined;
        // TODO: fix
        // return self._updateColorData();
      });
    });
  },

  isLassoDisabled() {
    const layout = this.layout;
    const isInnerDimSingleSelect = !!(
      layout.qHyperCube.qDimensionInfo &&
      layout.qHyperCube.qDimensionInfo.length > 1 &&
      isSingleSelect(layout, 0)
    );

    return isInnerDimSingleSelect;
  },
});

export default DistributionPlot;
