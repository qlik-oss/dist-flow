import ExpressionWrapper from '@qlik/common/picasso/expression-generator/expression-wrapper';
// import translator from '../../../../js/lib/translator';
import distributionPlotConstants from '../distributionplot-constants';

//
// Implementation details
//
function getElementIds() {
  return [distributionPlotConstants.SORTING_ELEMENT_MIN_ID, distributionPlotConstants.SORTING_ELEMENT_MAX_ID];
}

/**
 * Get a fractile or min/max expression, putting the dimensions/measures in the correct
 * place inside the expression.
 *
 * @param  {number} percentile given as a decimal value in the range 0 <= 1
 * @param  {string} innerDimString
 * @param  {string} outerDimString
 * @param  {string} innerMeasureString
 * @return {string} An expression which will sort the data on outer dimension's min/max/fractile value
 */
function getFractileExpression(percentile, innerDim, outerDim, innerMeasureString) {
  const totalAndAggr =
    'total {{<outerDimString>}} Aggr( {{innerMeasureString}}, {{outerDimString,}} {{innerDimString}} )';
  let fnName = 'Fractile';

  if (percentile === 0) {
    fnName = 'Min';
  } else if (percentile === 1) {
    fnName = 'Max';
  }

  const wrappedInnerDim = innerDim ? ExpressionWrapper.wrapExpression(innerDim) : '';
  const wrappedOuterDim = outerDim ? ExpressionWrapper.wrapExpression(outerDim) : '';

  const template = `${fnName}( ${totalAndAggr}, ${percentile} )`;
  const expression = template
    .replace(/{{innerDimString}}/g, wrappedInnerDim)
    .replace(/{{outerDimString}}/g, wrappedOuterDim)
    .replace(/{{<outerDimString>}}/g, outerDim ? `<${wrappedOuterDim}>` : '')
    .replace(/{{outerDimString,}}/g, outerDim ? `${wrappedOuterDim},` : '')
    .replace(/{{innerMeasureString}}/g, (innerMeasureString || '').replace(/^=/, ''));

  return expression;
}

function getElements(measureExpressions, dimensionExpressions, settings) {
  const innerDimString = dimensionExpressions[0];
  const outerDimString = dimensionExpressions[1];
  const innerMeasureString = measureExpressions[0];
  const expMin = getFractileExpression(0, innerDimString, outerDimString, innerMeasureString);
  const expMax = getFractileExpression(1, innerDimString, outerDimString, innerMeasureString);

  return [
    {
      id: distributionPlotConstants.SORTING_ELEMENT_MIN_ID,
      label: translator.get('properties.distributionPlot.min'),
      exp: expMin,
      isDefault: distributionPlotConstants.SORTING_ELEMENT_MIN_ID === settings.ELEMENT,
    },
    {
      id: distributionPlotConstants.SORTING_ELEMENT_MAX_ID,
      label: translator.get('properties.distributionPlot.max'),
      exp: expMax,
      isDefault: distributionPlotConstants.SORTING_ELEMENT_MAX_ID === settings.ELEMENT,
    },
  ];
}

const distplotSortingElementsRetriever = {
  getElementIds,
  getElements,
  getFractileExpression,
};

export default distplotSortingElementsRetriever;
