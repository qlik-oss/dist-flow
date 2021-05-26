import extend from 'extend';
import rangeUtil from './util/range-util';

function rangeArea(settings, options) {
  const brushKey = options && options.brushKey;
  const brushAxis = options && options.brushAxis;
  const brushComponents = options && options.brushComponents ? options.brushComponents : [];
  const brushData = options && options.brushData ? options.brushData : ['elemNo'];
  const brushArea = options && options.brushArea;
  const isHorizontal = options && options.isHorizontal;
  const dock = options && options.dock;
  const isRtl = options && options.isRtl;
  const chartInstance = options && options.chartInstance;
  let isStartBorder = true;

  const defaultSettings = {
    type: 'brush-area-dir',
    key: 'area',
    displayOrder: 99,
    dock: rangeUtil.getDock(brushAxis, brushArea),
    settings: {
      brush: {
        components: [],
      },
      direction: isHorizontal ? 'horizontal' : 'vertical',
      target: {
        component: brushAxis,
        fill: 'rgba( 82, 204, 82, 0.2 )',
        fillActive: 'rgba(82, 204, 82, 0.4)',
      },
      bubbles: {
        align: rangeUtil.getBublesAlign(isHorizontal, dock, isRtl),
        label(data) {
          if (isStartBorder) {
            isStartBorder = false;
            const formattedStartValue = chartInstance
              .dataset(data.binStart.source.key)
              .field(data.binStart.source.field)
              .formatter()(data.binStart.value);
            return formattedStartValue;
          }
          isStartBorder = true;
          const formattedEndValue = chartInstance
            .dataset(data.binEnd.source.key)
            .field(data.binEnd.source.field)
            .formatter()(data.binEnd.value);
          return formattedEndValue;
        },
      },
      multiple: options && options.multiple === false ? options.multiple : true,
    },
  };

  brushComponents.forEach((comp) => {
    defaultSettings.settings.brush.components.push({
      contexts: brushKey ? [brushKey] : undefined,
      key: comp,
      data: brushData,
      action: 'add',
    });
  });

  return extend(true, {}, defaultSettings, settings || {});
}

export default rangeArea;
