/**
 * Settings for subtotal
 * @name subtotalProperties
 * @type object
 * @property {boolean} enable=false Option to add a subtotal after a measure.
 * @property {string} label='Subtotal' Label of the subtotal added after a measure.
 */

/**
 * Extends `NxInlineMeasureDef`, see Engine API: `NxInlineMeasureDef`.
 * @name InlineMeasureDef
 * @type object
 * @extends NxInlineMeasureDef
 * @property {subtotalProperties} subtotal subtotal settings.
 * @property {'NORMAL'|'INVERSE'|'SUBTOTAL'} valueType='NORMAL' Measure operation.
 */

/**
 * Extends `NxMeasure`, see Engine API: `NxMeasure`.
 * @name MeasureProperties
 * @type object
 * @extends NxMeasure
 * @property {InlineMeasureDef} qDef
 */

/**
 * Field attributes structure.
 * @name FieldAttributes
 * @type object
 * @property {string} dec - Defines the decimal separator.
 * @property {string} Fmt - Defines the format pattern that applies to qText.
 * @property {number} nDec - Number of decimals.
 * @property {string} Thou - Defines the thousand separator (if any).
 * @property {string} Type - Type of the field.
 * @property {number} UseThou - Defines whether or not a thousands separator must be used.
 */

/**
 * Color information structure. Holds the actual color and index in palette.
 * @name paletteColor
 * @type object
 * @property {string} color - Color as hex string (mandatory if index: -1)
 * @property {number} index - Index in palette
 */

/**
 * Styling settings for reference line
 * @name refLineStyle
 * @type object
 * @property {number} [lineThickness=2] Set the thickness for this reference line.
 * @property {string} [lineType=''] Set the dash type for this reference line.
 */

/**
 * @name refLine
 * @type object
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
    /** @type {MeasureProperties[]} */
    qMeasures: [],
    qMode: 'S',
    qInitialDataFetch: [{ qWidth: 200, qHeight: 10 }],
    qSuppressMissing: true,
  },
  /**
   * Color settings.
   * Most color options for visualizations are set in the color object in the options. You activate custom coloring by setting `"auto": false` which turns off auto-coloring.
   * If `"auto": true`, no other properties need to be defined in the color object.
   * Note: Some of the color properties are depending on which theme is currently being used.
   * @type {object}
   */
  color: {
    /**
     * Set to use automatic coloring.
     * When `"auto": true`, color settings are based on the visualization used and the number of dimensions
     * and measures, that is, the settings are not fixed, but are dependent on the data input.
     * @type {boolean}
     * @default
     */
    auto: true,
    /**
     * Positive value color.
     * @type {object}
     */
    positiveValue: {
      /**
       * paletteColor
       * @type {paletteColor}
       * @default { index: 6, color: null }
       */
      paletteColor: {
        index: 6,
        color: null,
      },
    },
    /**
     * Negative value color.
     * @type {object}
     */
    negativeValue: {
      /**
       * paletteColor
       * @type {paletteColor}
       * @default { index: -1, color: '#cc6677' }
       */
      paletteColor: {
        index: -1,
        color: '#cc6677',
      },
    },
    /**
     * Subtotal value color.
     * @type {object}
     */
    subtotal: {
      /**
       * paletteColor
       * @type {paletteColor}
       * @default { index: -1, color: '#c3c3c3' }
       */
      paletteColor: {
        index: -1,
        color: '#c3c3c3',
      },
    },
  },
  /**
   * Data point.
   * @type {object}
   */
  dataPoint: {
    /**
     * Show labels.
     * @type {boolean}
     * @default
     */
    showLabels: true,
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
     * @type {'auto'|'horizontal'|'tilted'}
     */
    label: 'auto',
    /**
     * Labels and title
     * @type {'labels'|'none'}
     * @default
     */
    show: 'labels',
  },
  /**
   * Grid lines settings.
   * @type {object}
   */
  gridlines: {
    /**
     * Automatic grid line spacing.
     * @type {boolean}
     * @default
     */
    auto: true,
    /**
     * Grid line spacing. Used only when auto is set to false.
     * @type {0|2|3}
     * @default
     */
    spacing: 2,
  },
  /**
   * Legend settings.
   * @type {object}
   */
  legend: {
    /**
     * Sets the legend position.
     * @type {'auto'|'right'|'left'|'bottom'|'top'}
     * @default 'auto'
     */
    dock: 'auto',
    /**
     * Set to show the legend.
     * @type {boolean}
     * @default
     */
    show: true,
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
     * @type {'labels'|'none'}
     * @default "labels"
     */
    show: 'labels',
    /**
     * Axis scale
     * @type {number}
     * @default
     */
    spacing: 1,
  },
  qDef: {
    /**
     * see Engine API: `FieldAttributes`.
     * @type {FieldAttributes=}
     */
    qNumFormat: {},
    /**
     * When enabled, the number format to use can be selected from multiple predefined formats based on the desired type (number, date).
     * @type {boolean}
     * @default
     */
    numFormatFromTemplate: true,
    /**
     * If true, the client formatting will be toggled off.
     * @type {boolean}
     * @default
     */
    isCustomFormatted: false,
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
