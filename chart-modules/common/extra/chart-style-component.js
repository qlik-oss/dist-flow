const ChartStyleComponent = (fontResolver, theme, chartId) => {
  const propertyDefs = {};
  propertyDefs.getOptions = (key, ref) => {
    const getFontFamilyComponent = () => ({
      ref: `${ref}.fontFamily`,
      component: 'dropdown',
      options: () => fontResolver.getOptions(`${ref}.fontFamily`),
      defaultValue: () => fontResolver.getDefaultValue(`${ref}.fontFamily`),
    });

    const getFontSizeComponent = () => ({
      ref: `${ref}.fontSize`,
      component: 'dropdown',
      width: true,
      options: () => fontResolver.getOptions(`${ref}.fontSize`),
      defaultValue: () => fontResolver.getDefaultValue(`${ref}.fontSize`),
    });

    const getColorComponent = (theme, chartId) => ({
      ref: `${ref}.fontColor`,
      component: 'color-picker',
      width: false,
      defaultValue: () => {
        const color = theme.getStyle(chartId, `${ref}.color`, 'color');
        const palette = theme.getDataColorPickerPalettes()[0].colors;
        const index = palette.indexOf(color);
        return { color, index };
      },
    });

    const getFontWrapperComponent = (theme, chartId) => ({
      fontWrapper: {
        component: 'inline-wrapper',
        items: {
          fontSize: {
            ...getFontSizeComponent(),
          },
          fontColor: {
            ...getColorComponent(theme, chartId),
          },
        },
      },
    });
    return {
      labelSection: {
        component: 'items',
        ref: 'components',
        key,
        items: {
          fontFamily: {
            ...getFontFamilyComponent(),
          },
          ...getFontWrapperComponent(theme, chartId),
        },
      },
    };
  };
  return propertyDefs;
};

export const getChartFontResolver = (theme, translator, chartId, createFontResolver, flags) =>
  createFontResolver({
    theme,
    translator,
    flags,
    config: {
      id: chartId,
      paths: ['axis.title', 'axis.label.name', 'label.value', 'legend.title', 'legend.label'],
    },
  });

const overrides = (key, layout) => (layout.components || []).find((c) => c.key === key);

export const getAxisTitleStyle = (chartId, theme, layout) => {
  const axis = overrides('axis', layout)?.axis;
  return {
    text: {
      fontFamily: axis?.title?.fontFamily || theme.getStyle(chartId, 'axis.title', 'fontFamily'),
      fontSize: axis?.title?.fontSize || theme.getStyle(chartId, 'axis.title', 'fontSize'),
      fill: axis?.title?.fontColor?.color || theme.getStyle(chartId, 'axis.title', 'color'),
    },
  };
};
export const getAxisLabelStyle = (chartId, theme, layout) => {
  const axis = overrides('axis', layout)?.axis;
  return {
    labels: {
      fontFamily: axis?.label?.name?.fontFamily || theme.getStyle(chartId, 'axis.label.name', 'fontFamily'),
      fontSize: axis?.label?.name?.fontSize || theme.getStyle(chartId, 'axis.label.name', 'fontSize'),
      fill: axis?.label?.name?.fontColor?.color || theme.getStyle(chartId, 'axis.label.name', 'color'),
    },
  };
};

export const getValueLabelStyle = (chartId, styles, layout) => {
  const value = overrides('value', layout)?.label;
  const fontFamily = value?.value?.fontFamily || styles.label.value.fontFamily;
  let fontSize = value?.value?.fontSize || styles.label.value.fontSize;
  fontSize = parseFloat(fontSize);
  const fill = value?.value?.fontColor?.color;
  return {
    fontFamily,
    fontSize,
    fill,
  };
};

export const getLegendTitleStyle = (chartId, theme, layout, flags) => {
  const legend = flags.isEnabled('CLIENT_IM_3051') ? overrides('legend', layout)?.legend : {};
  return {
    fontFamily: legend?.title?.fontFamily || theme.getStyle(chartId, 'legend.title', 'fontFamily'),
    fontSize: legend?.title?.fontSize || theme.getStyle(chartId, 'legend.title', 'fontSize'),
    color: legend?.title?.fontColor?.color || theme.getStyle(chartId, 'legend.title', 'color'),
  };
};

export const getLegendLabelStyle = (chartId, theme, layout, flags) => {
  const legend = flags.isEnabled('CLIENT_IM_3051') ? overrides('legend', layout)?.legend : {};
  return {
    fontFamily: legend?.label?.fontFamily || theme.getStyle(chartId, 'legend.label', 'fontFamily'),
    fontSize: legend?.label?.fontSize || theme.getStyle(chartId, 'legend.label', 'fontSize'),
    color: legend?.label?.fontColor?.color || theme.getStyle(chartId, 'legend.label', 'color'),
  };
};

export default ChartStyleComponent;
