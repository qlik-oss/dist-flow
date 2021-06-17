import { setValue } from 'qlik-chart-modules';

function Sorter(getSettingsFn, getElementsFn) {
  this.getSettings = getSettingsFn;

  this.getElements = getElementsFn;
}

Sorter.prototype.applyAutoSorting = applyAutoSorting;
Sorter.prototype.applyDefaultCustomSorting = applyDefaultCustomSorting;
Sorter.prototype.applyCustomSorting = applyCustomSorting;

export default Sorter;

//
//	Implementation details
//
function applyAutoSorting(dimension) {
  const sortCriterias = dimension.qDef.qSortCriterias;

  if (!sortCriterias[0]) {
    sortCriterias.push({});
  }

  const sortCriteria = sortCriterias[0];
  const settings = this.getSettings();

  setValue(sortCriteria, 'qSortByExpression', settings.SORT_BY_EXPRESSION);
  setValue(sortCriteria, 'qSortByAscii', settings.SORT_BY_ASCII);
  setValue(sortCriteria, 'qSortByNumeric', settings.SORT_BY_NUMERIC);
  setValue(sortCriteria, 'qSortByLoadOrder', settings.SORT_BY_LOAD_ORDER);

  if (!sortCriteria.qExpression) {
    sortCriteria.qExpression = {};
  }

  const elements = this.getElements();
  const defaultElement = getDefaultElement(elements);

  sortCriteria.qExpression.qv = defaultElement.exp;
}

function applyDefaultCustomSorting(dimension, chartSorting) {
  applyAutoSorting.call(this, dimension);

  const elements = this.getElements();
  const defaultElement = getDefaultElement(elements);
  const sortCriteria = dimension.qDef.qSortCriterias[0];

  chartSorting.elementId = defaultElement.id;

  chartSorting.sortCriteria = {};

  setValue(chartSorting.sortCriteria, 'sortByExpression', sortCriteria.qSortByExpression);
  setValue(chartSorting.sortCriteria, 'sortByAscii', sortCriteria.qSortByAscii);
  setValue(chartSorting.sortCriteria, 'sortByNumeric', sortCriteria.qSortByNumeric);
  setValue(chartSorting.sortCriteria, 'sortByLoadOrder', sortCriteria.qSortByLoadOrder);
}

function applyCustomSorting(dimension, chartSorting) {
  const sortCriteria = dimension.qDef.qSortCriterias[0];

  setValue(sortCriteria, 'qSortByExpression', chartSorting.sortCriteria.sortByExpression);
  setValue(sortCriteria, 'qSortByAscii', chartSorting.sortCriteria.sortByAscii);
  setValue(sortCriteria, 'qSortByNumeric', chartSorting.sortCriteria.sortByNumeric);
  setValue(sortCriteria, 'qSortByLoadOrder', chartSorting.sortCriteria.sortByLoadOrder);

  if (sortCriteria.qSortByExpression !== 1 && sortCriteria.qSortByExpression !== -1) {
    return;
  }

  if (!sortCriteria.qExpression) {
    sortCriteria.qExpression = {};
  }

  if (chartSorting.elementId) {
    const elements = this.getElements();
    const element = getMatchingElement(elements, chartSorting.elementId);

    sortCriteria.qExpression.qv = element.exp;
  } else {
    sortCriteria.qExpression.qv = chartSorting.expression.qValueExpression.qExpr;
  }
}

//
// Privates
//
function getDefaultElement(elements) {
  const matchingElements = elements.filter((element) => element.isDefault);

  return matchingElements.length === 0 ? elements[0] : matchingElements[0];
}

function getMatchingElement(elements, elementId) {
  const matchingElements = elements.filter((measure) => measure.id === elementId);

  if (matchingElements.length === 0) {
    throwError(`Could not find any element matching the element '${elementId}'`);
  }

  return matchingElements[0];
}

function throwError(message) {
  throw new Error(`Sorter: ${message}`);
}
