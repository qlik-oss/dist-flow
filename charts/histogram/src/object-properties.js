import BINNING_DEFAULTS from './binning-defaults';

/**
 * Color information structure. Holds the actual color and index in palette.
 * @typedef {object} paletteColor
 * @property {string} color - Color as hex string (mandatory if index: -1)
 * @property {number} index - Index in palette
 */

/**
 * Styling settings for reference line
 * @typedef {object} refLineStyle
 * @property {number} [lineThickness=2] Set the thickness for this reference line.
 * @property {string} [lineType=''] Set the dash type for this reference line.
 */

/**
 * @typedef {object} refLine
 * @property {boolean|ValueExpression} show=true Set to true to display this reference line.
 * @property {string} label Reference line label.
 * @property {boolean} [showLabel=true] Set to true to show the label of this reference line.
 * @property {boolean} [showValue=true] Set to true to show the value of this reference line.
 * @property {paletteColor} paletteColor
 * @property {refLineStyle} [style] - Styling settings for reference line
 * @property {boolean} [coloredBackground=false] Set to true to fill the label and/or value of this reference line with this color
 */

/**
 * @namespace properties
 * @entry
 */
const properties = {
  /**
   * Current version of this generic object definition.
   * @type {string}
   * @default
   */
  version: process.env.PACKAGE_VERSION,

  /**
   * Extends `HyperCubeDef`, see Engine API: `HyperCubeDef`.
   * @extends {HyperCubeDef}
   */
  qHyperCubeDef: {
    qDimensions: [],
    qMeasures: [],
    qMode: 'S',
    qAlwaysFullyExpanded: true,
    qSuppressZero: false,
    qSuppressMissing: true,
  },
  /**
   * Bin settings.
   * @type {object}
   */
  bins: {
    /**
     * Auto mode generates a nice looking histogram without special parameters.
     * @type {boolean}
     * @default
     */
    auto: BINNING_DEFAULTS.AUTO,
    /**
     * Number of bars to be displayed, used when binMode is set to 'maxCount'.
     * @type {number}
     * @default
     */
    binCount: '',
    /**
     * The width of the bars, used when binMode is set to 'size'.
     * @type {number}
     * @default
     */
    binSize: BINNING_DEFAULTS.BIN_SIZE,
    /**
     * Used to know where to start displaying bars on x-axis.
     * @type {number}
     * @default
     */
    offset: BINNING_DEFAULTS.OFFSET,
    /**
     * Shows unique values.
     * @type {boolean}
     * @default
     */
    countDistinct: BINNING_DEFAULTS.COUNT_DISTINCT,
    /**
     * MaxCount - Able to adjust the maximum number of bars to be displayed. size - Able to adjust size of bars and offset from x-axis.
     * @type {string}
     * @default
     */
    binMode: BINNING_DEFAULTS.BIN_MODE,
  },
  /**
   * Color settings.
   * @type {object}
   */
  color: {
    /**
     * @type {object}
     */
    bar: {
      /**
       * The paletteColor object is used to define the bar color.
       * @type {paletteColor}
       * @default { index: 6 }
       */
      paletteColor: {
        index: 6,
        color: '#4477aa',
      },
    },
  },
  /**
   * Data points
   * @type {object}
   */
  dataPoint: {
    /**
     * Show labels on bars
     * @type {boolean}
     * @default
     */
    showLabels: false,
  },
  /**
   * Dimension axis settings.
   * @type {object}
   */
  dimensionAxis: {
    /**
     * Axis docking position
     * @type {'near'|'far'}
     * @default "near"
     */
    dock: 'near',
    /**
     * Label orientation
     * @type {'auto'}
     * @default
     */
    label: 'auto',
    /**
     * Labels and title
     * @type {'all'|'labels'|'title'|'none'}
     */
    show: 'all',
  },
  /**
   * Measure axis settings.
   * @type {object}
   */
  measureAxis: {
    /**
     * Automatic max/min
     * @type {boolean}
     * @default
     */
    autoMinMax: true,
    /**
     * Axis docking position
     * @type {'near'|'far'}
     * @default "near"
     */
    dock: 'near',
    /**
     * Label to show on the measure axis, if left empty it defaults to 'Frequency'
     * @type {(string|StringExpression)=}
     * @default
     */
    label: '',
    /**
     * Axis max value. `"autoMinMax"` must be set to false and `"minMax"`
     * must be set to `"max"` or `"minMax"` to use this property
     * @type {number|ValueExpression}
     * @default
     */
    max: 10,
    /**
     * Axis min value. `"autoMinMax"` must be set to false and `"minMax"`
     * must be set to `"min"` or `"minMax"` to use this property
     * @type {number|ValueExpression}
     * @default
     */
    min: 0,
    /**
     * Set custom max/min
     * @type {'min'|'max'|'minMax'}
     * @default "min"
     */
    minMax: 'min',
    /**
     * Labels and title
     * @type {'all'|'labels'|'title'|'none'}
     * @default "all"
     */
    show: 'all',
    /**
     * Axis scale
     * @type {number}
     * @default
     */
    spacing: 1,
  },
  /**
   * Grid lines settings.
   * @type {object}
   */
  gridLine: {
    /**
     * Automatic grid line spacing.
     * @type {boolean}
     * @default
     */
    auto: true,
    /**
     * Grid line spacing. Used only when auto is set to false.
     * @type {0|1|2|3}
     * @default
     */
    spacing: 2,
  },
  /**
   * Reference lines settings
   * @type {object}
   */
  refLine: {
    /**
     * Array of measure based reference line definitions
     * @type {refLine[]}
     */
    refLines: [],
  },
  /**
   * Wrapper for sorting properties which will be set on the outer dimension.
   * @type {object}
   */
  sorting: {
    /**
     * Sort automatically
     * @type {true}
     * @default
     */
    autoSort: true,
  },
  /**
   * Show title for the visualization.
   * @type {boolean=}
   * @default
   */
  showTitles: true,
  /**
   * Visualization subtitle.
   * @type {(string|StringExpression)=}
   * @default
   */
  subtitle: '',
  /**
   * Visualization title.
   * @type {(string|StringExpression)=}
   * @default
   */
  title: '',
  /**
   * Visualization footnote.
   * @type {(string|StringExpression)=}
   * @default
   */
  footnote: '',
};

export default properties;
