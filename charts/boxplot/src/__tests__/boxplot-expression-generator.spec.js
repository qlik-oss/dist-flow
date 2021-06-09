
import chai from 'chai';
import BoxplotExpressionGenerator from '../boxplot-expression-generator';

const expect = chai.expect;

describe('BoxplotExpressionGenerator', () => {
  it('should get correct outliers expression for one the dimensional case', () => {
    const outliersExpression = BoxplotExpressionGenerator.getOutliersStatement('InnerDim', 'Measure');
    expect(outliersExpression).to.equal('=aggr( Measure, [InnerDim] )');
  });

  it('should get correct outliers expression for the two dimensional case', () => {
    const outliersExpression = BoxplotExpressionGenerator.getOutliersStatement('InnerDim', 'Measure', 'OuterDim');
    expect(outliersExpression).to.equal('=aggr( Measure, [InnerDim], [OuterDim] )');
  });

  it('should replace default expressions for the one dimensional case', () => {
    const expressionTemplate = 'aggr( {{InnerMeasure}}, {{InnerDim}} )';
    const innerMea = '=sum(sales)';
    const innerDim = 'Region';

    expect(BoxplotExpressionGenerator.replaceDefaultExpression(expressionTemplate, innerMea, innerDim)).to.equal(
      'aggr( sum(sales), [Region] )'
    );
  });

  it('should replace default expressions for the two dimensional case', () => {
    const expressionTemplate =
      'aggr( {{InnerMeasure}}, {{OuterDim,}} {{InnerDim}} ) + {{OuterDim&}} foo & {{OuterDim}}';
    const innerMea = '=sum(sales)';
    const innerDim = 'Region';
    const outerDim = 'Continent';

    expect(
      BoxplotExpressionGenerator.replaceDefaultExpression(expressionTemplate, innerMea, innerDim, outerDim)
    ).to.equal('aggr( sum(sales), [Continent], [Region] ) + [Continent] & foo & [Continent]');
  });

  it('should replace curly bracket references', () => {
    const expressionTemplate = 'aggr( {{foo}}, {{bar}} )';
    const referenceMap = {
      foo: 'test',
      bar: 'baz',
    };

    expect(BoxplotExpressionGenerator.replaceDoubleCurlyReferences(expressionTemplate, referenceMap)).to.equal(
      'aggr( test, baz )'
    );
  });
});
