import Hammer from 'hammerjs';

/**
 * Handles dragging for picasso charts using HammerJS. When activating dragging the enable function is
 * triggered first. dragstart is triggered on all areas specified by options.direction key. The different event
 * names must be appended as suffixes for options.event. In this case options.event is called drag, then our
 * events must be named dragstart, dragmove, dragend, dragcancel.
 */
function callDragGesture(state, gesturesFns, gesturesParams, hasSelections, isRtl) {
  let dragPoint = {};
  return {
    type: 'Pan',
    options: {
      direction: gesturesParams.isHorizontal ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL,
      event: 'drag',
      enable(manager, e) {
        if (state.dragging) {
          return gesturesFns.isEnabledFn();
        }

        state.dragging =
          gesturesFns.isEnabledFn() &&
          !!e &&
          !!this.chart
            .componentsFromPoint({ x: e.center.x, y: e.center.y })
            .filter((c) => c.settings.key === gesturesParams.keys.componentKey)[0];
        return state.dragging;
      },
    },
    requireFailure: hasSelections ? `lasso ${gesturesFns.getBrushConfig()}` : '',
    // requireFailure: 'lasso range majorrange',
    events: {
      dragstart(e) {
        dragPoint = { x: e.deltaX, y: e.deltaY };
        let change =
          -(gesturesParams.isHorizontal ? e.deltaY : e.deltaX) / gesturesParams.handlers.scrollHandler.getItemSize();
        if (!gesturesParams.isHorizontal && isRtl) {
          change = -change;
        }
        gesturesParams.handlers.scrollHandler.getScrollApi().move(change);
      },
      dragmove(e) {
        if (!state.dragging) {
          return;
        }
        let change =
          -(gesturesParams.isHorizontal ? e.deltaY - dragPoint.y : e.deltaX - dragPoint.x) /
          gesturesParams.handlers.scrollHandler.getItemSize();
        if (!gesturesParams.isHorizontal && isRtl) {
          change = -change;
        }
        gesturesParams.handlers.scrollHandler.getScrollApi().move(change);
        dragPoint = { x: e.deltaX, y: e.deltaY };
      },
      dragend() {
        if (!state.dragging) {
          return;
        }
        state.dragging = false;
      },
      dragcancel() {
        state.dragging = false;
      },
    },
  };
}

export default {
  callDragGesture,
};
