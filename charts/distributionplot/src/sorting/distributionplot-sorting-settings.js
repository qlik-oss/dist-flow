import extend from 'extend';
import BASE_SORTING_SETTINGS from '@qlik/common/picasso/sorting/base-derived/sorter-base-sorting-settings';

const SORTING_SETTINGS = extend(
  true,
  {
    DIST_MAX: {
      ELEMENT: 'distplot-exp-max', // This refers to the element returned from getElements() in distributionplot-sorting-elements-retriever.js
      SORT_BY_EXPRESSION: -1,
      SORT_BY_ASCII: 1,
      SORT_BY_NUMERIC: 1,
      SORT_BY_LOAD_ORDER: 1,
    },
  },
  BASE_SORTING_SETTINGS
);

export default SORTING_SETTINGS;
