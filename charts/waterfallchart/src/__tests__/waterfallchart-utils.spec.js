import chai from 'chai';
import waterfallUtils from '../waterfallchart-utils';

const expect = chai.expect;

describe('waterfall settings', () => {
  it('should be frozen', () => {
    expect(Object.isFrozen(waterfallUtils)).to.be.true;
  });

  it('should return correct chartId', () => {
    expect(waterfallUtils.chartID, 'waterfallUtils.chartID').to.be.equal('waterfallChart');
  });

  describe('value types', () => {
    const valueTypes = waterfallUtils.valueTypes;
    it('should be frozen', () => {
      expect(Object.isFrozen(valueTypes)).to.be.true;
    });

    it('should return correct values', () => {
      expect(valueTypes.NORMAL, 'valueTypes.NORMAL').to.be.equal('NORMAL');
      expect(valueTypes.INVERSE, 'valueTypes.INVERSE').to.be.equal('INVERSE');
      expect(valueTypes.SUBTOTAL, 'valueTypes.SUBTOTAL').to.be.equal('SUBTOTAL');
    });
  });
});
