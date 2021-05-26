import onComponentChecker from './on-component-checker';

/**
 * Handles navigational button events for picasso charts using HammerJS. When pressing on a navigational button,
 * the enable function is triggered to check if the navigational button should be enabled or not.
 * For example, in edit mode it should be disabled.
 * @param isEnabledFn - Function that returns a boolean. In this case return false if in edit mode, true otherwise
 * @param legendBrushKey - String defining the legend brush key
 * @returns An object for reacting to tap events according to HammerJS API
 */
function callNavBtnGesture(isEnabledFn, legendBrushKey) {
  return {
    type: 'Tap',
    options: {
      event: 'navBtnTap',
      enable(manager, e) {
        if (!e || !isEnabledFn()) {
          return false;
        }

        return onComponentChecker.isOnComponentForNavBtn(e, legendBrushKey, this);
      },
    },
    events: {
      navBtnTap(e) {
        // Invokes paging interaction on legend
        this.chart.componentsFromPoint(e.center).forEach((c) => {
          const btn = e.target;
          const attr = btn ? btn.getAttribute('data-action') : '';
          if (attr) {
            return c.emit(attr);
          }
          return undefined;
        });
      },
    },
  };
}

export default {
  callNavBtnGesture,
};
