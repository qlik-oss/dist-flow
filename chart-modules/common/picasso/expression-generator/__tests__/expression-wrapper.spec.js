import '../../../../../../test/unit/node-setup';
import chai from 'chai';
import ExpressionWrapper from '../expression-wrapper';

const expect = chai.expect;

describe('ExpressionWrapper ', () => {
  const wrapExpression = ExpressionWrapper.wrapExpression;
  const wrapStart = '[';
  const wrapEnd = ']';

  function wrapped(expression) {
    return wrapStart + expression + wrapEnd;
  }

  it('should not touch a simple expression, but only wrap it in brackets', () => {
    const expression = '=Year';
    expect(wrapExpression(expression)).to.equal(wrapped(expression));
  });

  it('should add additional brackets around expressions with start brackets', () => {
    let expression = '[Year';
    expect(wrapExpression(expression), 'starting with start brackets').to.equal(wrapped(expression));

    expression = '[[[[';
    expect(wrapExpression(expression, 'using only start brackets')).to.equal(wrapped(expression));
  });

  it('should add additional end brackets for all end brackets', () => {
    let expression = ']Year';
    expect(wrapExpression(expression), 'starting with end brackets').to.equal(wrapped(`]${expression}`));

    expression = ']]';
    expect(wrapExpression(expression, 'using only end brackets')).to.equal(wrapped(`]]${expression}`));
  });
});
