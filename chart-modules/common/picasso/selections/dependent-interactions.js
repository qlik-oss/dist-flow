import lassoGesture from './gestures/lasso-gesture';
import measureRangeGesture from './gestures/measure-range-gesture';
import areaRangeGesture from './gestures/area-range-gesture';
import dimensionRangeGesture from './gestures/dimension-range-gesture';
import dragGesture from './gestures/drag-gesture';
import navBtnGesture from './gestures/navigational-button-gesture';

/**
 * Creates Picasso components for interaction component that are dependent on eatchother
 */

function DependentInteractions(handlers, orientation, isRtl, keys, rangeSelStatus) {
  const ret = {};

  orientation = orientation || 'vertical';

  const lassoBrushKey = keys.lassoBrushKey || 'select';
  const dimRangeBrushKey = keys.dimRangeBrushKey || null;
  const measureRangeBrushKey = keys.measureRangeBrushKey || null;
  const areaBrushKey = keys.areaBrushKey || null;
  const legendBrushKey = keys.legendBrushKey || null;

  const hasSelections = !!handlers.selectionHandler && handlers.selectionHandler.isOn();

  const state = {
    dragging: false,
    lassoing: false,
    majoring: false,
    minoring: false,
    measureSelecting: false,
  };

  const active = {
    gesture: '',
    type: '',
  };

  const isHorizontal = orientation === 'horizontal';

  const dimAxis = isHorizontal ? 'y-axis' : 'x-axis';
  const measureAxis = isHorizontal ? 'x-axis' : 'y-axis';

  function switchTo(gesture, chart, e) {
    if (active.gesture === gesture) {
      return;
    }
    let clearKey = lassoBrushKey;
    const activeChart = chart || active.chart;

    switch (active.gesture) {
      case 'majorrange':
        doEmit(activeChart, 'rangeDim', 'rangeClear', e);
        clearKey = dimRangeBrushKey;
        break;
      case 'measurerange':
        doEmit(activeChart, 'rangeMeasure', 'rangeClear', e);
        clearKey = measureRangeBrushKey;
        break;
      case 'arearange':
        doEmit(activeChart, 'rangeMinor', 'areaClear', e);
        clearKey = areaBrushKey;
        break;
      default:
        break;
    }

    active.gesture = gesture;
    const newType = gesture === 'range' ? 'range' : 'item';

    if (active.type && active.type !== newType) {
      activeChart.brush(clearKey).clear();
    }

    active.chart = chart;
    active.type = newType;
  }

  // Just added here to allow easy disabling of things while developing
  function doEmit(chart, comp, cont, e) {
    if (chart) {
      const inst = chart.component(comp);
      if (inst) {
        inst.emit(cont, e);
      }
    }
  }

  function getBrushConfig() {
    if (!dimRangeBrushKey) {
      return 'measurerange arearange';
    }
    if (!measureRangeBrushKey) {
      return 'majorrange arearange';
    }
    return 'majorrange measurerange';
  }

  let gestures = [];

  const gesturesFns = {
    isSelectionEnabled: () => handlers.selectionHandler && handlers.selectionHandler.isOn(),
    isNavigationEnabled: () => handlers.scrollHandler && handlers.scrollHandler.isOn(),
    doEmit,
    switchTo,
    getBrushConfig,
  };

  const gesturesParams = {
    handlers,
    keys,
    isHorizontal,
    active,
    rangeSelStatus,
  };

  if (hasSelections) {
    gestures = [
      {
        type: 'Tap',
        options: {
          event: 'rangeClearTap',
        },
        events: {
          rangeClearTap(e) {
            switchTo('none', this.chart, e);

            state.majoring = false;
            state.measureSelecting = false;
            state.minoring = false;
          },
        },
      },
    ];

    // Ordering matters here because the tap event, because the above gesture does not return anything
    // and we want don't want to call the navigational button enable function for all tap events
    gestures.unshift(navBtnGesture.callNavBtnGesture(gesturesFns.isNavigationEnabled, legendBrushKey));

    gestures.push(lassoGesture.callLassoGesture(state, gesturesFns, gesturesParams));

    // Only two of the axis range selection can exist at the same time
    if (!dimRangeBrushKey) {
      gestures.push(measureRangeGesture.callMeasureRangeGesture(state, gesturesFns, gesturesParams, measureAxis));
      // Register component to selections handler so it is cleared properly
      handlers.selectionHandler.addComponent(measureRangeBrushKey, { id: 'rangeMeasure', clear: 'rangeClear' });

      gestures.push(areaRangeGesture.callAreaRangeGesture(state, gesturesFns, gesturesParams, dimAxis));
      handlers.selectionHandler.addComponent(areaBrushKey, { id: 'rangeMinor', clear: 'areaClear' });
    } else if (!measureRangeBrushKey) {
      gestures.push(dimensionRangeGesture.callDimensionRangeGesture(state, gesturesFns, gesturesParams, dimAxis));
      handlers.selectionHandler.addComponent(dimRangeBrushKey, { id: 'rangeDim', clear: 'rangeClear' });

      gestures.push(areaRangeGesture.callAreaRangeGesture(state, gesturesFns, gesturesParams, measureAxis));
      handlers.selectionHandler.addComponent(areaBrushKey, { id: 'rangeMinor', clear: 'areaClear' });
    } else {
      gestures.push(dimensionRangeGesture.callDimensionRangeGesture(state, gesturesFns, gesturesParams, dimAxis));
      handlers.selectionHandler.addComponent(dimRangeBrushKey, { id: 'rangeDim', clear: 'rangeClear' });

      gestures.push(measureRangeGesture.callMeasureRangeGesture(state, gesturesFns, gesturesParams, measureAxis));
      handlers.selectionHandler.addComponent(measureRangeBrushKey, { id: 'rangeMeasure', clear: 'rangeClear' });
    }
  }

  if (handlers.scrollHandler) {
    gestures.push(dragGesture.callDragGesture(state, gesturesFns, gesturesParams, hasSelections, isRtl));

    // On scroll we need to switch of the major ranging, so that pan will work
    handlers.scrollHandler.getScrollApi().on('update', onScrollUpdate);
  }

  function onScrollUpdate() {
    switchTo('none');
    state.majoring = false;
    state.measureSelecting = false;
    state.minoring = false;
  }

  ret.gestures = gestures;
  ret.destroy = function () {
    if (handlers.scrollHandler) {
      handlers.scrollHandler.getScrollApi().removeListener('update', onScrollUpdate);
    }
  };

  return ret;
}

export default {
  create: DependentInteractions,
};
