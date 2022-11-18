export const stylingPanelDefinition = (bkgOptionsEnabled) => {
  return {
    component: 'styling-panel',
    chartTitle: 'Object.Histogram',
    translation: 'LayerStyleEditor.component.styling',
    subtitle: 'LayerStyleEditor.component.styling',
    ref: 'components',
    useGeneral: true,
    useBackground: bkgOptionsEnabled,
  };
};