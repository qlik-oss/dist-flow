import { getValue } from '@qlik/chart-modules';
import isNumeric from '@qlik/common/extra/is-numeric';
import histogramUtils from '../histogram-utils';
import binSizeCalculator from './bin-size-calculator';

/**
 * Implementation details
 */

function getMappings(values) {
  const mappings = {};

  mappings.BinSize = {
    value: `,${values.binSize}`,
  };

  mappings.Label = {
    value: values.binOffset === 0 ? '' : ",'x'",
  };

  mappings.Offset = {
    value: values.binOffset === 0 ? '' : `,${values.binOffset}`,
  };

  mappings.Distinct = {
    value: values.distinct ? 'Distinct ' : '',
  };

  return mappings;
}

function getBinInfo(layout) {
  const dimInfo = getValue(layout, 'qHyperCube.qDimensionInfo.0', {});
  let qMin = dimInfo.qMin;
  let qMax = dimInfo.qMax;

  qMin = isNumeric(qMin) ? qMin : 1;
  qMax = isNumeric(qMax) ? qMax : 1;
  const binCount = histogramUtils.getDerivedBinCount(layout);

  return binSizeCalculator.calculateBinSize(qMin, qMax, binCount);
}

function getMappingValues(layout) {
  const auto = histogramUtils.isAutoBin(layout);
  const binMode = histogramUtils.getBinMode(layout);
  let binSize;
  let binOffset;
  let binCount;
  let binInfo;
  const distinct = histogramUtils.isCountDistinct(layout);

  if (auto || binMode === 'maxCount') {
    binInfo = getBinInfo(layout);

    binSize = binInfo.binSize;
    binOffset = binInfo.offset;
    binCount = binInfo.binCount;
  } else {
    binSize = histogramUtils.getBinSize(layout);
    binOffset = histogramUtils.getBinOffset(layout);
  }

  return {
    binSize,
    binOffset,
    binCount,
    distinct,
  };
}

const histogramMappings = {
  getMappingValues,
  getMappings,
};

export default histogramMappings;
