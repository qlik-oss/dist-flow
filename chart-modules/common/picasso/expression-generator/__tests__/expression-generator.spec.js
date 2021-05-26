import '../../../../../../test/unit/node-setup';
import chai from 'chai';
import ExpressionGenerator from '../expression-generator';

const expect = chai.expect;

describe('ExpressionGenerator ', () => {
  it('should generate a simple expression based on a mapping', () => {
    const mapping = {
      Dimension: {
        value: 'City',
      },
    };
    const template = 'Gotham {{Dimension}}';
    const expectedResult = 'Gotham City';

    expect(ExpressionGenerator.generateExpression(template, mapping)).to.equal(expectedResult);
  });

  it('should generate an expression based on multiple mapping values', () => {
    const mapping = {
      First: {
        value: 'Salt',
      },
      Second: {
        value: 'Vinegar',
      },
    };
    const template = '{{First}} & {{Second}}';
    const expectedResult = 'Salt & Vinegar';

    expect(ExpressionGenerator.generateExpression(template, mapping)).to.equal(expectedResult);
  });

  it('should generate a wrapped expression', () => {
    const mapping = {
      Dim: {
        value: 'Date',
        wrap: true,
      },
    };
    const template = 'Year( {{Dim}} )';
    const expectedResult = 'Year( [Date] )';

    expect(ExpressionGenerator.generateExpression(template, mapping)).to.equal(expectedResult);
  });

  it('should deal with variations of a mapped expression', () => {
    const mapping = {
      OuterDim: {
        value: '',
        variations: [' <OuterDim>', 'OuterDim, '],
      },
      InnerDim: {
        value: 'Date',
        variations: ['(InnerDim)'],
      },
    };
    const template = 'aggr(total{{ <OuterDim>}} RowNo(), {{OuterDim, }}{{InnerDim}} & {{(InnerDim)}} ) = 1';
    const expectedResult = 'aggr(total RowNo(), Date & (Date) ) = 1';

    expect(ExpressionGenerator.generateExpression(template, mapping)).to.equal(expectedResult);
  });
});
