const CHART_ID = 'waterfallChart';

function getShapeColor(layout, theme, name, defaultColor) {
  const layoutColor = layout.color || layout.qDef.color;
  if (!layoutColor || layoutColor.auto || !layoutColor[name]) {
    const color = theme.getStyle(CHART_ID, `shape.${name}`, 'fill') || defaultColor;
    const index = -1; // chartStyleUtils.Theme.currentPalette.indexOf(color);
    return { index, color };
  }

  return layoutColor[name].paletteColor;
}

function getColorForPositiveValue(layout, theme) {
  return theme.getColorPickerColor(getShapeColor(layout, theme, 'positiveValue', '#4477AA'));
}

function getColorForNegativeValue(layout, theme) {
  return theme.getColorPickerColor(getShapeColor(layout, theme, 'negativeValue'));
}

function getColorForSubtotal(layout, theme) {
  return theme.getColorPickerColor(getShapeColor(layout, theme, 'subtotal'));
}

const waterfallUtils = {
  valueTypes: {
    NORMAL: 'NORMAL',
    INVERSE: 'INVERSE',
    SUBTOTAL: 'SUBTOTAL',
  },
  chartID: CHART_ID,
  getColorForPositiveValue,
  getColorForNegativeValue,
  getColorForSubtotal,
};

Object.freeze(waterfallUtils.valueTypes);
Object.freeze(waterfallUtils);

export default waterfallUtils;
