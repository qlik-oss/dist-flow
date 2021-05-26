import extend from 'extend';

function refLine(settings, options) {
  const chartID = options && options.chartID; // Should we validate if the parameter exists?
  const oobColor = options.theme.getStyle(chartID, 'referenceLine.outOfBounds', 'color');
  const oobBackgroundColor = options.theme.getStyle(chartID, 'referenceLine.outOfBounds', 'backgroundColor');

  const defaultSettings = {
    key: 'ref-line',
    type: 'ref-line',
    dock: 'center',
    prioOrder: -1,
    lines: {
      x: [],
      y: [],
    },
    style: {
      oob: {
        width: 7,
        fill: oobBackgroundColor,
        text: {
          fill: oobColor,
        },
        padding: {
          x: 7,
          y: 5,
        },
      },
    },
  };

  return extend(true, {}, defaultSettings, settings || {});
}

export default refLine;
