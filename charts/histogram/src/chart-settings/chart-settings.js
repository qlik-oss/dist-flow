import { getValue, themeService as createThemeService } from 'qlik-chart-modules';
import ChartBuilder from '@qlik/common/picasso/chart-builder/chart-builder';
import DependentInteractions from '@qlik/common/picasso/selections/dependent-interactions';
import { getAxisLabelStyle, getAxisTitleStyle } from '@qlik/common/extra/chart-style-component';
import DimensionAxis from './dimension-axis';
import DimensionScale from './dimension-scale';
import BoxMarker from './box-marker';
import Label from './label';
// import propertyResolver from '../../../../assets/client/utils/property-resolver';

const chartID = 'object.histogram';

//
// Implementation details
//

/**
 * Checks whether the dimension is locked or not
 * @param layout - layout for histogram
 * @returns {boolean} - true is the dimension is locked, otherwise false
 */
function getLockedDim(layout) {
  const dimInfos =
    layout.qUndoExclude &&
    layout.qUndoExclude.box &&
    layout.qUndoExclude.box.qHyperCube &&
    layout.qUndoExclude.box.qHyperCube.qDimensionInfo
      ? layout.qUndoExclude.box.qHyperCube.qDimensionInfo
      : undefined;
  if (!dimInfos) {
    return false;
  }
  return !!dimInfos[0].qLocked;
}

/**
 * Disables/Enables measure- dimension range selection depending if the field is locked or not.
 * In this case, as soon as the current class function is locked, then both measure and dimension
 * range selection is locked down
 * @param lockedDim - boolean determining if the dimension is locked down
 * @returns {object} that gives the status of measure and dimension range selection
 */
function retrieveRangeSelStatus(lockedDim) {
  const rangeSelStatus = {};
  if (lockedDim) {
    rangeSelStatus.isOpenDim = false;
    rangeSelStatus.isOpenMea = false;
  } else {
    rangeSelStatus.isOpenDim = true;
    rangeSelStatus.isOpenMea = true;
  }
  return rangeSelStatus;
}

function isSingleSelect(layout) {
  return getValue(layout, 'qHyperCube.qDimensionInfo.0.qIsOneAndOnlyOne', false);
}

function createChartSettings(chartView, layout) {
  const isRtl = chartView.isRtl();
  const orgDimInfo = getValue(layout, 'qHyperCube.qDimensionInfo.0', {});
  const dimTitle = orgDimInfo.qFallbackTitle || '';
  const { theme, translator } = chartView.environment;
  // Create components
  const chartBuilder = ChartBuilder.create({
    chartID,
    theme,
    isRtl,
    flags: chartView.flags,
  });
  const themeService = createThemeService({
    theme,
    config: {
      id: 'histogram',
    },
  });

  let basicSelectionSettings = {};
  let dimensionSelectionSettings = {};
  let measureSelectionSettings = {};
  if (chartView._selectionHandler.isOn()) {
    chartView._selectionHandler.setUpStart();

    basicSelectionSettings = chartView._selectionHandler.setUpBrush({
      contexts: ['select'],
      data: ['elemNo'],
      dataPath: 'qUndoExclude/box',
    });

    dimensionSelectionSettings = chartView._selectionHandler.setUpBrush({
      contexts: ['select-dimension'],
      data: ['elemNo'],
      dataPath: 'qUndoExclude/box',
      isSingleSelect: isSingleSelect(layout),
    });

    measureSelectionSettings = chartView._selectionHandler.setUpBrush({
      dataPath: 'qUndoExclude/box',
      contexts: ['select-measure'],
      data: ['end'],
    });

    chartView._selectionHandler.setUpDone();
  }

  const tooltipSettings = { box: {} };
  if (chartView._tooltipHandler.isOn()) {
    tooltipSettings.box = chartView._tooltipHandler.setUp({
      chartBuilder,
      environment: chartView.environment,
      data: [''],
      contexts: ['boxTip'],
      componentKey: 'box-marker',
      measureRows: ['measure'], // Should be a mapped path under extract, mandatory to display tooltip
      labelData: ['bin'], // Should be a mapped path under extract, mandatory to display tooltip
    });
  }

  const lockedDims = getLockedDim(layout);
  const rangeSelStatus = retrieveRangeSelStatus(lockedDims);

  const handlers = {
    scrollHandler: null,
    selectionHandler: chartView._selectionHandler,
  };

  const keys = {
    componentKey: 'box-marker',
    lassoBrushKey: 'select',
    dimRangeBrushKey: null,
    measureRangeBrushKey: 'select-measure',
    areaBrushKey: 'select-dimension',
  };

  if (this._dependentActions) {
    this._dependentActions.destroy();
  }
  this._dependentActions = DependentInteractions.create(handlers, 'vertical', isRtl, keys, rangeSelStatus);

  chartBuilder.addPreset('dimension-measure-chart', {
    // common
    isRtl,
    includeDimensionAxis: true,
    orientation: 'vertical',
    selectionsEnabled: chartView._selectionHandler.isOn(),
    theme,

    // measure scale
    measureSource: 'qMeasureInfo/0',
    measureScaleSettings: {
      component: {
        expand: 0,
        include: [0], // Make sure that the measure axis starts from 0.
      },
    },

    // Lasso
    enableLasso: true,
    lasso: {
      brushKey: 'select',
      brushComponents: ['box-marker'],
    },

    // Mea range selection
    enableMeasureRange: true,
    measureRange: {
      brushKey: 'select-measure',
      brushAxis: 'y-axis',
      brushArea: 'box-marker',
      brushScale: 'measure',
    },

    // Area range selection
    enableAreaRange: true,
    areaRange: {
      brushKey: 'select-dimension',
      brushAxis: 'x-axis',
      brushData: ['elemNo'],
      brushArea: 'box-marker',
      brushScale: 'rangeSelSettings',
      brushComponents: ['box-marker'],
      multiple: true,
      chartInstance: chartView.chartInstance,
    },
    brushActions: this._dependentActions.gestures,

    dimensionSource: 'qDimensionInfo/0',
    dimensionScaleSettings: DimensionScale.createSettings(layout),

    // measure axis and title
    measureAxisProperties: layout.measureAxis, // used by both
    measureTitleText: layout.measureAxis.label || translator.get('Visualization.Histogram.MeasureAxisLabel'),

    // dimension axis and title
    dimensionAxisProperties: layout.dimensionAxis, // used by both
    dimensionAxisSettings: DimensionAxis.createSettings(layout),
    dimensionTitleText: dimTitle,

    // grid lines
    gridlines: layout.gridlines,

    // scroll
    hasNavigation: false,
    isNavigationEnabledFn: () => false,

    // ref-lines
    refLines: layout.refLine && layout.refLine.refLines,
    axisTitleStyle: getAxisTitleStyle(chartID, theme, layout),
    axisLabelStyle: getAxisLabelStyle(chartID, theme, layout),
  });

  const settings = chartBuilder.getSettings();

  // Box marker
  const boxMarkerSettings = BoxMarker.createSettings(
    chartView,
    layout,
    basicSelectionSettings,
    dimensionSelectionSettings,
    measureSelectionSettings,
    tooltipSettings
  );
  chartBuilder.addComponent('box-marker', boxMarkerSettings);

  if (layout.dataPoint && layout.dataPoint.showLabels) {
    const binLabelSettings = Label.createSettings(layout, themeService, chartID);
    chartBuilder.addComponent('labels', binLabelSettings);
  }

  // Add snapshot settings
  chartView.addSnapshotChartSettings(settings, layout);

  // max: layout.qHyperCube.qDimensionInfo[0].qMax + binSize,
  settings.scales.rangeSelSettings = {
    type: 'linear',
    min: settings.scales.dimension.min,
    max: settings.scales.dimension.max,
    source: 'qDimensionInfo/0',
  };

  return settings;
}

const ChartSettings = {
  createChartSettings,
};

export default ChartSettings;
