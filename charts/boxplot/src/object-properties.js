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
  // TODO: setup version
  // version: process.env.PACKAGE_VERSION,

  /**
   * Settings specific to the boxplot
   * @type {object}
   */
  boxplotDef: {
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
     * Box plot calculation settings.
     * @type {object}
     */
    calculations: {
      /**
       * Use automatic calculations
       * @type {boolean}
       * @default
       */
      auto: true,
      /**
       * Auto calculation modes
       * @type {'tukey'|'fractiles'|'stdDev'}
       * @default
       */
      mode: 'tukey',
      /**
       * Box plot calculation settings
       * @type {object}
       */
      parameters: {
        /**
         * Number of interquartile ranges for whiskers.
         * @type {number}
         * @default
         */
        tukey: 1.5,
        /**
         * A number representing the two whisker fractiles as N and 1-N
         * @type {number}
         * @default
         */
        fractiles: 0.01,
        /**
         * Standard deviation spread for whiskers
         * @type {number}
         * @default
         */
        stdDev: 3,
      },
    },
    /**
     * @type {object}
     */
    color: {
      // TODO:
    },
    /**
     * Box plot elements settings.
     * @type {object}
     */
    elements: {
      /**
       * Box plot element settings
       * @type {object}
       */
      firstWhisker: {
        /**
         * Label for the boxplot element
         * @type {Qlik.Engine.StringExpressionContainer}
         * @default
         */
        name: '',
        /**
         * Expression for the boxplot element
         * @type {Qlik.Engine.ValueExpressionContainer}
         */
        expression: null,
      },
      boxStart: {
        name: '',
        expression: null,
      },
      boxMiddle: {
        name: '',
        expression: null,
      },
      boxEnd: {
        name: '',
        expression: null,
      },
      lastWhisker: {
        name: '',
        expression: null,
      },
      /**
       * Box plot outliers element
       * @type {object}
       */
      outliers: {
        /**
         * Show the outliers.
         * @type {boolean}
         */
        include: true,
        /**
         * @type {boolean}
         */
        sortOutliers: true,
      },
    },
    /**
     * @type {object}
     */
    presentation: {
      // TODO:
    },
    /**
     * Wrapper for sorting properties which will be set on the outer dimension.
     * @type {object}
     */
    sorting: {
      /**
       * Sort automatically
       * @type {boolean}
       * @default
       */
      autoSort: true,
    },
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
