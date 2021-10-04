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

function needMigrateOldSnapshotColorData(layout) {
  if (!layout.snapshotData) {
    return false;
  }
  if (layout.snapshotData.content?.chartData?.legendDataPage) {
    return false;
  }
  if (!layout.qUndoExclude?.legendData) {
    return false;
  }
  return true;
}
function migrateOldSnapshotColorData(layout) {
  // avoid modifying the existing layout object
  layout = extend({}, layout);
  layout.snapshotData = extend({}, layout.snapshotData);
  layout.snapshotData.content = extend({}, layout.snapshotData.content);
  layout.snapshotData.content.chartData = extend({}, layout.snapshotData.content.chartData);

  layout.snapshotData.content.chartData.legendDataPage = layout.qUndoExclude.legendData.qDataPages;
  return layout;
}

export default function create({ app, layout, localeInfo, model, picasso, environment }) {
  const { theme, translator } = environment;
  const colorSettings = extend(true, {}, layout.color.point);
  if (layout.qHyperCube.qDimensionInfo.length === 2) {
    switchActiveDimIndex(colorSettings.byDimDef); // compensate for that the distribution plot dimension are in an different order
  }
  if (needMigrateOldSnapshotColorData(layout)) {
    layout = migrateOldSnapshotColorData(layout);
  }
  if (!colorSettings.mode) {
    colorSettings.mode = 'primary';
  }

  return createColorService({
    app,
    model,
    picasso,
    translator,
    config: {
      localeInfo,
      theme,
      key: 'color',
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
