/**
 * Configuration for disclaimers
 *
 */

/**
 * Placement on chart
 */
const ALIGNMENT = {
  CENTER: 0,
  BOTTOM: 1,
};

/**
 * Configuration of all disclaimers
 *
 * label - key for translation
 * alignment - Placement on chart
 * default - Supported by default. If 'false' the disclaimer needs to be set to 'true' in supportedDisclaimers to be valid
 */
const DISCLAIMERS = [
  {
    label: 'NoDataExist',
    alignment: ALIGNMENT.CENTER,
    default: true,
  },
  {
    label: 'OnlyNanData',
    alignment: ALIGNMENT.CENTER,
    default: true,
  },
  {
    label: 'OnlyNegativeOrZeroValues',
    alignment: ALIGNMENT.CENTER,
    default: false,
  },
  {
    label: 'LimitedData',
    alignment: ALIGNMENT.BOTTOM,
    default: false,
  },
  {
    label: 'OnlyNanColor',
    alignment: ALIGNMENT.BOTTOM,
    default: false,
  },
  {
    label: 'NegativeOrZeroValues',
    alignment: ALIGNMENT.BOTTOM,
    default: false,
  },
  {
    label: 'DataRangeIncludingZero',
    alignment: ALIGNMENT.BOTTOM,
    default: false,
  },
];

export default {
  DISCLAIMERS,
  ALIGNMENT,
};
