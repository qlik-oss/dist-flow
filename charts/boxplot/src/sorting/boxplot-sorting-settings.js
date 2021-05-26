import extend from 'extend';
import BASE_SORTING_SETTINGS from '@qlik/common/picasso/sorting/base-derived/sorter-base-sorting-settings';

const BOXPLOT_SORTING_SETTINGS = extend(
  true,
  {
    BOX_MIDDLE: {
      ELEMENT: 'boxMiddle',
      SORT_BY_EXPRESSION: 1,
      SORT_BY_ASCII: 1,
      SORT_BY_NUMERIC: 1,
      SORT_BY_LOAD_ORDER: 1,
    },
  },
  BASE_SORTING_SETTINGS
);

export default BOXPLOT_SORTING_SETTINGS;
