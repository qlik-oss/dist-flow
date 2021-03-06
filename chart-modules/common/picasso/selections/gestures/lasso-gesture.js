import Hammer from 'hammerjs';
import onComponentChecker from './on-component-checker';

function getLassoState(handlers) {
  return handlers.selectionHandler.lassoState() && !handlers.selectionHandler.allFieldsLocked();
}

/**
 * Handles lasso events for picasso charts using HammerJS. When activating lasso selection enable function is
 * triggered first. lassoStart is triggered on all areas specified by options.direction key. Lasso is the gesture
 * that will be active by default.
 */
function callLassoGesture(state, gesturesFns, gesturesParams) {
  return {
    type: 'Pan',
    options: {
      direction: Hammer.DIRECTION_ALL,
      threshold: 1,
      enable(manager, e) {
        if (state.lassoing) {
          return gesturesFns.isSelectionEnabled();
        }
        const hitComp = onComponentChecker.isOnComponentForLasso(e, gesturesParams, this);
        return (
          gesturesFns.isSelectionEnabled() && e && (getLassoState(gesturesParams.handlers) || state.lassoing) && hitComp
        );
      },
      event: 'lasso',
    },
    recognizeWith: gesturesParams.handlers.scrollHandler ? 'drag' : null,
    events: {
      lassostart(e) {
        const hitComp = onComponentChecker.isOnComponentForLasso(e, gesturesParams, this);
        if (!hitComp) {
          return;
        }
        gesturesFns.switchTo('lasso', this.chart, e);
        state.lassoing = true;
        gesturesParams.handlers.selectionHandler.pauseEngineCalls(gesturesParams.keys.lassoBrushKey);
        e.clientX = e.pointers[0].clientX;
        e.clientY = e.pointers[0].clientY;
        gesturesFns.doEmit(this.chart, 'lasso', 'lassoStart', e);
      },
      lassomove(e) {
        if (!state.lassoing) {
          return;
        }
        e.clientX = e.pointers[0].clientX;
        e.clientY = e.pointers[0].clientY;
        gesturesFns.doEmit(this.chart, 'lasso', 'lassoMove', e);
      },
      lassoend(e) {
        if (!state.lassoing) {
          return;
        }

        e.clientX = e.pointers[0].clientX;
        e.clientY = e.pointers[0].clientY;
        gesturesFns.doEmit(this.chart, 'lasso', 'lassoEnd', e);
        gesturesParams.handlers.selectionHandler.resumeEngineCalls(gesturesParams.keys.lassoBrushKey, true);
        state.lassoing = false;
      },
      lassocancel(e) {
        state.lassoing = false;
        gesturesFns.doEmit(this.chart, 'lasso', 'lassoCancel', e);
        gesturesParams.handlers.selectionHandler.resumeEngineCalls(gesturesParams.keys.lassoBrushKey, false);
      },
    },
  };
}

export default {
  callLassoGesture,
};
