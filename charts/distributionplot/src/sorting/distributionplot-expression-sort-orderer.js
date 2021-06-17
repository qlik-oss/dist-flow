import { getValue, setValue } from 'qlik-chart-modules';
import CONSTANTS from '../distributionplot-constants';

const SORT_BY_EXPRESSION_REF = `${CONSTANTS.SORT_CRITERIA}.sortByExpression`;

//
// Implementation details
//
function updateSortOrder(properties, prevProperties) {
  if (!prevProperties) {
    return;
  }

  const currentSortByExpression = getValue(properties, SORT_BY_EXPRESSION_REF);
  const currentIsSortByExpression = currentSortByExpression === -1 || currentSortByExpression === 1;

  if (!currentIsSortByExpression) {
    return;
  }

  const currentSortingElement = getValue(properties, CONSTANTS.SORTING_ELEMENT_ID);
  const prevSortingElement = getValue(prevProperties, CONSTANTS.SORTING_ELEMENT_ID);

  const hasPrevSortingElement = !!prevSortingElement;

  const currentSortingElementIsMin = currentSortingElement === CONSTANTS.SORTING_ELEMENT_MIN_ID;
  const currentSortingElementIsMax = currentSortingElement === CONSTANTS.SORTING_ELEMENT_MAX_ID;
  const prevSortingElementIsMin = prevSortingElement === CONSTANTS.SORTING_ELEMENT_MIN_ID;
  const prevSortingElementIsMAx = prevSortingElement === CONSTANTS.SORTING_ELEMENT_MAX_ID;
  const wasChangedFromMaxToMin = currentSortingElementIsMin && prevSortingElementIsMAx;
  const wasChangedFromMinToMax = currentSortingElementIsMax && (!hasPrevSortingElement || prevSortingElementIsMin);
  const prevSortByExpression = getValue(prevProperties, SORT_BY_EXPRESSION_REF);
  const prevWasSortByExpression = prevSortByExpression === -1 || prevSortByExpression === 1;

  const currentSortByExpressionIsAscending = currentSortByExpression === 1;

  const sortByExpressionToggledOnWithMaxElementAndAscendingSet =
    currentSortingElementIsMax && !prevWasSortByExpression && currentSortByExpressionIsAscending;

  if (wasChangedFromMaxToMin) {
    setValue(properties, SORT_BY_EXPRESSION_REF, 1);
  } else if (wasChangedFromMinToMax || sortByExpressionToggledOnWithMaxElementAndAscendingSet) {
    setValue(properties, SORT_BY_EXPRESSION_REF, -1);
  }
}

const expressionSortOrderer = {
  updateSortOrder,
};

export default expressionSortOrderer;
