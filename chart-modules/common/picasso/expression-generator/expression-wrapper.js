const ExpressionWrapper = {
  wrapExpression,
};

function wrapExpression(expression) {
  const result = expression.replace(/\]/g, ']]');

  return result ? `[${result}]` : '';
}

export default ExpressionWrapper;
