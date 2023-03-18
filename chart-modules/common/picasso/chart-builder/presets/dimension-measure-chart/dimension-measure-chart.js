import extend from 'extend';
import generateId from '../../../../extra/generate-id';
import getScrollActions from '../../../scroll/scroll-actions';
import axisDockUtil from '../../components/util/axis-dock-util';
import refLineUtil from '../../components/util/ref-line-util';
import CONSTANTS from './constants';

const SENSE_PICASSO_SPACING_COEFFICIENT = 100;

function DimensionMeasureChart(chartBuilder, opts) {
  const options = opts || {};

  const measureAxisProperties = options.measureAxisProperties || {};
  const dimensionAxisProperties = options.dimensionAxisProperties || {};
  const chartOrientation = options.orientation || CONSTANTS.DEFAULT_CHART_ORIENTATION;
  const isChartHorizontal = chartOrientation === CONSTANTS.HORIZONTAL;
  const measureDirection = isChartHorizontal ? 'x' : 'y';
  const dimensionDirection = isChartHorizontal ? 'y' : 'x';
  const SHOW_AXIS_LABELS_OPTIONS = CONSTANTS.SHOW_AXIS_LABELS_OPTIONS;
  const SHOW_TITLE_OPTIONS = CONSTANTS.SHOW_TITLE_OPTIONS;
  const includeMeasureAxisComponent = SHOW_AXIS_LABELS_OPTIONS.includes(measureAxisProperties.show);
  const includeMeasureAxisTitleComponent =
    !!options.measureTitleText && SHOW_TITLE_OPTIONS.includes(measureAxisProperties.show);
  const includeDimensionAxisComponent =
    options.includeDimensionAxis && SHOW_AXIS_LABELS_OPTIONS.includes(dimensionAxisProperties.show);
  const includeDimensionAxisTitleComponent =
    options.includeDimensionAxis &&
    !!options.dimensionTitleText &&
    SHOW_TITLE_OPTIONS.includes(dimensionAxisProperties.show);
  const includeGridlines = options.gridlines && !(!options.gridlines.auto && options.gridlines.spacing === 0);

  const includeRefLines = options.refLines && options.refLines.some((refLine) => refLine.show);

  const interactionActions = [];

  if (includeMeasureAxisComponent) {
    addMeasureAxisComponent(chartBuilder, options, measureDirection, measureAxisProperties);
  }

  if (includeMeasureAxisTitleComponent) {
    addMeasureAxisTitleComponent(chartBuilder, options, measureDirection);
  }

  addMeasureScale(chartBuilder, options, chartOrientation, measureAxisProperties);

  if (includeDimensionAxisComponent) {
    addDimensionAxisComponent(chartBuilder, options, dimensionDirection);
  }

  if (includeDimensionAxisTitleComponent) {
    addDimensionAxisTitleComponent(chartBuilder, options, dimensionDirection);
  }

  if (options.includeDimensionAxis) {
    addDimensionScale(chartBuilder, options, chartOrientation);
  }

  if (includeGridlines) {
    addGridlinesComponent(chartBuilder, options.gridlines, measureDirection);
  }

  if (options.hasNavigation) {
    addScrollbarComponent(chartBuilder, interactionActions, options, isChartHorizontal);
  }

  if (includeRefLines) {
    addRefLineComponent(chartBuilder, options, measureDirection, measureAxisProperties);
  }

  if (options.enableLasso && options.selectionsEnabled) {
    const lassoOptions = options.lasso || {};
    addLassoComponent(chartBuilder, lassoOptions);
  }

  if (options.enableDimRange && options.includeDimensionAxis && options.selectionsEnabled) {
    const rangeDimOptions = options.dimRange || {};
    const dimensionAxisOptions = getDimensionAxisOptions(options, dimensionDirection);
    addRangeDimComponent(chartBuilder, rangeDimOptions, isChartHorizontal, dimensionAxisOptions.dock, options.isRtl);
  }

  if (options.enableMeasureRange && options.selectionsEnabled) {
    const rangeMeasureOptions = options.measureRange || {};
    const measureAxisOptions = getMeasureAxisOptions(options, measureDirection);
    addRangeMeasureComponent(
      chartBuilder,
      rangeMeasureOptions,
      isChartHorizontal,
      measureAxisOptions.dock,
      options.isRtl
    );
  }

  if (options.enableAreaRange && options.selectionsEnabled) {
    const areaDimOptions = options.areaRange || {};
    const dimAreaAxisOptions = getDimensionAxisOptions(options, dimensionDirection);
    addRangeAreaComponent(chartBuilder, areaDimOptions, isChartHorizontal, dimAreaAxisOptions.dock, options.isRtl);
  }

  if (options.brushActions) {
    addInteractionActions(interactionActions, options.brushActions);
  }

  if (interactionActions.length) {
    addInteractionComponent(chartBuilder, interactionActions);
  }
}

export default DimensionMeasureChart;

function addInteractionComponent(chartBuilder, interactionActions) {
  return chartBuilder.addInteraction({}, { gestures: interactionActions });
}

function addInteractionActions(interactionActions, actions) {
  actions.forEach((a) => {
    interactionActions.push(a);
  });
}

function addMeasureScale(chartBuilder, options, chartOrientation, measureAxisProperties) {
  let measureScaleSettings = options.measureScaleSettings;

  const measureScaleOptions = {
    isRtl: options.isRtl,
    source: options.measureSource,
    orientation: chartOrientation,
    measureAxisProperties,
  };

  if (measureAxisProperties && measureAxisProperties.spacing > 0) {
    measureScaleSettings = extend(true, measureScaleSettings || {}, {
      component: {
        ticks: {
          distance: measureAxisProperties.spacing * SENSE_PICASSO_SPACING_COEFFICIENT,
        },
      },
    });
  }

  chartBuilder.addScale('measure-scale', measureScaleSettings, measureScaleOptions);
}

function addMeasureAxisComponent(chartBuilder, options, measureDirection, measureAxisProperties) {
  let measureAxisSettings = {
    scale: 'measure',
    settings: options.axisLabelStyle || {},
    forceBounds: measureAxisProperties && !measureAxisProperties.autoMinMax && measureAxisProperties.showBounds,
  };
  measureAxisSettings = extend(measureAxisSettings, CONSTANTS.LAYOUTSETTINGS.measureAxis);

  const measureAxisOptions = getMeasureAxisOptions(options, measureDirection);

  chartBuilder.addComponent(`${measureDirection}-axis`, measureAxisSettings, measureAxisOptions);
}

function addMeasureAxisTitleComponent(chartBuilder, options, measureDirection) {
  let measureTitleSettings = {
    text: options.measureTitleText,
    style: options.axisTitleStyle || {},
  };
  measureTitleSettings = extend(measureTitleSettings, CONSTANTS.LAYOUTSETTINGS.measureAxisTitle);

  const measureAxisOptions = getMeasureAxisTitleOptions(options, measureDirection);

  chartBuilder.addComponent(`${measureDirection}-axis-title`, measureTitleSettings, measureAxisOptions);
}

function addDimensionScale(chartBuilder, options, chartOrientation) {
  const dimensionScaleOptions = {
    isRtl: options.isRtl,
    source: options.dimensionSource,
    orientation: chartOrientation === CONSTANTS.HORIZONTAL ? CONSTANTS.VERTICAL : CONSTANTS.HORIZONTAL,
  };

  chartBuilder.addScale('dimension-scale', options.dimensionScaleSettings, dimensionScaleOptions);
}

function addDimensionAxisComponent(chartBuilder, options, dimensionDirection) {
  let dimensionAxisSettings = {
    scale: 'dimension',
    settings: options.axisLabelStyle || {},
  };
  dimensionAxisSettings = extend(dimensionAxisSettings, CONSTANTS.LAYOUTSETTINGS.dimensionAxis);

  const dimensionAxisOptions = getDimensionAxisOptions(options, dimensionDirection);

  extend(true, dimensionAxisSettings, options.dimensionAxisSettings || {});

  chartBuilder.addComponent(`${dimensionDirection}-axis`, dimensionAxisSettings, dimensionAxisOptions);
}

function addDimensionAxisTitleComponent(chartBuilder, options, dimensionDirection) {
  let dimensionAxisTitleSettings = {
    text: options.dimensionTitleText,
    style: options.axisTitleStyle || {},
  };
  dimensionAxisTitleSettings = extend(dimensionAxisTitleSettings, CONSTANTS.LAYOUTSETTINGS.dimensionAxisTitle);

  const dimensionAxisTitleOptions = getDimensionAxisTitleOptions(options, dimensionDirection);

  chartBuilder.addComponent(`${dimensionDirection}-axis-title`, dimensionAxisTitleSettings, dimensionAxisTitleOptions);
}

function addGridlinesComponent(chartBuilder, gridlinesOptions, measureDirection) {
  let gridlinesSettings = {
    ticks: {
      show: true,
    },
    minorTicks: {
      show: !gridlinesOptions.auto && !gridlinesOptions.auto && gridlinesOptions.spacing === 3,
    },
  };
  gridlinesSettings = extend(gridlinesSettings, CONSTANTS.LAYOUTSETTINGS.gridLines);

  gridlinesSettings[measureDirection] = { scale: 'measure' };

  chartBuilder.addComponent('grid-line', gridlinesSettings);
}

function addScrollbarComponent(chartBuilder, interactionActions, options, isChartHorizontal) {
  const settings = chartBuilder.getSettings();

  settings.scroll = {
    dimension: {
      viewSize: (options.scrollSettings && options.scrollSettings.viewSize) || 0,
      max: (options.scrollSettings && options.scrollSettings.max) || 0,
    },
  };

  const scrollbarOptions = {
    isRtl: options.isRtl,
    chartID: options.chartID,
    isHorizontal: !isChartHorizontal,
  };

  const scrollBarSettings = extend({}, CONSTANTS.LAYOUTSETTINGS.scrollBar);

  chartBuilder.addComponent('scrollbar', scrollBarSettings, scrollbarOptions);

  addInteractionActions(interactionActions, getScrollActions(options.isNavigationEnabledFn));
}

/*
 * Add "ref-line" component(s). Currently two "ref-line" components are used to reserve space for labels and
 * OOB markers outside of the data area. First component: shows the line(s) within the data area. Second component:
 * shows the label(s) and OOB marker(s).
 */
function addRefLineComponent(chartBuilder, options, measureDirection, measureAxisProperties) {
  const axisDock = axisDockUtil.getAxisDock(measureDirection, measureAxisProperties.dock, options.isRtl);
  let refLinesSettings = {
    // First component
    key: 'ref-line',
    style: {
      oob: {
        show: false,
      },
    },
    lines: {
      x: [],
      y: [],
    },
  };
  refLinesSettings = extend(refLinesSettings, CONSTANTS.LAYOUTSETTINGS.refLines);

  let refLinesLabelsSettings = {
    // Second component
    // Use a unique key to force re-render of this component in Picasso.
    // This must be done because Picasso does not allow re-binding of functions (and shouldn't either).
    key: `ref-line-labels-${generateId()}`,
    require: ['renderer', 'chart'],
    dock: axisDockUtil.getOppositeAxisDock(measureDirection, measureAxisProperties.dock, options.isRtl),
    preferredSize() {
      if (measureDirection === 'x') {
        // Use constant component size if horizontal
        return 26;
      }

      // Adapt component size to the longest label if vertical
      const measureText = this.renderer.measureText;
      const formatter = this.chart.formatter({ data: chartBuilder.settings.scales.measure.data });
      const labelWidths = refLinesLabelsSettings.lines.y.map((line) => {
        const formattedValue = line.label.showValue !== false ? `(${formatter(line.value)})` : '';
        const text = `${line.label.text} ${formattedValue}`;
        const minimumText = line.label.text && formattedValue ? `  ${formattedValue}` : formattedValue;
        return {
          wanted: measureText({
            text,
            fontSize: line.fontSize,
            fontFamily: line.fontFamily,
          }).width,
          required: measureText({
            text: minimumText,
            fontSize: line.fontSize,
            fontFamily: line.fontFamily,
          }).width,
        };
      });

      const maxLabelWidth = labelWidths[0];
      for (let i = 1; i < labelWidths.length; i++) {
        if (labelWidths[i].wanted > maxLabelWidth.wanted) {
          maxLabelWidth.wanted = labelWidths[i].wanted;
        }
        if (labelWidths[i].required > maxLabelWidth.required) {
          maxLabelWidth.required = labelWidths[i].required;
        }
      }
      const labelPadding = 12;
      if (maxLabelWidth.required + labelPadding > 100) {
        return maxLabelWidth.required + labelPadding; // Always have space for the value
      }
      return Math.min(maxLabelWidth.wanted + labelPadding, 100); // Limit to 100 px width
    },
    lines: {
      x: [],
      y: [],
    },
  };
  refLinesLabelsSettings = extend(refLinesLabelsSettings, CONSTANTS.LAYOUTSETTINGS.refLinesLabels);

  options.refLines.forEach((refLine) => {
    if (!refLine.show) {
      return;
    }

    const expressionValue = refLine.refLineExpr && refLine.refLineExpr.value;
    const lineOptions = extend(true, {}, options, {
      paletteColor: refLine.paletteColor,
      style: refLine.style,
      chartID: chartBuilder.options.chartID,
    });

    // Add a line for each visible ref line
    const lineSettings = refLineUtil.lineSettings(
      {
        scale: 'measure',
        dir: measureDirection,
        value: expressionValue,
      },
      lineOptions
    );

    refLinesSettings.lines[measureDirection].push(lineSettings);

    // Add a label and an OOB marker for each visible ref line (using the second component)
    const lineLabelSettings = refLineUtil.lineLabelSettings(
      {
        scale: 'measure',
        value: expressionValue,
        label: {
          text: refLine.showLabel !== false ? refLine.label : '',
          showValue: refLine.showValue !== false,
        },
      },
      lineOptions
    );

    if (measureDirection === 'x') {
      lineLabelSettings.label.vAlign = axisDock === 'near' ? 1 : 0;
    } else {
      // y
      lineLabelSettings.label.align = axisDock === 'near' ? 0 : 1;
    }

    refLinesLabelsSettings.lines[measureDirection].push(lineLabelSettings);
  });

  chartBuilder.addComponent('ref-line', refLinesSettings, {});
  chartBuilder.addComponent('ref-line', refLinesLabelsSettings, {});
}

/**
 * Adds a lasso component to the chart builder
 * @param {ChartBuilder} chartBuilder
 * @param {object} options - lasso options
 * @param {string} options.brushKey - key used as context for lasso selection triggers
 * @param {string} options.brushComponent - target component key
 */
function addLassoComponent(chartBuilder, options) {
  const lassoOptions = {
    brushKey: options.brushKey,
    brushComponents: options.brushComponents,
    brushData: options.brushData,
  };

  chartBuilder.addComponent('lasso', CONSTANTS.LAYOUTSETTINGS.lasso, lassoOptions);
}
/**
 * Adds a dimension range component to the chart builder
 * @param {any} chartBuilder
 * @param {object} options - range dim options
 * @param {string} options.brushKey - key used as context for range selection triggers
 * @param {string} options.brushAxis - target axis to perform range select on
 * @param {string} options.brushScale - Scale to use
 * @param {boolean} isChartHorizontal - Whether the chart is horizontal or not
 */
function addRangeDimComponent(chartBuilder, options, isChartHorizontal, dock, isRtl) {
  let rangeDimSettings = {
    key: 'rangeDim',
  };

  rangeDimSettings = extend(rangeDimSettings, CONSTANTS.LAYOUTSETTINGS.rangeDim);

  const rangeDimOptions = {
    brushKey: options.brushKey,
    brushAxis: options.brushAxis,
    brushArea: options.brushArea,
    brushScale: options.brushScale,
    isHorizontal: !isChartHorizontal,
    dock,
    isRtl,
  };

  chartBuilder.addComponent('range', rangeDimSettings, rangeDimOptions);
}

function addRangeMeasureComponent(chartBuilder, options, isChartHorizontal, dock, isRtl) {
  let rangeMeasureSettings = {
    key: 'rangeMeasure',
  };

  rangeMeasureSettings = extend(rangeMeasureSettings, CONSTANTS.LAYOUTSETTINGS.rangeMeasure);

  const rangeMeasureOptions = {
    brushKey: options.brushKey,
    brushAxis: options.brushAxis,
    brushArea: options.brushArea,
    brushScale: options.brushScale,
    multiple: options.multiple,
    isHorizontal: isChartHorizontal,
    dock,
    isRtl,
  };

  chartBuilder.addComponent('range', rangeMeasureSettings, rangeMeasureOptions);
}

function addRangeAreaComponent(chartBuilder, options, isChartHorizontal, dock, isRtl) {
  let rangeMinorSettings = {
    key: 'rangeMinor',
  };

  rangeMinorSettings = extend(rangeMinorSettings, CONSTANTS.LAYOUTSETTINGS.rangeMinor);

  const rangeMeasureOptions = {
    brushKey: options.brushKey,
    brushAxis: options.brushAxis,
    brushData: options.brushData,
    brushArea: options.brushArea,
    brushComponents: options.brushComponents,
    brushScale: options.brushScale,
    multiple: options.multiple,
    isHorizontal: options.brushScale === 'measure' ? isChartHorizontal : !isChartHorizontal,
    dock,
    isRtl,
    chartInstance: options.chartInstance,
  };

  chartBuilder.addComponent('range-area', rangeMinorSettings, rangeMeasureOptions);
}

function getMeasureAxisOptions(options, measureDirection) {
  return {
    dock: options.measureAxisProperties && options.measureAxisProperties.dock,
    direction: measureDirection,
    isRtl: options.isRtl,
  };
}

function getMeasureAxisTitleOptions(options, measureDirection) {
  return getMeasureAxisOptions(options, measureDirection);
}

function getDimensionAxisOptions(options, dimensionDirection) {
  return {
    dock: options.dimensionAxisProperties && options.dimensionAxisProperties.dock,
    direction: dimensionDirection,
    isRtl: options.isRtl,
  };
}

function getDimensionAxisTitleOptions(options, dimensionDirection) {
  return getDimensionAxisOptions(options, dimensionDirection);
}
