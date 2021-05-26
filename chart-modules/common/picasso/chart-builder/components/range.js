import extend from 'extend';
import rangeUtil from './util/range-util';

function range(settings, options) {
  const brushKey = options && options.brushKey;
  const brushAxis = options && options.brushAxis;
  const brushArea = options && options.brushArea;
  const brushScale = options && options.brushScale;
  const isHorizontal = options && options.isHorizontal;
  const dock = options && options.dock;
  const isRtl = options && options.isRtl;

  const defaultSettings = {
    type: 'brush-range',
    key: 'range',
    displayOrder: 99,
    dock: rangeUtil.getDock(brushAxis, brushArea),
    settings: {
      brush: brushKey,
      fill: 'rgba(0, 0, 0, 0)',
      scale: brushScale,
      multiple: options && options.multiple === false ? options.multiple : true,
      direction: isHorizontal ? 'horizontal' : 'vertical',
      target: {
        component: brushAxis,
        fill: 'rgba( 82, 204, 82, 0.2 )',
        fillActive: 'rgba(82, 204, 82, 0.4)',
      },
      bubbles: {
        align: rangeUtil.getBublesAlign(isHorizontal, dock, isRtl),
      },
    },
  };
  return extend(true, {}, defaultSettings, settings || {});
}

export default range;
