export const getStylingPanelDefinition = (bkgOptionsEnabled) => {
  return {
    component: 'styling-panel',
    chartTitle: 'Object.DistributionPlot',
    translation: 'LayerStyleEditor.component.styling',
    subtitle: 'LayerStyleEditor.component.styling',
    ref: 'components',
    useGeneral: true,
    useBackground: bkgOptionsEnabled,
  };
};
