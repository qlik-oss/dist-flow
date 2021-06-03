import { colorService as createColorService } from '@qlik/chart-modules';

const hasBase = (i) => i.baseColor || (i.coloring && i.coloring.baseColor);

function useBaseColors(layout) {
  const { qDimensionInfo, qMeasureInfo } = layout.qUndoExclude.qHyperCube;

  const hasDimensionBase = qDimensionInfo.some(hasBase);
  const hasMeasureBase = qMeasureInfo.some(hasBase);

  const base = layout.color.point.useBaseColors;

  if ((base === 'measure' && !hasMeasureBase) || (base === 'dimension' && !hasDimensionBase)) {
    return 'off';
  }

  return base;
}

export default function create({ app, layout, localeInfo, model, picasso, theme, translator }) {
  return createColorService({
    app,
    model,
    picasso,
    translator,
    config: {
      localeInfo,
      theme,
      key: 'color', // KEYS.SCALE.MAIN.COLOR, KEYS.SCALE.COLOR
    },
    createConfig: () => ({
      layout,
      hc: layout.qUndoExclude.qHyperCube,
      legendProps: layout.legend,
      colorProps: {
        ...layout.color.point,
        useBaseColors: useBaseColors(layout),
      },
    }),
  });
}
