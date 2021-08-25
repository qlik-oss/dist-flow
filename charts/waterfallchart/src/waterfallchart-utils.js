const CHART_ID = 'object.waterfallChart';

function getShapeColor(layout, theme, name, defaultColor, defaultIndex) {
  const layoutColor = layout.color || layout.qDef.color;
  if (!layoutColor || layoutColor.auto || !layoutColor[name]) {
    const color = theme.getStyle(CHART_ID, `shape.${name}`, 'fill') || defaultColor;
    const index = defaultIndex; // chartStyleUtils.Theme.currentPalette.indexOf(color);
    return { index, color };
  }

  return layoutColor[name].paletteColor;
}

function getColorForPositiveValue(layout, theme) {
  return theme.getColorPickerColor(getShapeColor(layout, theme, 'positiveValue', null, 6));
}

function getColorForNegativeValue(layout, theme) {
  return theme.getColorPickerColor(getShapeColor(layout, theme, 'negativeValue', '#cc6677', -1));
}

function getColorForSubtotal(layout, theme) {
  return theme.getColorPickerColor(getShapeColor(layout, theme, 'subtotal', '#c3c3c3', -1));
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
