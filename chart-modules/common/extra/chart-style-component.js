const ChartStyleComponent = (key, ref, fontResolver) => {
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

  const getColorComponent = () => ({
    ref: `${ref}.fontColor`,
    component: 'color-picker',
    width: false,
  });

  const getFontWrapperComponent = () => ({
    fontWrapper: {
      component: 'inline-wrapper',
      items: {
        fontSize: {
          ...getFontSizeComponent(),
        },
        fontColor: {
          ...getColorComponent(),
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
          ...getFontFamilyComponent(ref, fontResolver),
        },
        ...getFontWrapperComponent(ref, fontResolver),
      },
    },
  };
};

export const getChartFontResolver = (theme, translator, chartId, createFontResolver) =>
  createFontResolver({
    theme,
    translator,
    config: {
      id: chartId,
      paths: ['axis.title', 'axis.label.name', 'label.value'],
    },
  });

const overrides = (key, layout) => (layout.components || []).find((c) => c.key === key);

export const getAxisTitleSettings = (chartId, theme, layout) => ({
  style: {
    text: {
      fontFamily:
        overrides('axis', layout)?.axis?.title?.fontFamily ?? theme.getStyle(chartId, 'axis.title', 'fontFamily'),
      fontSize: overrides('axis', layout)?.axis?.title?.fontSize ?? theme.getStyle(chartId, 'axis.title', 'fontSize'),
      fill: overrides('axis', layout)?.axis?.title?.fontColor?.color ?? theme.getStyle(chartId, 'axis.title', 'color'),
    },
  },
});
export const getAxisLabelSettings = (chartId, theme, layout) => ({
  settings: {
    labels: {
      fontFamily:
        overrides('axis', layout)?.axis?.label?.name?.fontFamily ??
        theme.getStyle(chartId, 'axis.label.name', 'fontFamily'),
      fontSize:
        overrides('axis', layout)?.axis?.label?.name?.fontSize ??
        theme.getStyle(chartId, 'axis.label.name', 'fontSize'),
      fill:
        overrides('axis', layout)?.axis?.label?.name?.fontColor?.color ??
        theme.getStyle(chartId, 'axis.label.name', 'color'),
    },
  },
});

export const getValueLabelSettings = (chartId, theme, layout, shouldParse) => {
  const fontFamily =
    overrides('value', layout)?.label?.value?.fontFamily ?? theme.getStyle(chartId, 'label.value.name', 'fontFamily');
  let fontSize =
    overrides('value', layout)?.label?.value?.fontSize ?? theme.getStyle(chartId, 'label.value.size', 'fontSize');
  if (shouldParse) {
    fontSize = parseFloat(fontSize);
  }
  const fill =
    overrides('value', layout)?.label?.value?.fontColor?.color ?? theme.getStyle(chartId, 'label.value.color', 'color');
  return {
    fontFamily,
    fontSize,
    fill,
  };
};

export default ChartStyleComponent;
