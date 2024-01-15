import extend from 'extend';
import axisDockUtil from './util/axis-dock-util';
import getTextRenderer from './util/get-text-renderer';

function axis(settings, options) {
  const chartID = options && options.chartID; // Should we validate if the parameter exists?
  const dock = options && options.dock;
  const direction = options && options.direction;
  const isRtl = options && options.isRtl;

  const axisLineStroke = options.theme.getStyle(chartID, 'axis.line.major', 'color');
  const titleFontSize = options.theme.getStyle(chartID, 'axis.title', 'fontSize');
  const titleFill = options.theme.getStyle(chartID, 'axis.title', 'color');
  const labelsFill = options.theme.getStyle(chartID, 'axis.label.name', 'color');
  const labelsFontSize = options.theme.getStyle(chartID, 'axis.label.name', 'fontSize');
  const titleFontFamily = options.theme.getStyle(chartID, 'axis.title', 'fontFamily');
  const labelsFontFamily = options.theme.getStyle(chartID, 'axis.label.name', 'fontFamily');

  const defaultSettings = {
    key: 'axis',
    type: 'axis',
    renderer: getTextRenderer(options.flags),
    dock: axisDockUtil.getAxisDock(direction, dock, isRtl),
    brush: { trigger: [], consume: [] },
    settings: {
      title: {
        fontSize: titleFontSize,
        fontFamily: titleFontFamily,
        fill: titleFill,
      },
      line: {
        show: true,
        strokeWidth: 1,
        stroke: axisLineStroke,
      },
      labels: {
        fill: labelsFill,
        fontSize: labelsFontSize,
        fontFamily: labelsFontFamily,
        tiltAngle: isRtl ? -40 : 40,
        maxEdgeBleed: 75,
        maxSize: 150,
        mode: 'auto',
      },
      ticks: {
        stroke: axisLineStroke,
      },
      minorTicks: {
        stroke: axisLineStroke,
      },
    },
  };
  const axisSettings = extend(true, {}, defaultSettings, settings || {});
  axisSettings.brush.consume.forEach((consume) => {
    consume.style.active.strokeWidth = 0;
  });
  return axisSettings;
}

function xAxis(settings, options) {
  const defaultSettings = {
    key: 'x-axis',
    scale: 'x',
  };
  const xAxisSettings = extend(true, defaultSettings, settings || {});
  return axis(xAxisSettings, options);
}

function yAxis(settings, options) {
  const dock = options && options.dock;
  const isRtl = options && options.isRtl;
  const defaultSettings = {
    key: 'y-axis',
    scale: 'y',
    dock: axisDockUtil.getYAxisDock(dock, isRtl),
  };
  const yAxisSettings = extend(true, defaultSettings, settings || {});
  return axis(yAxisSettings, options);
}

axis.xAxis = xAxis;
axis.yAxis = yAxis;

export default axis;
