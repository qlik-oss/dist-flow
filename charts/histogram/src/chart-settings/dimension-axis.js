import { getValue } from 'qlik-chart-modules';

const MAX_GLYPH_COUNT = 20;

//
// Implementation details
//

function getMaxGlyphCountForDimAxis(layout) {
  const qApprMaxGlyphCount = getValue(layout, 'qUndoExclude.box.qHyperCube.qDimensionInfo.0.qApprMaxGlyphCount', 0);
  return Math.min(MAX_GLYPH_COUNT, qApprMaxGlyphCount);
}

function createDimensionAxisSettings(layout) {
  return {
    settings: {
      labels: {
        maxGlyphCount: getMaxGlyphCountForDimAxis(layout),
      },
    },
  };
}

const DimensionAxis = {
  createSettings: createDimensionAxisSettings,
};

export default DimensionAxis;
