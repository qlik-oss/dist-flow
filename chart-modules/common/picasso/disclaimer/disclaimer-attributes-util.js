/**
 * Disclaimer utility for setting attributes needed for the disclaimer component
 *
 * @exports objects.picasso/disclaimer/disclaimer-attributes-utils
 */
import DisclaimersConfig from './disclaimers-config';

/**
 * Checks if the data range in measures and axis spans over the value 0
 * @ignore
 * @param measureAxis
 * @param measureInfo
 * @returns {boolean} True if the data range in any measure or the given axis spans over 0
 */
function hasDataRangeIncludingZero(measureAxis, measureInfo) {
  const len = measureInfo.length;
  let i;
  let explicitMinOn;
  let explicitMaxOn;
  let min;
  let max;
  if (measureAxis) {
    explicitMinOn =
      !measureAxis.autoMinMax &&
      (measureAxis.minMax === 'min' || measureAxis.minMax === 'minMax') &&
      measureAxis.min !== null &&
      !Number.isNaN(+measureAxis.min);
    explicitMaxOn =
      !measureAxis.autoMinMax &&
      (measureAxis.minMax === 'max' || measureAxis.minMax === 'minMax') &&
      measureAxis.max !== null &&
      !Number.isNaN(+measureAxis.max);
  }
  min = Number.MAX_VALUE;
  max = -Number.MAX_VALUE;

  // return true if data contains zero
  for (i = 0; i < len; i++) {
    min = Math.min(min, measureInfo[i].qMin);
    max = Math.max(max, measureInfo[i].qMax);
    if (min <= 0 && max >= 0) {
      return true;
    }
  }

  // return true if axis explicits contains zero
  min = explicitMinOn ? measureAxis.min : min;
  max = explicitMaxOn ? measureAxis.max : max;
  return min <= 0 && max >= 0;
}

function hasSubNodes(stackedDataPages) {
  return (
    stackedDataPages && stackedDataPages[0] && stackedDataPages[0].qData[0] && stackedDataPages[0].qData[0].qSubNodes
  );
}

const util = {
  getNoDataExistAttribute(qHyperCube) {
    return qHyperCube.qSize.qcy * qHyperCube.qSize.qcx === 0;
  },

  getRequireNumericDimensionAttribute(qHyperCube, opts) {
    return (
      opts.requireNumericDimension &&
      qHyperCube.qDimensionInfo.length > 0 &&
      qHyperCube.qDimensionInfo[0].qTags.indexOf('$numeric') === -1
    );
  },

  getLimitedDataAttribute(qHyperCube, opts) {
    let result = false;
    let maxNbrOfDimensions;
    if (!qHyperCube) {
      result = opts.explicitLimitedData === true;
    } else if (opts.explicitLimitedData !== undefined) {
      result = opts.explicitLimitedData === true;
    } else if (qHyperCube.qDataPages && qHyperCube.qDataPages[0]) {
      result = !opts.paging && qHyperCube.qSize.qcy > qHyperCube.qDataPages[0].qMatrix.length;
    } else if (hasSubNodes(qHyperCube.qStackedDataPages)) {
      maxNbrOfDimensions = opts.maxNbrOfDimensions ? opts.maxNbrOfDimensions : 2;
      if (qHyperCube.qDimensionInfo.length >= maxNbrOfDimensions) {
        result = qHyperCube.qStackedDataPages[0].qData[0].qSubNodes.some((node) => node.qDown > 0);
      } else {
        result =
          qHyperCube.qStackedDataPages[0].qData[0].qSubNodes.length < qHyperCube.qStackedDataPages[0].qArea.qHeight;
      }
    }
    return result;
  },

  getNegativeOrZeroValuesAttribute(qHyperCube, opts) {
    return !opts.supportNegative && qHyperCube.qMeasureInfo.some((measure) => measure.qMin <= 0);
  },

  getOnlyNegativeOrZeroValuesAttribute(qHyperCube, opts) {
    return (
      (!opts.supportNegative &&
        qHyperCube.qMeasureInfo.every((measure) => measure.qMax <= 0 && measure.qMax >= measure.qMin)) ||
      qHyperCube.qSize.qcy === 0
    );
  },

  getOnlyNanDataAttribute(qHyperCube, opts) {
    if (opts.explicitOnlyNanData !== undefined) {
      return opts.explicitOnlyNanData;
    }

    return qHyperCube.qMeasureInfo.every((measure) => measure.qMax < measure.qMin || measure.qMax === 'NaN');
  },

  getDataRangeIncludingZeroAttribute(data, opts) {
    return !opts.supportRangeOverZero && hasDataRangeIncludingZero(data.measureAxis, data.qHyperCube.qMeasureInfo);
  },

  /**
   * Apply attributes that configures disclaimers for a charts
   * @param {Object} options - Options
   * @param {Object} data - Layout data
   * @returns {Object}
   */
  applyAttributes(options, data) {
    const opts = options || {};
    const dataAttributes = {};

    opts.supportNegative = opts.supportNegative === undefined ? true : opts.supportNegative;
    opts.supportRangeOverZero = opts.supportRangeOverZero === undefined ? true : opts.supportRangeOverZero;

    DisclaimersConfig.DISCLAIMERS.forEach((config) => {
      dataAttributes[config.label] = false;
    });
    if (!data || !data.qHyperCube) {
      return dataAttributes;
    }
    dataAttributes.NoDataExist = this.getNoDataExistAttribute(data.qHyperCube);
    if (dataAttributes.NoDataExist) {
      return dataAttributes;
    }
    dataAttributes.RequireNumericDimension = this.getRequireNumericDimensionAttribute(data.qHyperCube, opts);
    if (dataAttributes.RequireNumericDimension) {
      return dataAttributes;
    }
    dataAttributes.LimitedData = this.getLimitedDataAttribute(data.qHyperCube, opts);
    dataAttributes.NegativeOrZeroValues = this.getNegativeOrZeroValuesAttribute(data.qHyperCube, opts);
    dataAttributes.OnlyNegativeOrZeroValues = this.getOnlyNegativeOrZeroValuesAttribute(data.qHyperCube, opts);
    dataAttributes.OnlyNanData = this.getOnlyNanDataAttribute(data.qHyperCube, opts);
    dataAttributes.DataRangeIncludingZero = this.getDataRangeIncludingZeroAttribute(data, opts);

    return dataAttributes;
  },
};
export default util;
