const getStylingPanelDefinition = (bkgOptionsEnabled, styleOptions) => ({
  component: 'styling-panel',
  chartTitle: 'Object.BoxPlot',
  translation: 'LayerStyleEditor.component.styling',
  subtitle: 'LayerStyleEditor.component.styling',
  ref: 'components',
  useGeneral: true,
  useBackground: bkgOptionsEnabled,
  items: {
    axisTitleSection: {
      translation: 'properties.axis.title',
      component: 'panel-section',
      items: styleOptions.getOptions('axis', 'axis.title'),
    },
    axisLabelSection: {
      translation: 'properties.axis.label',
      component: 'panel-section',
      items: styleOptions.getOptions('axis', 'axis.label.name'),
    },
  },
});
export default getStylingPanelDefinition;
