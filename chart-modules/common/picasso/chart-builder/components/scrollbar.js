import extend from 'extend';

function scrollbar(settings, options) {
  const isRtl = options && options.isRtl;
  const chartID = options && options.chartID;
  const isHorizontal = options && options.isHorizontal;
  const defaultSettings = {
    key: 'scrollbar',
    type: 'scrollbar',
    scroll: 'dimension',
    dock: isHorizontal ? 'bottom' : isRtl ? 'left' : 'right',
    settings: {
      backgroundColor: options.theme.getStyle(chartID, '', 'backgroundColor'),
      invert: isRtl && isHorizontal,
    },
  };
  return extend(true, {}, defaultSettings, settings || {});
}

export default scrollbar;
