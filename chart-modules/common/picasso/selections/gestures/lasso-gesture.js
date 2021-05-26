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
          return gesturesFns.isEnabledFn();
        }
        const hitComp = onComponentChecker.isOnComponentForLasso(e, gesturesParams, this);
        return gesturesFns.isEnabledFn() && e && (getLassoState(gesturesParams.handlers) || state.lassoing) && hitComp;
      },
      event: 'lasso',
    },
    // recognizeWith: 'range drag',
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
        e.clientX = e.pointers[0].clientX; // eslint-disable-line no-param-reassign
        e.clientY = e.pointers[0].clientY; // eslint-disable-line no-param-reassign
        gesturesFns.doEmit(this.chart, 'lasso', 'lassoStart', e);
      },
      lassomove(e) {
        if (!state.lassoing) {
          return;
        }
        e.clientX = e.pointers[0].clientX; // eslint-disable-line no-param-reassign
        e.clientY = e.pointers[0].clientY; // eslint-disable-line no-param-reassign
        gesturesFns.doEmit(this.chart, 'lasso', 'lassoMove', e);
      },
      lassoend(e) {
        if (!state.lassoing) {
          return;
        }

        e.clientX = e.pointers[0].clientX; // eslint-disable-line no-param-reassign
        e.clientY = e.pointers[0].clientY; // eslint-disable-line no-param-reassign
        gesturesFns.doEmit(this.chart, 'lasso', 'lassoEnd', e);
        gesturesParams.handlers.selectionHandler.resumeEngineCalls(gesturesParams.keys.lassoBrushKey, true);
        state.lassoing = false; // eslint-disable-line no-param-reassign
      },
      lassocancel(e) {
        state.lassoing = false; // eslint-disable-line no-param-reassign
        gesturesFns.doEmit(this.chart, 'lasso', 'lassoCancel', e);
        gesturesParams.handlers.selectionHandler.resumeEngineCalls(gesturesParams.keys.lassoBrushKey, false);
      },
    },
  };
}

export default {
  callLassoGesture,
};
