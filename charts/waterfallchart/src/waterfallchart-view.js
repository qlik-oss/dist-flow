import ChartView from '@qlik/common/picasso/chart-view';
import ChartBuilder from '@qlik/common/picasso/chart-builder/chart-builder';
import Color from '@qlik/common/extra/color';
import ScrollHandler from '@qlik/common/picasso/scroll/scroll-handler';
import DependentInteractions from '@qlik/common/picasso/selections/dependent-interactions';
import TooltipHandler from '@qlik/common/picasso/tooltip/tooltips-handler';
import formatting from '@qlik/common/picasso/formatting';
import stringUtil from '@qlik/common/extra/string-util';
import { getAxisLabelStyle, getLegendLabelStyle, getValueLabelStyle } from '@qlik/common/extra/chart-style-component';
import { themeService as createThemeService } from 'qlik-chart-modules';
import CubeGenerator from './waterfallchart-cube-generator-by-measures';
import waterfallUtils from './waterfallchart-utils';
import tickGenerator from './waterfallchart-tick-generator';

const chartID = waterfallUtils.chartID;
const MAX_GLYPH_COUNT = 20;
const BAR_WIDTH_RATIO = 0.7;

//
// Implementation details
//

function init({ picasso, environment, $element, flags }) {
  const backendApi = null;
  const selectionsApi = null;
  this._super(picasso, $element, environment, backendApi, selectionsApi);
  this._tooltipHandler = TooltipHandler.create(this.chartInstance, $element, chartID);
  this._scrollHandler = new ScrollHandler(
    this.chartInstance,
    $element,
    this.getSlicedData.bind(this),
    this.updateChart.bind(this)
  );
  this._scrollHandler.setOptions({ direction: 'horizontal' });
  this.setDataPaths(['generated/qHyperCube']);
  this.flags = flags;
}

function getSlicedData(top, height) {
  CubeGenerator.generateSlicedHyperCube(this.layout, top, height);
  return Promise.resolve(this.layout);
}

function setSnapshotData(snapshotLayout) {
  this._super(snapshotLayout);
  snapshotLayout.generated = this.layout.generated; // eslint-disable-line no-param-reassign
  snapshotLayout.generatedMatrix = this.layout.generatedMatrix; // eslint-disable-line no-param-reassign
}
function getViewState() {
  return {
    scroll: this._scrollHandler.getScrollState(),
  };
}

function updateScrollHandlerState(b) {
  this._scrollHandler.setDisabled(!!b);
}

function updateConstraints(constraints) {
  const navigation = !constraints.active;
  const tooltip = !constraints.passive;

  this._scrollHandler[navigation ? 'on' : 'off']();
  this._tooltipHandler[tooltip ? 'on' : 'off']();
}
function off() {
  this._scrollHandler.off();
  this._tooltipHandler.off();
}

function getMaxGlyphCountForDimAxis(layout) {
  let glyphCount = -Number.MAX_VALUE;
  layout.qHyperCube.qMeasureInfo.forEach((measureInfo) => {
    glyphCount = Math.max(glyphCount, measureInfo.qFallbackTitle.length);
    if (
      measureInfo.valueType !== waterfallUtils.valueTypes.SUBTOTAL &&
      measureInfo.subtotal &&
      measureInfo.subtotal.enable
    ) {
      glyphCount = Math.max(glyphCount, measureInfo.subtotal.label ? measureInfo.subtotal.label.length : 0);
    }
  });
  return Math.min(MAX_GLYPH_COUNT, Math.max(0, glyphCount));
}

function getDimAxisSettings(layout) {
  return {
    settings: {
      labels: {
        mode: layout.dimensionAxis.label,
        maxGlyphCount: Math.ceil(stringUtil.stringWidthOverMWidth(getMaxGlyphCountForDimAxis(layout))), // To mitigate SUI-1445
        maxLengthPx: this.picassoElement.getBoundingClientRect().height / 4, // Picasso version 0.5.3 does not support function here
      },
    },
  };
}

function getBarSettings(tooltipSettings, layout) {
  const brushTrigger = tooltipSettings ? [tooltipSettings.box.trigger] : [];
  const brushConsume = tooltipSettings ? tooltipSettings.box.consume : [];
  return {
    data: {
      extract: {
        key: 'qHyperCube',
        field: CubeGenerator.getGeneratedDimensionPath(0),
        props: {
          start: { field: CubeGenerator.getGeneratedMeasurePath(0) },
          end: { field: CubeGenerator.getGeneratedMeasurePath(1) },
          measure: {
            field: CubeGenerator.getGeneratedMeasurePath(2),
            reduce: 'first',
            value(v) {
              return v;
            },
          },
          boxColor: {
            field: CubeGenerator.getGeneratedDimensionPath(1),
            value(v) {
              return v.qText;
            },
          },
          isCustomFormatted: !!layout.qDef.isCustomFormatted,
          tooltip: {
            value(v) {
              return v;
            },
          },
        },
      },
    },
    settings: {
      major: { scale: 'dimension' },
      minor: { scale: 'measure' },
      orientation: '', // There is a bug in Picasso where it uses height instead of width when the orientation is vertical.
      box: {
        width: BAR_WIDTH_RATIO,
        maxWidthPx: 4000,
        fill(d) {
          return d.datum.boxColor.value;
        },
        strokeWidth: 0,
      },
    },
    brush: {
      trigger: brushTrigger,
      consume: brushConsume,
    },
  };
}

function getLabel(context) {
  const measure = context.data.measure;
  const field = context.dataset(measure.source.key).field(measure.source.field);
  return formatting.formatMeasureValue(field, measure);
}

function getBarLabelSettings(themeService, layout) {
  const styles = themeService.getStyles();
  const valueLabelSettings = getValueLabelStyle(chartID, styles, layout);
  const outsideValueColor = valueLabelSettings?.fill || styles.label.value.color;
  const darkColor = styles.label.value.darkColor;
  const lightColor = styles.label.value.lightColor;
  const getContrastColor = () => (ctx) => (Color.isDark(ctx.node.attrs.fill) ? lightColor : darkColor);
  return {
    settings: {
      sources: [
        {
          strategy: {
            settings: {
              ...valueLabelSettings,
              direction(context) {
                return context.data && context.data.end.value > context.data.start.value ? 'up' : 'down';
              },
              labels: [
                {
                  placements: [
                    { fill: outsideValueColor },
                    {
                      fill: valueLabelSettings?.fill ? outsideValueColor : getContrastColor(),
                    },
                    {
                      position: 'opposite',
                      fill: outsideValueColor,
                      justify: 0,
                    },
                  ],
                  label: getLabel,
                },
              ],
            },
          },
        },
      ],
    },
  };
}

function getPicassoScrollSettings(layout, viewSize) {
  return {
    viewSize,
    max: layout.generatedMatrix.length,
  };
}

function getBridgeSettings(isRtl, theme) {
  const bridgeColor = theme.getStyle(chartID, 'shape.bridge', 'stroke');
  return {
    data: {
      extract: {
        key: 'qHyperCube',
        field: CubeGenerator.getGeneratedDimensionPath(0),
        props: {
          x: {},
          y: {
            field: CubeGenerator.getGeneratedMeasurePath(1),
          },
        },
      },
    },
    settings: {
      x: {
        scale: 'dimension',
        ref: 'x',
        fn(d) {
          return isRtl ? d.scale(d.datum.value) : d.scale(d.datum.value) + d.scale.bandwidth(); // place the point between two bars
        },
      },
      y: { scale: 'measure' },
      sizeLimits: {
        maxPx: 20000,
        maxRelExtent: 10000,
        minRelDiscrete: 0,
        maxRelDiscrete: 1,
      },
      shape: 'line',
      stroke: bridgeColor,
      size: 1 - BAR_WIDTH_RATIO,
      strokeDasharray: '4 4',
      fill: 'none',
      strokeWidth(d, i) {
        return i === d.data.items.length - 1 ? 0 : 2;
      },
    },
  };
}

function getLegendSettings(environment, layout, flags) {
  const { theme, translator } = environment;
  const positveColor = waterfallUtils.getColorForPositiveValue(layout, theme);
  const negativeColor = waterfallUtils.getColorForNegativeValue(layout, theme);
  const subtotalColor = waterfallUtils.getColorForSubtotal(layout, theme);
  const positiveText = translator.get('waterfall.legend.positiveValue.label');
  const negativeText = translator.get('waterfall.legend.negativeValue.label');
  const subtotalText = translator.get('waterfall.legend.subtotal.label');
  const labelStyleSettings = getLegendLabelStyle(chartID, theme, layout, flags);

  return {
    displayOrder: 200,
    minimumLayoutMode: 'MEDIUM',
    prioOrder: 0,
    scale: {
      type: 'categorical-color',
      data: [positiveText, negativeText, subtotalText],
      range: [positveColor, negativeColor, subtotalColor],
    },
    style: {
      item: {
        label: {
          fontSize: labelStyleSettings.fontSize,
          fontFamily: labelStyleSettings.fontFamily,
          fill: labelStyleSettings.color,
        },
      },
      title: {
        show: false,
      },
    },
  };
}

function createChartSettings(layout) {
  // Create components
  const isRtl = this.isRtl();
  const { theme } = this.environment;
  const isSnapshot = !!layout.snapshotData;
  const chartBuilder = ChartBuilder.create({
    chartID,
    theme,
    isRtl,
    flags: this.flags,
  });
  const width = this.picassoElement.clientWidth;
  const height = this.picassoElement.clientHeight;
  const tooltipSettings = {};
  tooltipSettings.box = this._tooltipHandler.setUp({
    chartBuilder,
    environment: this.environment,
    data: [''],
    contexts: ['boxTip'],
    componentKey: 'box-marker',
    headerResolver() {
      return undefined; // Waterfall does not have dimension
    },
    rowResolver(field, measureContent, shapeData) {
      const color = shapeData.boxColor.value;
      const value = formatting.formatMeasureValue(field, measureContent);
      return {
        value,
        label: shapeData.tooltip.value.qText,
        color,
      };
    },
    labelData: ['tooltip'], // Should be a mapped path under extract, mandatory to display tooltip
    measureRows: ['measure'], // Should be a mapped path under extract, mandatory to display tooltip
  });

  const handlers = {
    scrollHandler: this._scrollHandler,
    selectionHandler: null,
  };

  const keys = {
    componentKey: 'box-marker',
  };

  if (this._dependentActions) {
    this._dependentActions.destroy();
  }
  this._dependentActions = DependentInteractions.create(handlers, 'vertical', isRtl, keys);

  chartBuilder.addPreset('dimension-measure-chart', {
    // common
    isRtl,
    orientation: 'vertical',
    theme,

    // grid lines
    gridlines: layout.gridlines,

    // dimension axis and title
    includeDimensionAxis: true,
    dimensionAxisProperties: layout.dimensionAxis,
    dimensionAxisSettings: getDimAxisSettings.call(this, layout),
    dimensionSource: CubeGenerator.getGeneratedDimensionPath(0),
    dimensionScaleSettings: {
      component: {
        maxPxStep() {
          return height / 4;
        },
      },
    },

    // measure axis and title
    includeMeasureAxis: true,
    measureAxisProperties: layout.measureAxis,
    // measureTitleText: "",
    measureSource: [CubeGenerator.getGeneratedMeasurePath(0), CubeGenerator.getGeneratedMeasurePath(1)],
    measureScaleSettings: {
      component: {
        expand: 0,
        include: [0], // Make sure that the measure axis starts from 0.
        ticks: {
          values: () => tickGenerator.getTicks({ layout, height }),
        },
      },
    },

    // scroll
    hasNavigation: !isSnapshot,
    isNavigationEnabledFn: () => this._scrollHandler.isOn(),
    scrollSettings: getPicassoScrollSettings(layout, this._scrollHandler.getScrollViewSizeInItem()),

    // ref-lines
    refLines: layout.refLine && layout.refLine.refLines,

    brushActions: this._dependentActions.gestures,
    axisLabelStyle: getAxisLabelStyle(chartID, theme, layout),
  });

  chartBuilder.addComponent('box-marker', getBarSettings(tooltipSettings, layout));
  chartBuilder.addComponent('point-marker', getBridgeSettings(isRtl, theme));

  if (!layout.legend || layout.legend.show) {
    chartBuilder.addComponent('categorical-legend', getLegendSettings(this.environment, layout, this.flags), {
      dock: layout.legend ? layout.legend.dock : 'auto',
      isRtl,
      chartWidth: width,
      chartHeight: height,
    });
  }

  const themeService = createThemeService({
    theme,
    config: {
      id: 'waterfallChart',
    },
  });
  if (layout.dataPoint.showLabels) {
    chartBuilder.addComponent('labels', getBarLabelSettings(themeService, layout));
  }

  // Add snapshot settings
  const settings = chartBuilder.getSettings();
  this.addSnapshotChartSettings(settings, layout);

  return settings;
}

function updateData(layout) {
  const { theme, options } = this.environment;
  const self = this;

  return this._super(layout).then(() => {
    if (self._destroyed) {
      return Promise.reject();
    }

    let top;
    let height;

    const isSnapshot = !!layout.snapshotData;
    if (isSnapshot) {
      const area = self.layout.generated.qHyperCube.qDataPages[0].qArea; // To fix SUI-4307
      top = area.qTop;
      height = area.qHeight;
      CubeGenerator.generateHyperCube(self.layout, theme);
    } else {
      CubeGenerator.generateHyperCube(self.layout, theme);
      updateScrollHandlerState.call(self, true); // No need to run it in snapshot mode
      const { viewState } = options;
      if (viewState) {
        self._scrollHandler.updateViewState(self.layout.generatedMatrix.length);
        self._scrollHandler.setScrollState(viewState.scroll);
        top = viewState.scroll;
      } else {
        self._scrollHandler.resetScroll();
        top = 0;
      }
      height = self._scrollHandler.getScrollViewSizeInItem();
    }
    CubeGenerator.generateSlicedHyperCube(self.layout, top, height);
    return undefined;
  });
}

function updateOnScrollViewChanged(chart) {
  chart._scrollHandler.onResize();
}

function resize() {
  updateOnScrollViewChanged(this);
  this._super();
}

function paint() {
  const isSnapshot = !!this.layout.snapshotData;
  if (!isSnapshot && !this.environment.options.viewState) {
    updateScrollHandlerState.call(this, false);
  }
  this._tooltipHandler.closeTooltip();

  const pageNumberOfRows = this.layout.generated.qHyperCube.qDataPages[0].qMatrix.length;
  const datasetNumberOfRows = this.layout.generatedMatrix.length;
  if (!isSnapshot && this._scrollHandler.isDataSizeChanged(pageNumberOfRows, datasetNumberOfRows)) {
    const _super = this._super;
    const self = this;
    return this._scrollHandler.getViewData().finally(() => _super.call(self));
  }
  return this._super();
}

const waterfallChartView = ChartView.extend('WaterfallChart', {
  namespace: '.waterfallchart',
  chartID,
  init,
  updateConstraints,
  off,
  createChartSettings,
  updateData,
  resize,
  paint,
  getSlicedData,
  setSnapshotData,
  getViewState,
});

export default waterfallChartView;
