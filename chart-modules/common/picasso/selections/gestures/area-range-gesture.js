import Hammer from 'hammerjs';
import onComponentChecker from './on-component-checker';

function getAxisOrientation(axis, orientation) {
  let dir;
  if (axis === 'x-axis') {
    dir = orientation === 'horizontal' ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL;
  } else {
    dir = orientation === 'horizontal' ? Hammer.DIRECTION_HORIZONTAL : Hammer.DIRECTION_VERTICAL;
  }
  return dir;
}

/**
 * Handles area range selection events for picasso charts using HammerJS. When activating area range selection enable function is
 * triggered first. arearangestart is triggered on all areas specified by options.direction key. Only after arearangestart
 * is triggered, then the other events might be triggered as well. The different event
 * names must be appended as suffixes for options.event. In this case options.event is called arearange, then our
 * events must be named arearangestart, arearangemove, arearangeend, arearangecancel.
 */
function callAreaRangeGesture(state, gesturesFns, gesturesParams, axis) {
  const activeRangeBrush = gesturesParams.keys.dimRangeBrushKey ? 'majorrange' : 'measurerange';

  return {
    // Area range select gesture
    type: 'Pan',
    options: {
      direction: getAxisOrientation(axis, gesturesParams.isHorizontal),
      event: 'arearange',
      enable(manager, e) {
        if (!gesturesParams.rangeSelStatus.isOpenDim) {
          return false;
        }

        if (state.minoring) {
          return gesturesFns.isSelectionEnabled();
        }
        const targets =
          gesturesParams.active.gesture === 'arearange' ? [axis, gesturesParams.keys.componentKey] : [axis];
        const hitComp = onComponentChecker.isOnComponentForRange(e, targets, this);

        state.minoring = gesturesFns.isSelectionEnabled() && !!e && !!hitComp;
        return state.minoring;
      },
    },
    requireFailure: `lasso ${activeRangeBrush}`,
    recognizeWith: gesturesParams.handlers.scrollHandler ? 'drag' : null,
    events: {
      arearangestart(e) {
        const targets =
          gesturesParams.active.gesture === 'arearange' ? [axis, gesturesParams.keys.componentKey] : [axis];
        const hitComp = onComponentChecker.isOnComponentForRange(e, targets, this);
        if (!hitComp) {
          return;
        }

        state.minoring = true;
        gesturesFns.switchTo('arearange', this.chart, e);
        gesturesFns.doEmit(this.chart, 'rangeMinor', 'areaStart', e);
        gesturesParams.handlers.selectionHandler.pauseEngineCalls(gesturesParams.keys.areaBrushKey);
      },
      arearangemove(e) {
        if (!state.minoring) {
          return;
        }
        // Behaves likes lasso, which adds all data points as soon as we hit the points, we only want to highlight the values within the range
        this.chart.brush(gesturesParams.keys.areaBrushKey).clear();
        gesturesFns.doEmit(this.chart, 'rangeMinor', 'areaMove', e);
      },
      arearangeend(e) {
        if (!state.minoring) {
          return;
        }
        gesturesParams.handlers.selectionHandler.resumeEngineCalls(gesturesParams.keys.areaBrushKey, true);
        gesturesFns.doEmit(this.chart, 'rangeMinor', 'areaEnd', e);
        state.minoring = false;
      },
      arearangecancel() {
        gesturesParams.handlers.selectionHandler.resumeEngineCalls(gesturesParams.keys.areaBrushKey, false);
        state.minoring = false;
      },
    },
  };
}

export default {
  callAreaRangeGesture,
};
