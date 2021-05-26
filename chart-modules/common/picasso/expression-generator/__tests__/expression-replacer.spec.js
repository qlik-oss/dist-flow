import '../../../../../../test/unit/node-setup';
import chai from 'chai';
import ExpressionReplacer from '../expression-replacer';

const expect = chai.expect;

describe('ExpressionReplacer ', () => {
  const replaceTokens = ExpressionReplacer.replaceExpressionTokens;

  it('should not touch an expression without any substring that matches the tokenIdentifiers', () => {
    const expression = '=Sum(Sales) + >foo< & {)//';

    expect(replaceTokens(expression)).to.equal(expression);
  });

  it('should touch an expression with a substring that matches the default tokenIdentifiers', () => {
    const expression = '>{{foo}}';
    const mapping = {
      foo: 'bar',
    };
    const mappedExpression = '>bar';

    expect(replaceTokens(expression, mapping)).to.equal(mappedExpression);
  });

  it('should touch an expression with a substring that matches custom tokenIdentifiers', () => {
    const expression = '>{{foo}}<';
    const mapping = {
      '{{foo}}': '//bar',
    };
    const identifiers = {
      start: '>',
      end: '<',
    };

    const mappedExpression = '//bar';

    expect(replaceTokens(expression, mapping, identifiers)).to.equal(mappedExpression);
  });

  it('should work with multiple mappings', () => {
    const expression = '>{{barbaz}}{{baz}}{{bar}}{{baz}}{{foobarbaz}}{bar}}{{foo}}{{foobarbaz}}<';
    const mapping = {
      foo: '{{a}}',
      bar: 'b',
      baz: 'c',
    };
    const mappedExpression = '>{{barbaz}}cbc{{foobarbaz}}{bar}}{{a}}{{foobarbaz}}<';

    expect(replaceTokens(expression, mapping)).to.equal(mappedExpression);
  });

  it('should work to stack the calls', () => {
    const expression = '={{OuterExpression}}';
    let mapping = {
      OuterExpression: '{{a}} + {{b}}',
    };
    const mappedExpression = '={{a}} + {{b}}';
    const realMappedExpression = replaceTokens(expression, mapping);

    expect(realMappedExpression).to.equal(mappedExpression);
    mapping = {
      a: '1',
      b: '3',
    };
    expect(replaceTokens(realMappedExpression, mapping)).to.equal('=1 + 3');
  });
});
