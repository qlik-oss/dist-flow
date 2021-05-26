import DimensionMeasureChartLayoutSettings from './layout-settings';

const constants = {
  SHOW_AXIS_LABELS_OPTIONS: ['all', 'labels'], // show dim/measure axis labels when it matches one of this values
  SHOW_TITLE_OPTIONS: ['all', 'title'], // show the dimension/measure title when the show option matches one of these values
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  LAYOUTSETTINGS: DimensionMeasureChartLayoutSettings,
};

constants.DEFAULT_CHART_ORIENTATION = constants.HORIZONTAL;

export default constants;
