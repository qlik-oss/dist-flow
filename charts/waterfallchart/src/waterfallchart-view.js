import ChartView from '@qlik/common/picasso/chart-view';
import ChartBuilder from '@qlik/common/picasso/chart-builder/chart-builder';
import chartStyleUtils from '@qlik/common/extra/chart-style-utils';
import ScrollHandler from '@qlik/common/picasso/scroll/scroll-handler';
import DependentInteractions from '@qlik/common/picasso/selections/dependent-interactions';
// import TooltipHandler from '@qlik/common/picasso/tooltip/tooltips-handler';
import formatting from '@qlik/common/picasso/formatting';
import stringUtil from '@qlik/common/extra/string-util';
import CubeGenerator from './waterfallchart-cube-generator-by-measures';
import waterfallUtils from './waterfallchart-utils';

const chartID = waterfallUtils.chartID;
const MAX_GLYPH_COUNT = 20;
const BAR_WIDTH_RATIO = 0.7;

//
// Implementation details
//

function init(picasso, translator, theme, $scope, $element, options, backendApi, selectionsApi, tooltipApi) {
  this._super(picasso, $scope, $element, options, backendApi, selectionsApi, tooltipApi);
  this.translator = translator;
  this.theme = theme;
  if (this.hasOption('tooltips')) {
    // TODO: fix tooltip
    // this._tooltipHandler = TooltipHandler.create(this.chartInstance, tooltipApi, $element, chartID);
    this._tooltipHandler = { on: () => {}, off: () => {}, setUp: () => {}, closeTooltip: () => {} };
  }
  this._scrollHandler = new ScrollHandler(
    this.chartInstance,
    $element,
    $element[0],
    this.getSlicedData.bind(this),
    tooltipApi,
    this.updateChart.bind(this)
  );
  this._scrollHandler.setOptions({ direction: 'horizontal' });
  this.setDataPaths(['generated/qHyperCube']);
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
  this._scrollHandler.setDisabled(!this.hasOption('navigation') || !!b);
}

function on() {
  this._super();
  if (this.hasOption('tooltips')) {
    this._tooltipHandler.on();
  }
  if (this.hasOption('navigation')) {
    this._scrollHandler.on();
  }
}

function off() {
  this._super();
  if (this.hasOption('tooltips')) {
    this._tooltipHandler.off();
  }
  if (this.hasOption('navigation')) {
    this._scrollHandler.off();
  }
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

function getInsideValueColor(boxColor, darkColor, lightColor) {
  return chartStyleUtils.getBestContrast(boxColor, darkColor, lightColor);
}

function getLabel(context) {
  const measure = context.data.measure;
  const field = context.dataset(measure.source.key).field(measure.source.field);
  return formatting.formatMeasureValue(field, measure);
}

function getBarLabelSettings(theme) {
  const outsideValueColor = theme.getStyle(chartID, 'value.color', 'default');
  const darkColor = theme.getStyle(chartID, 'value.color', 'dark');
  const lightColor = theme.getStyle(chartID, 'value.color', 'light');
  return {
    settings: {
      sources: [
        {
          strategy: {
            settings: {
              direction(context) {
                return context.data && context.data.end.value > context.data.start.value ? 'up' : 'down';
              },
              labels: [
                {
                  placements: [
                    { fill: outsideValueColor },
                    {
                      fill(s) {
                        return getInsideValueColor(s.data.boxColor.value, darkColor, lightColor);
                      },
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

function getLegendSettings(translator, layout, theme) {
  const positveColor = waterfallUtils.getColorForPositiveValue(layout, theme);
  const negativeColor = waterfallUtils.getColorForNegativeValue(layout, theme);
  const subtotalColor = waterfallUtils.getColorForSubtotal(layout, theme);
  const positiveText = translator.get('waterfall.legend.positiveValue.label');
  const negativeText = translator.get('waterfall.legend.negativeValue.label');
  const subtotalText = translator.get('waterfall.legend.subtotal.label');
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
      title: {
        show: false,
      },
    },
  };
}

function createChartSettings(layout) {
  // Create components
  const isRtl = this.options && this.options.direction === 'rtl';
  const chartBuilder = ChartBuilder.create({
    chartID,
    theme: this.theme,
    // layoutMode: this.getLayoutMode(layout),
  });
  let tooltipSettings;
  const width = this.picassoElement.clientWidth;
  const height = this.picassoElement.clientHeight;

  // TODO: fix tooltip
  if (this.hasOption('tooltips') && false) {
    tooltipSettings = { box: {} };
    tooltipSettings.box = this._tooltipHandler.setUp({
      data: [''],
      contexts: ['boxTip'],
      componentKey: 'box-marker',
      direction: this.options.direction,
      headerResolver() {
        return undefined; // Waterfall does not have dimension
      },
      rowResolver(field, measureContent, shapeData) {
        const color = shapeData.boxColor.value;
        const value = formatting.formatMeasureValue(field, measureContent);
        return {
          value,
          label: shapeData.tooltip.value.qText,
          template: `<div class="color-template-wrapper"><div class="color-dot" style="background:${color}"></div><span dir="ltr">${value}</span></div>`,
        };
      },
      labelData: ['tooltip'], // Should be a mapped path under extract, mandatory to display tooltip
      measureRows: ['measure'], // Should be a mapped path under extract, mandatory to display tooltip
    });
  }

  const handlers = {
    scrollHandler: this.hasOption('navigation') && this._scrollHandler,
    selectionHandler: null,
  };

  const keys = {
    componentKey: 'box-marker',
  };

  if (this._dependentActions) {
    this._dependentActions.destroy();
  }
  this._dependentActions = DependentInteractions.create(handlers, this.isOn.bind(this), 'vertical', isRtl, keys);

  chartBuilder.addPreset('dimension-measure-chart', {
    // common
    isRtl,
    orientation: 'vertical',

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
      },
    },

    // scroll
    hasNavigation: this.hasOption('navigation'),
    isNavigationEnabledFn: this.isOn.bind(this),
    scrollSettings:
      this.hasOption('navigation') && getPicassoScrollSettings(layout, this._scrollHandler.getScrollViewSizeInItem()),

    // ref-lines
    refLines: layout.refLine && layout.refLine.refLines,

    brushActions: this._dependentActions.gestures,
  });

  chartBuilder.addComponent('box-marker', getBarSettings(tooltipSettings, layout));
  chartBuilder.addComponent('point-marker', getBridgeSettings(isRtl, this.theme));

  if (!layout.legend || layout.legend.show) {
    chartBuilder.addComponent('categorical-legend', getLegendSettings(this.translator, layout, this.theme), {
      dock: layout.legend ? layout.legend.dock : 'auto',
      isRtl,
      chartWidth: width,
      chartHeight: height,
    });
  }

  if (layout.dataPoint.showLabels) {
    chartBuilder.addComponent('labels', getBarLabelSettings(this.theme));
  }

  // Add snapshot settings
  const settings = chartBuilder.getSettings();
  this.addSnapshotChartSettings(settings, layout);

  return settings;
}

function updateData(layout) {
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
      CubeGenerator.generateHyperCube(self.layout, self.theme);
    } else {
      CubeGenerator.generateHyperCube(self.layout, self.theme);
      updateScrollHandlerState.call(self, true); // No need to run it in snapshot mode
      if (self.options.viewState) {
        self._scrollHandler.updateViewState(self.layout.generatedMatrix.length);
        self._scrollHandler.setScrollState(self.options.viewState.scroll);
        top = self.options.viewState.scroll;
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

function resize($element, layout) {
  updateOnScrollViewChanged(this);
  this._super($element, layout);
}

function paint($element) {
  const isSnapshot = !!this.layout.snapshotData;
  if (!isSnapshot && !this.options.viewState) {
    updateScrollHandlerState.call(this, false);
  }
  if (this.hasOption('tooltips') && this._tooltipHandler) {
    this._tooltipHandler.closeTooltip();
  }

  const pageNumberOfRows = this.layout.generated.qHyperCube.qDataPages[0].qMatrix.length;
  const datasetNumberOfRows = this.layout.generatedMatrix.length;
  if (!isSnapshot && this._scrollHandler.isDataSizeChanged(pageNumberOfRows, datasetNumberOfRows)) {
    const _super = this._super;
    const self = this;
    return this._scrollHandler.getViewData().finally(() => _super.call(self, $element));
  }
  return this._super($element);
}

const waterfallChartView = ChartView.extend('WaterfallChart', {
  namespace: '.waterfallchart',
  chartID,
  defaultOptions: {
    navigation: false,
    selections: false,
    tooltips: true,
  },
  init,
  on,
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
