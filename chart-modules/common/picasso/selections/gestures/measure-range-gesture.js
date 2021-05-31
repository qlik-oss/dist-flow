import Hammer from 'hammerjs';
import onComponentChecker from './on-component-checker';

/**
 * Handles measure range selection events for picasso charts using HammerJS. When activating measure range selection enable function is
 * triggered first. measurerangestart is triggered on all areas specified by options.direction key. Only after measurerangestart
 * is triggered, then the other events might be triggered as well. The different event
 * names must be appended as suffixes for options.event. In this case options.event is called measurerange, then our
 * events must be named measurerangestart, measurerangemove, measurerangeend, measurerangecancel.
 */
function callMeasureRangeGesture(state, gesturesFns, gesturesParams, measureAxis) {
  const activeRangeBrush = gesturesParams.keys.dimRangeBrushKey ? 'majorrange' : 'arearange';

  return {
    type: 'Pan',
    options: {
      direction: gesturesParams.isHorizontal ? Hammer.DIRECTION_HORIZONTAL : Hammer.DIRECTION_VERTICAL,
      event: 'measurerange',
      enable(manager, e) {
        if (!gesturesParams.rangeSelStatus.isOpenMea) {
          return false;
        }

        if (state.measureSelecting) {
          return gesturesFns.isSelectionEnabled();
        }
        const targets =
          gesturesParams.active.gesture === 'measurerange'
            ? [measureAxis, gesturesParams.keys.componentKey]
            : [measureAxis];
        const hitComp = onComponentChecker.isOnComponentForRange(e, targets, this);

        state.measureSelecting = gesturesFns.isSelectionEnabled() && !!e && !!hitComp;
        return state.measureSelecting && !!gesturesParams.keys.measureRangeBrushKey;
      },
    },
    // requireFailure: 'lasso range',
    requireFailure: `lasso ${activeRangeBrush}`,
    recognizeWith: gesturesParams.handlers.scrollHandler ? 'drag' : null,
    events: {
      measurerangestart(e) {
        const targets =
          gesturesParams.active.gesture === 'measurerange'
            ? [measureAxis, gesturesParams.keys.componentKey]
            : [measureAxis];
        const hitComp = onComponentChecker.isOnComponentForRange(e, targets, this);
        if (!hitComp) {
          return;
        }

        state.measureSelecting = true;
        gesturesFns.switchTo('measurerange', this.chart, e);
        gesturesFns.doEmit(this.chart, 'rangeMeasure', 'rangeStart', e);
        gesturesParams.handlers.selectionHandler.pauseEngineCalls(gesturesParams.keys.measureRangeBrushKey);
      },
      measurerangemove(e) {
        if (!state.measureSelecting) {
          return;
        }
        gesturesFns.doEmit(this.chart, 'rangeMeasure', 'rangeMove', e);
      },
      measurerangeend(e) {
        if (!state.measureSelecting) {
          return;
        }
        gesturesParams.handlers.selectionHandler.resumeEngineCalls(gesturesParams.keys.measureRangeBrushKey, true);
        gesturesFns.doEmit(this.chart, 'rangeMeasure', 'rangeEnd', e);
        state.measureSelecting = false;
      },
      measurerangecancel() {
        gesturesParams.handlers.selectionHandler.resumeEngineCalls(gesturesParams.keys.measureRangeBrushKey, false);
        state.measureSelecting = false;
      },
    },
  };
}

export default {
  callMeasureRangeGesture,
};
