import extend from 'extend';

function gridLine(settings, options) {
  const chartID = options && options.chartID;

  const axisLineStroke = options.theme.getStyle(chartID, 'grid.line.major', 'color');

  const defaultSettings = {
    displayOrder: -1,
    key: 'grid-line',
    type: 'grid-line',
    x: null,
    y: null,
    ticks: {
      stroke: axisLineStroke,
    },
    minorTicks: {
      stroke: axisLineStroke,
    },
  };

  return extend(true, {}, defaultSettings, settings || {});
}

export default gridLine;
