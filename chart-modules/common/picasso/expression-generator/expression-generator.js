import ExpressionWrapper from './expression-wrapper';
import ExpressionReplacer from './expression-replacer';

const ExpressionGenerator = {
  generateExpression,
};

// builds up mappings for the dimensions and measures and wraps the dimensions
// mappings = { mapping }
// mapping = {
// 	value: (string) the expression value to replace the key with,
// 	wrap: (boolean) if the expression should be cleaned and wrapped or not (usually if field)
//  variations: (Array) array of strings with variations on the same key that if the value is empty should also be empty
function generateExpression(template, mappings) {
  const explicitMappings = {};
  let expression;
  let variationExpressions;

  if (mappings) {
    for (const key in mappings) {
      const mapping = mappings[key];

      expression = mapping.wrap ? ExpressionWrapper.wrapExpression(mapping.value) : mapping.value;

      explicitMappings[key] = expression;

      const variations = mapping.variations || [];

      variations.forEach((variation) => {
        variationExpressions = assembleVariation(variation, expression, key);
        explicitMappings[variation] = variationExpressions;
      });
    }
  }

  return ExpressionReplacer.replaceExpressionTokens(template, explicitMappings);
}

// Internal functions

function assembleVariation(variation, value, key) {
  if (value === '') {
    return '';
  }

  const regExp = ExpressionReplacer.createRegExp(key, true, true);
  const stringArray = variation.split(regExp);
  let expression = '';

  stringArray.forEach((substring) => {
    expression += substring !== key ? substring : value;
  });

  return expression;
}

export default ExpressionGenerator;
