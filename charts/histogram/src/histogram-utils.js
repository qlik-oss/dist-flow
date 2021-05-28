import { getValue } from '@qlik/chart-modules';
import isInteger from '@qlik/common/extra/is-integer';
import isNumeric from '@qlik/common/extra/is-numeric';
import BINNING_DEFAULTS from './binning-defaults';

/**
 * Implementation details
 */

function getBinMode(layout) {
  return getValue(layout, 'bins.binMode', BINNING_DEFAULTS.BIN_MODE);
}

function getBinSize(layout) {
  return getValue(layout, 'bins.binSize', BINNING_DEFAULTS.BIN_SIZE);
}

function getDerivedBinSize(layout) {
  return getValue(layout, 'qUndoExclude.bins.binSize', BINNING_DEFAULTS.BIN_SIZE);
}

function getDerivedBinOffset(layout) {
  return getValue(layout, 'qUndoExclude.bins.offset', BINNING_DEFAULTS.OFFSET);
}

function getDerivedBinCount(layout) {
  const binCount = getValue(layout, 'qUndoExclude.bins.binCount', BINNING_DEFAULTS.BIN_COUNT);

  if (!isNumeric(binCount)) {
    return BINNING_DEFAULTS.BIN_COUNT;
  }

  if (binCount < 1) {
    return 1;
  }

  // The numbers of bins needs to be an integer, round it with Math.ceil
  if (!isInteger(binCount)) {
    return Math.ceil(binCount);
  }

  return binCount;
}

function getBinCount(layout) {
  return getValue(layout, 'bins.binCount', undefined);
}

function getBinOffset(layout) {
  return getValue(layout, 'bins.offset', BINNING_DEFAULTS.OFFSET);
}

function isAutoBin(layout) {
  return getValue(layout, 'bins.auto', BINNING_DEFAULTS.AUTO);
}

function isCountDistinct(layout) {
  return getValue(layout, 'bins.countDistinct', BINNING_DEFAULTS.COUNT_DISTINCT);
}

function isEmpty(v) {
  return v === undefined || v === null || v === '';
}

const histogramUtils = {
  getBinSize,
  getDerivedBinSize,
  getDerivedBinOffset,
  getDerivedBinCount,
  getBinCount,
  getBinOffset,
  isAutoBin,
  isCountDistinct,
  getBinMode,
  isEmpty,
};

export default histogramUtils;
