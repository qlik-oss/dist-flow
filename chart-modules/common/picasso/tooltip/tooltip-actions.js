/**
 * Create a new tooltip action context
 *
 * @param {Object} chartInstance Picasso chart instance
 * @returns {Object} The tooltip actions handler instance
 */
function TooltipActions(chartInstance, componentKey, data, context, tooltipKey) {
  let hasOpen = false;

  context = context || 'tooltip';
  data = data || ['self'];

  const brush = chartInstance.brush(context);

  const fn = {};

  // Exposed here for test stub purposes
  fn.isOpen = function () {
    return hasOpen;
  };

  function closeTooltip() {
    if (hasOpen) {
      const tooltip = chartInstance.component(tooltipKey);
      tooltip.emit('hide');
    }
    hasOpen = false;
  }

  function openTooltip(shapes) {
    hasOpen = true;
    const tooltip = chartInstance.component(tooltipKey);
    const e = {};
    const data = { nodes: shapes };
    tooltip.emit('show', e, data);
  }

  fn.closeTooltip = closeTooltip;

  /**
   * Updates the contents in tooltip. Requires an array of tooltipInfo.labelData and
   * an array of tooltipInfo.measureRows for the tooltip to display content, otherwise
   * it will show nothing. These key value mappings should be sent in from the charts.
   */
  function update() {
    const brushes = brush.brushes();

    // Fetches only the shapes that we are hovering over
    const shapes = chartInstance.getAffectedShapes(context, 'and', data, componentKey);

    if (brushes.length >= 1) {
      hasOpen = true;
      openTooltip(shapes);
    } else {
      closeTooltip();
    }
  }

  function toggleInterceptor(items) {
    // Remove duplicates if we have multiple dimensions to aoivd a toggle
    // ex: set(2006 ) ->2006 is on, followed by set(2006 ) ->2006 is off
    if (data.length > 1) {
      const check = {};
      const ret = [];
      items.forEach((item) => {
        if (!check[item.key]) {
          check[item.key] = {};
        }
        if (!check[item.key][item.value]) {
          check[item.key][item.value] = true;
          ret.push(item);
        }
      });
      return ret;
    }
    return items;
  }

  fn.update = update;
  fn.toggleInterceptor = toggleInterceptor;
  return fn;
}

export default {
  create(...args) {
    return TooltipActions(...args);
  },
};
