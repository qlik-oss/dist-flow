import Hammer from 'hammerjs';
import onComponentChecker from './on-component-checker';

/**
 * Handles dimension range selection events for picasso charts using HammerJS. When activating dimension range selection enable function is
 * triggered first. majorrangestart is triggered on all areas specified by options.direction key. Only after majorrangestart
 * is triggered, then the other events might be triggered as well. The different event
 * names must be appended as suffixes for options.event. In this case options.event is called majorrange, then our
 * events must be named majorrangestart, majorrangemove, majorrangeend, majorrangecancel.
 */
function callDimensionRangeGesture(state, gesturesFns, gesturesParams, dimAxis) {
  const activeRangeBrush = gesturesParams.keys.measureRangeBrushKey ? 'measurerange' : 'arearange';
  return {
    type: 'Pan',
    options: {
      direction: gesturesParams.isHorizontal ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL,
      event: 'majorrange',
      enable(manager, e) {
        if (!gesturesParams.rangeSelStatus.isOpenDim) {
          return false;
        }
        if (state.majoring) {
          return gesturesFns.isSelectionEnabled();
        }
        const targets =
          gesturesParams.active.gesture === 'majorrange' ? [dimAxis, gesturesParams.keys.componentKey] : [dimAxis];
        const hitComp = onComponentChecker.isOnComponentForRange(e, targets, this);

        state.majoring = gesturesFns.isSelectionEnabled() && !!e && !!hitComp;
        return state.majoring && !!gesturesParams.keys.dimRangeBrushKey;
      },
    },
    requireFailure: `lasso ${activeRangeBrush}`,
    recognizeWith: gesturesParams.handlers.scrollHandler ? 'drag' : null,
    events: {
      majorrangestart(e) {
        const targets =
          gesturesParams.active.gesture === 'majorrange' ? [dimAxis, gesturesParams.keys.componentKey] : [dimAxis];
        const hitComp = onComponentChecker.isOnComponentForRange(e, targets, this);
        if (!hitComp) {
          return;
        }

        state.majoring = true;
        gesturesFns.switchTo('majorrange', this.chart, e);
        gesturesFns.doEmit(this.chart, 'rangeDim', 'rangeStart', e);
        gesturesParams.handlers.selectionHandler.pauseEngineCalls(gesturesParams.keys.dimRangeBrushKey);
      },
      majorrangemove(e) {
        if (!state.majoring) {
          return;
        }
        gesturesFns.doEmit(this.chart, 'rangeDim', 'rangeMove', e);
      },
      majorrangeend(e) {
        if (!state.majoring) {
          return;
        }
        gesturesParams.handlers.selectionHandler.resumeEngineCalls(gesturesParams.keys.dimRangeBrushKey, true);
        gesturesFns.doEmit(this.chart, 'rangeDim', 'rangeEnd', e);
        state.majoring = false;
      },
      majorrangecancel() {
        gesturesParams.handlers.selectionHandler.resumeEngineCalls(gesturesParams.keys.dimRangeBrushKey, false);
        state.majoring = false;
      },
    },
  };
}

export default {
  callDimensionRangeGesture,
};
