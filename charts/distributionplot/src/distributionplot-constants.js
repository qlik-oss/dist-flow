const CONSTANTS = {
  DATA_PATH: 'qUndoExclude',
  HYPERCUBE_DEF_PATH: 'qHyperCubeDef',
  HYPERCUBE_PATH: 'qHyperCube',
  CHART_ID: 'distributionPlot',

  AUTO_SORT: 'sorting.autoSort',
  SORT_CRITERIA: 'sorting.sortCriteria',
  SORTING_ELEMENT_ID: 'sorting.elementId',
  SORTING_ELEMENT_MIN_ID: 'distplot-exp-min',
  SORTING_ELEMENT_MAX_ID: 'distplot-exp-max',
  SORTING_EXPRESSION: 'sorting.expression',

  MAX_GLYPH_COUNT: 20,
  MAX_STACKED_VALUES: 3000, // Max nbr of values in outer dim

  HORIZONTAL: 'horizontal',

  BOX_PADDING: 2,
  POINT_BANDWIDTH_BASE_RATIO: 0.35, // Base value, with no scaling applied
  MAX_POINT_BASE_SIZE_PX: 34, // Base value, with no scaling applied
  MIN_POINT_PIXELS: 5,
  JITTER_PARAMETER: 3, // This is used in relation to point size

  BUBBLE_SCALES_MAX: 100,
};

Object.freeze(CONSTANTS);

export default CONSTANTS;
