/**
 * Gets definition of items that should be in the styling panel for the chart.
 * @param {*} flags
 * @param {*} styleOptions
 * @returns definition or undefined if nothing is toggled on by feature flags
 */
const getStylingItems = (flags, styleOptions) => {
  const items = {
    axisLabelSection: {
      translation: 'properties.axis.label',
      component: 'panel-section',
      items: styleOptions.getOptions('axis', 'axis.label.name'),
    },
    valueLabelSection: {
      translation: 'properties.value.label',
      component: 'panel-section',
      items: styleOptions.getOptions('value', 'label.value'),
    },
  };

  if (flags?.isEnabled('CLIENT_IM_3051')) {
    items.legendLabelSection = {
      translation: 'properties.legend.label',
      component: 'panel-section',
      items: styleOptions.getOptions('legend', 'legend.label'),
    };
  }

  return Object.keys(items).length > 0 ? items : undefined;
};

const getStylingPanelDefinition = (bkgOptionsEnabled, styleOptions, flags) => ({
  component: 'styling-panel',
  chartTitle: 'Object.WaterfallChart',
  translation: 'LayerStyleEditor.component.styling',
  subtitle: 'LayerStyleEditor.component.styling',
  ref: 'components',
  useGeneral: true,
  useBackground: bkgOptionsEnabled,
  items: getStylingItems(flags, styleOptions),
});

export default getStylingPanelDefinition;
