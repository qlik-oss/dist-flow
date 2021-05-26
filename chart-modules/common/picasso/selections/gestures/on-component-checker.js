/**
 * Checks whether a collision has occurred for range selection
 * @param e - event, in this case a mouse event
 * @param targets - the target points that the selections are hitting
 * @param selectionGesture - The type of selection gesture, for example area range select
 * @returns {boolean} - True, if a collision has occurred, otherwise false
 */
function isOnComponentForRange(e, targets, selectionGesture) {
  return (
    !!e &&
    !!selectionGesture.chart
      .componentsFromPoint({
        x: e.center.x,
        y: e.center.y,
      })
      .filter((c) => targets.indexOf(c.settings.key) !== -1)[0]
  );
}

/**
 * Checks whether a collision has occurred for lasso selection
 * @param e - event, in this case a mouse event
 * @param gesturesParams - parameters for lasso selection
 * @param lassoGesture - the lasso gesture instance
 * @returns {boolean} - True, if a collision has occurred, otherwise false
 */
function isOnComponentForLasso(e, gesturesParams, lassoGesture) {
  return (
    e &&
    lassoGesture.chart
      .componentsFromPoint({
        x: e.center.x,
        y: e.center.y,
      })
      .filter((c) => c.settings.key === gesturesParams.keys.componentKey)[0]
  );
}

function isOnComponentForNavBtn(e, legendBrushKey, navBtnGesture) {
  const components = navBtnGesture.chart.componentsFromPoint(e.center);
  return components.some((c) => c.settings.key === legendBrushKey);
}

export default {
  isOnComponentForRange,
  isOnComponentForLasso,
  isOnComponentForNavBtn,
};
