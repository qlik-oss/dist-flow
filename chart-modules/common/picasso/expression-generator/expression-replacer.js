const ExpressionReplacer = {
  replaceExpressionTokens,
  createRegExp,
};

function replaceExpressionTokens(expression, tokenMappings, tokenIdentifiers) {
  const identifiers = {
    start: (tokenIdentifiers && tokenIdentifiers.start) || '{{',
    end: (tokenIdentifiers && tokenIdentifiers.end) || '}}',
  };

  let returnExpression = expression;
  let tokenExpression;
  let tokenString;

  for (const key in tokenMappings) {
    tokenExpression = tokenMappings[key];
    tokenString = identifiers.start + key + identifiers.end;

    returnExpression = returnExpression.replace(createRegExp(tokenString, true), tokenExpression);
  }

  return returnExpression;
}

function createRegExp(string, isGlobal, isGrouped) {
  const escapedString = escapeRegExp(string);
  const regexpString = isGrouped ? `(${escapedString})` : escapedString;
  return isGlobal ? new RegExp(regexpString, 'g') : new RegExp(regexpString);
}

function escapeRegExp(str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

export default ExpressionReplacer;
