const selectionUtils = {
  brushInterceptors: {
    DIM_VALUE_NULL: -2,
    DIM_VALUE_TOTAL: -3,
    brushOnlyOne,
    filterValues,
  },
};

export default selectionUtils;

/**
 * Implementation details
 */

/**
 * Brush interception filter func - Brush ONE single value
 * @param selectBrush
 * @param items
 * @returns {*}
 */
function brushOnlyOne(brush, items) {
  const activeBrushes = brush.brushes().filter((b) => b.type === 'value');
  let toggleOff = [];
  if (activeBrushes.length) {
    activeBrushes.forEach((b) => {
      toggleOff = toggleOff.concat(
        b.brush.values().map((v) => ({
          key: b.id,
          value: v,
        }))
      );
    });
  }

  return toggleOff.concat(items);
}

function findField(chartInstance, item) {
  const splitIndex = item.key.indexOf('qHyperCube') + 'qHyperCube'.length;
  const datasetName = item.key.substr(0, splitIndex);
  const fieldName = item.key.substr(splitIndex + 1);
  return chartInstance.dataset(datasetName).field(fieldName);
}

/**
 * Brush interception filter function
 * Do not allow selections on null value
 * Do not allow selections in locked dimension
 * @param chartInstance
 * @param items
 * @returns Object { items: {Array}, itemsAreLocked: {Boolean} }
 */
function filterValues(chartInstance, items) {
  const self = this;
  let meta;
  let field;
  const lockedFields = [];
  let lockedItems = 0;
  const brushItems = [];

  items.forEach((item) => {
    if (item.value === self.DIM_VALUE_NULL || item.value === self.DIM_VALUE_TOTAL) {
      return;
    }
    field = findField(chartInstance, item);

    meta = field && field.raw();

    if (!meta.qLocked) {
      brushItems.push({
        key: item.key,
        value: item.value,
      });
    } else {
      lockedFields.push(meta);
      lockedItems++;
    }
  });

  return { items: brushItems, itemsAreLocked: lockedItems > 0 && lockedItems === items.length, lockedFields };
}
