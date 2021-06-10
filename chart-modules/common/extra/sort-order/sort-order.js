import { getValue } from '@qlik/chart-modules';
import convertFunctions from './convert-functions';

const sortDropdownOptions = [
  {
    value: 'ascending',
    translation: 'properties.sorting.ascending',
  },
  {
    value: 'descending',
    translation: 'properties.sorting.descending',
  },
];

function getSortByPropertyDefinition(ref, translation, convertFuncs) {
  return {
    type: 'items',
    items: {
      toggled: {
        type: 'boolean',
        ref,
        translation,
        convertFunctions: convertFuncs.toggled,
      },
      order: {
        type: 'string',
        component: 'dropdown',
        ref,
        options: sortDropdownOptions,
        convertFunctions: convertFuncs.sorting,
        show(itemData) {
          return getValue(itemData, ref, 0) !== 0;
        },
      },
    },
  };
}

function state(ref, isReverseSortFn) {
  ref = ref || 'qSortByState';
  const cFuncs = {
    toggled: convertFunctions.booleanConvertFunctions(isReverseSortFn),
    sorting: convertFunctions.invertedEnumConvertFunctions(isReverseSortFn),
  };
  return getSortByPropertyDefinition(ref, 'properties.sorting.sortByState', cFuncs);
}

function frequency(ref, isReverseSortFn) {
  ref = ref || 'qSortByFrequency';
  const cFuncs = {
    toggled: convertFunctions.booleanConvertFunctions(isReverseSortFn),
    sorting: convertFunctions.invertedEnumConvertFunctions(isReverseSortFn),
  };
  return getSortByPropertyDefinition(ref, 'properties.sorting.sortByFrequency', cFuncs);
}

function ascii(ref, isReverseSortFn) {
  ref = ref || 'qSortByAscii';
  const cFuncs = {
    toggled: convertFunctions.booleanConvertFunctions(isReverseSortFn),
    sorting: convertFunctions.enumConvertFunctions(isReverseSortFn),
  };
  return getSortByPropertyDefinition(ref, 'properties.sorting.sortByAlphabetic', cFuncs);
}

function numeric(ref, isReverseSortFn) {
  ref = ref || 'qSortByNumeric';
  const cFuncs = {
    toggled: convertFunctions.booleanConvertFunctions(isReverseSortFn, -1),
    sorting: convertFunctions.enumConvertFunctions(isReverseSortFn),
  };
  return getSortByPropertyDefinition(ref, 'properties.sorting.sortByNumeric', cFuncs);
}

function expression(ref, isReverseSortFn) {
  ref = ref || 'qSortByExpression';
  const cFuncs = {
    toggled: convertFunctions.booleanConvertFunctions(isReverseSortFn),
    sorting: convertFunctions.enumConvertFunctions(isReverseSortFn),
  };
  const propDef = getSortByPropertyDefinition(ref, 'properties.sorting.sortByExpression', cFuncs);

  propDef.items.expression = {
    type: 'number',
    component: 'expression',
    expressionType: 'ValueExpr',
    ref: 'qExpression', // TODO not configurable
    translation: 'Common.Expression',
    defaultValue: '',
    show(itemData) {
      return getValue(itemData, ref, 0) !== 0;
    },
  };

  return propDef;
}

export default {
  state,
  ascii,
  numeric,
  expression,
  frequency,
};
