import { getValue } from '@qlik/chart-modules';
import histogramUtils from '../histogram-utils';

//
// Implementation details
//

function createDimensionScaleSettings(layout) {
  const isAutoMode = histogramUtils.isAutoBin(layout);
  const binMode = histogramUtils.getBinMode(layout);
  const binSize = histogramUtils.getDerivedBinSize(layout);
  let min;
  let max;

  if (isAutoMode || binMode === 'maxCount') {
    // User is expecting a specific number of bars so we make sure the axis
    // will hold this number of bars even if there are not that many bars in the data
    const offset = histogramUtils.getDerivedBinOffset(layout);

    const binCount = histogramUtils.getDerivedBinCount(layout);

    min = offset;
    max = offset + binCount * binSize;
  } else {
    const dimInfo = getValue(layout, 'qUndoExclude.box.qHyperCube.qDimensionInfo.0', {});
    min = dimInfo.qMin || 0;
    max = (dimInfo.qMax || 0) + binSize;
  }

  return {
    component: {
      type: 'linear',
      min,
      max,
    },
  };
}

const DimensionScale = {
  createSettings: createDimensionScaleSettings,
};

export default DimensionScale;
