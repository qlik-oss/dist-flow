import DimensionMeasureChart from './presets/dimension-measure-chart/dimension-measure-chart';

function ChartPresets(type, chartBuilder, options) {
  switch (type) {
    case 'dimension-measure-chart':
      DimensionMeasureChart(chartBuilder, options);
      break;
    default:
      throw Error('There is no chart preset with that type');
  }
}

export default ChartPresets;
