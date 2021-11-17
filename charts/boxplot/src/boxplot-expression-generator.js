import ExpressionWrapper from '@qlik/common/picasso/expression-generator/expression-wrapper';

function globalReplace(string) {
  return new RegExp(string, 'g');
}

function replaceDoubleCurlyReferences(expression, args) {
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in args) {
    expression = expression.replace(globalReplace(`{{${key}}}`), args[key]);
  }
  return expression;
}

function replaceDefaultExpression(expression, innerMeasure, innerDim, outerDim) {
  // Handle fields on the fly
  innerDim = ExpressionWrapper.wrapExpression(innerDim);
  outerDim = ExpressionWrapper.wrapExpression(outerDim || '');
  innerMeasure = innerMeasure.replace(/^=/, ''); // Remove intial '='

  return expression
    .replace(globalReplace('{{<OuterDim>}}'), outerDim ? `<${outerDim}>` : '')
    .replace(globalReplace('{{InnerMeasure}}'), innerMeasure)
    .replace(globalReplace('{{OuterDim,}}'), outerDim ? `${outerDim},` : '')
    .replace(globalReplace('{{OuterDim&}}'), outerDim ? `${outerDim} &` : '')
    .replace(globalReplace('{{OuterDim}}'), outerDim)
    .replace(globalReplace('{{InnerDim}}'), innerDim);
}

function getOutliersStatement(innerDim, measure, outerDim) {
  let expr;

  innerDim = ExpressionWrapper.wrapExpression(innerDim);

  if (outerDim) {
    outerDim = ExpressionWrapper.wrapExpression(outerDim);
    expr = `=aggr( ${measure}, ${innerDim}, ${outerDim} )`;
  } else {
    expr = `=aggr( ${measure}, ${innerDim} )`;
  }

  return expr;
}

export default {
  getOutliersStatement,
  replaceDefaultExpression,
  replaceDoubleCurlyReferences,
};
