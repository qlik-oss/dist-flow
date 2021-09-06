import extend from 'extend';
import { colorService as createColorService } from 'qlik-chart-modules';

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

function switchActiveDimIndex(byDimDef) {
  if (byDimDef?.activeDimensionIndex === 0) {
    byDimDef.activeDimensionIndex = 1;
  } else if (byDimDef?.activeDimensionIndex === 1) {
    byDimDef.activeDimensionIndex = 0;
  }
}

export default function create({ app, layout, localeInfo, model, picasso, environment }) {
  const { theme, translator } = environment;
  const colorSettings = extend(true, {}, layout.color.point);
  if (layout.qHyperCube.qDimensionInfo.length === 2) {
    switchActiveDimIndex(colorSettings.byDimDef); // compensate for that the distribution plot dimension are in an different order
  }
  return createColorService({
    app,
    model,
    picasso,
    translator,
    config: {
      localeInfo,
      theme,
      key: 'color', // KEYS.SCALE.MAIN.COLOR, KEYS.SCALE.COLOR
      definitionPath: '/qUndoExclude/qHyperCubeDef',
    },
    createConfig: () => ({
      layout,
      hc: layout.qUndoExclude.qHyperCube,
      legendProps: layout.legend,
      colorProps: {
        ...colorSettings,
        useBaseColors: useBaseColors(layout),
      },
    }),
  });
}
