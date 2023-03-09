import ChartStyleComponent from '@qlik/common/extra/chart-style-component';

const getStylingPanelDefinition = (bkgOptionsEnabled, fontResolver, flags) => ({
  component: 'styling-panel',
  chartTitle: 'Object.WaterfallChart',
  translation: 'LayerStyleEditor.component.styling',
  subtitle: 'LayerStyleEditor.component.styling',
  ref: 'components',
  useGeneral: true,
  useBackground: bkgOptionsEnabled,
  items:
    flags && flags?.isEnabled('CLIENT_IM_3364')
      ? {
          axisLabelSection: {
            translation: 'properties.axis.label',
            component: 'panel-section',
            items: ChartStyleComponent('axis', 'axis.label.name', fontResolver),
          },
          valueLabelSection: {
            translation: 'properties.value.label',
            component: 'panel-section',
            items: ChartStyleComponent('value', 'label.value', fontResolver),
          },
        }
      : undefined,
});

export default getStylingPanelDefinition;
