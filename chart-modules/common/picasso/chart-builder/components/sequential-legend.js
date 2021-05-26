import extend from 'extend';

function sequentialLegend(settings, options) {
  const chartID = options && options.chartID;
  const isRtl = options && options.isRtl;
  let dock = options.dock || 'auto';

  if (dock === 'auto') {
    dock = options.chartHeight < options.chartWidth ? (isRtl ? 'left' : 'right') : 'bottom';
  }

  const titleFill = options.theme.getStyle(chartID, 'legend.title', 'color');
  const titleFontSize = options.theme.getStyle(chartID, 'legend.title', 'fontSize');
  const titleFontFamily = options.theme.getStyle(chartID, 'legend.title', 'fontFamily');
  const tickFill = options.theme.getStyle(chartID, 'legend.label', 'color');
  const tickFontSize = options.theme.getStyle(chartID, 'legend.label', 'fontSize');
  const tickFontFamily = options.theme.getStyle(chartID, 'legend.label', 'fontFamily');

  function getAlignValue(word) {
    switch (word) {
      case 'left':
        return 0;
      case 'right':
        return 1;
      case 'middle':
      default:
        return 0.5;
    }
  }

  const defaultSettings = {
    key: 'seqlegend',
    type: 'legend-seq',
    dock,

    // Settings to position the legend outside of the axis
    displayOrder: 200,
    minimumLayoutMode: 'MEDIUM',
    prioOrder: 0,

    settings: {
      align: isRtl ? getAlignValue('right') : getAlignValue('left'),
      major: {
        invert: dock === 'left' || dock === 'right' || isRtl,
      },
      title: {
        show: options.showTitle,
        fontSize: titleFontSize,
        fontFamily: titleFontFamily,
        fill: titleFill,
      },
      tick: {
        fill: tickFill,
        fontSize: tickFontSize,
        fontFamily: tickFontFamily,
      },
    },
  };
  const finalSettings = extend(true, {}, defaultSettings, settings);
  return finalSettings;
}

export default sequentialLegend;
