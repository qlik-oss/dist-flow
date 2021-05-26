import extend from 'extend';
import axisDockUtil from './util/axis-dock-util';

function text(settings, options) {
  const chartID = options && options.chartID;
  const dock = options && options.dock;
  const direction = options && options.direction;
  const isRtl = options && options.isRtl;
  const titleFontSize = options.theme.getStyle(chartID, 'axis.title', 'fontSize');
  const titleFill = options.theme.getStyle(chartID, 'axis.title', 'color');
  const titleFontFamily = options.theme.getStyle(chartID, 'axis.title', 'fontFamily');

  const defaultSettings = {
    key: 'text',
    type: 'text',
    dock: axisDockUtil.getAxisDock(direction, dock, isRtl) || 'bottom',
    displayOrder: 0, // TODO: This can be removed when picasso set displayOrder for text component to 0. Currently picasso set it to 99.
    style: {
      text: {
        fontSize: titleFontSize,
        fontFamily: titleFontFamily,
        fill: titleFill,
      },
    },
  };
  return extend(true, {}, defaultSettings, settings || {});
}

function xAxisTitle(settings, options) {
  const defaultSettings = {
    key: 'x-axis-title',
  };
  const xAxisTitleSettings = extend(true, defaultSettings, settings || {});
  return text(xAxisTitleSettings, options);
}

function yAxisTitle(settings, options) {
  const dock = options && options.dock;
  const isRtl = options && options.isRtl;
  const defaultSettings = {
    key: 'y-axis-title',
    dock: axisDockUtil.getYAxisDock(dock, isRtl) || 'left',
  };
  const yAxisTitleSettings = extend(true, defaultSettings, settings || {});
  return text(yAxisTitleSettings, options);
}

text.xAxisTitle = xAxisTitle;
text.yAxisTitle = yAxisTitle;

export default text;
