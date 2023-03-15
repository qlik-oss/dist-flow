import chai from 'chai';
import waterfallChartPropertiesFn from '../waterfallchart-properties';
import waterfallUtils from '../waterfallchart-utils';

const expect = chai.expect;

describe('waterfallchart-properties', () => {
  let waterfallChartProperties;
  beforeAll(() => {
    const translator = {
      get: () => {},
    };
    const flags = {
      isEnabled: () => true,
    };
    const anything = {
      sense: {
        theme: {},
      },
    };
    const env = { translator, flags, anything };
    waterfallChartProperties = waterfallChartPropertiesFn(env);
  });

  describe('measures', () => {
    let measures;
    beforeAll(() => {
      measures = waterfallChartProperties.items.data.items.measures;
    });

    describe('value type', () => {
      let valueType;
      beforeAll(() => {
        valueType = measures.items.valueType;
      });

      it('should use correct ref', () => {
        expect(valueType.ref).to.equal('qDef.valueType');
      });
      it('should have correct options', () => {
        const options = valueType.options;
        expect(options.length).to.equal(3);
        expect(options[0].value).to.equal(waterfallUtils.valueTypes.NORMAL);
        expect(options[1].value).to.equal(waterfallUtils.valueTypes.INVERSE);
        expect(options[2].value).to.equal(waterfallUtils.valueTypes.SUBTOTAL);
      });
      it('should have correct default value', () => {
        expect(valueType.defaultValue).to.equal(waterfallUtils.valueTypes.NORMAL);
      });
    });

    describe('subtotal', () => {
      let subTotal;
      beforeAll(() => {
        subTotal = measures.items.subTotal;
      });

      it('should use correct ref', () => {
        expect(subTotal.ref).to.equal('qDef.subtotal.enable');
      });
      it('should have correct default value', () => {
        expect(subTotal.defaultValue).to.equal(false);
      });
      it('> show function should return correct value', () => {
        expect(subTotal.show({ qDef: { valueType: waterfallUtils.valueTypes.NORMAL } })).to.equal(true);
        expect(subTotal.show({ qDef: { valueType: waterfallUtils.valueTypes.INVERSE } })).to.equal(true);
        expect(subTotal.show({ qDef: { valueType: waterfallUtils.valueTypes.SUBTOTAL } })).to.equal(false);
      });
    });

    describe('subtotal label', () => {
      let subTotalLabel;
      beforeAll(() => {
        subTotalLabel = measures.items.subTotalLabel;
      });

      it('should use correct ref', () => {
        expect(subTotalLabel.ref).to.equal('qDef.subtotal.label');
      });
      /*
            it( "should have correct default value", function () {
                expect( subTotalLabel.defaultValue ).to.equal( "" );
            } );
            */
      it('> show function should return correct value', () => {
        expect(
          subTotalLabel.show({ qDef: { valueType: waterfallUtils.valueTypes.NORMAL, subtotal: { enable: true } } })
        ).to.equal(true);
        expect(
          subTotalLabel.show({ qDef: { valueType: waterfallUtils.valueTypes.INVERSE, subtotal: { enable: true } } })
        ).to.equal(true);
        expect(
          subTotalLabel.show({ qDef: { valueType: waterfallUtils.valueTypes.SUBTOTAL, subtotal: { enable: true } } })
        ).to.equal(false);
        expect(
          subTotalLabel.show({ qDef: { valueType: waterfallUtils.valueTypes.NORMAL, subtotal: { enable: false } } })
        ).to.equal(false);
        expect(
          subTotalLabel.show({ qDef: { valueType: waterfallUtils.valueTypes.INVERSE, subtotal: { enable: false } } })
        ).to.equal(false);
        expect(
          subTotalLabel.show({ qDef: { valueType: waterfallUtils.valueTypes.SUBTOTAL, subtotal: { enable: false } } })
        ).to.equal(false);
      });
    });
  });

  describe('colors', () => {
    let colors;
    beforeAll(() => {
      colors = waterfallChartProperties.items.settings.items.colors.items.colors;
    });

    describe('positive value color', () => {
      let positiveValueColor;
      beforeAll(() => {
        positiveValueColor = colors.items.positiveValueColor;
      });
      it('should use correct ref', () => {
        expect(positiveValueColor.ref).to.equal('color.positiveValue.paletteColor');
      });
      it('should have correct default value', () => {
        expect(positiveValueColor.defaultValue).to.deep.equal({ index: 6, color: null });
      });
    });

    describe('negative value color', () => {
      let negativeValueColor;
      beforeAll(() => {
        negativeValueColor = colors.items.negativeValueColor;
      });
      it('should use correct ref', () => {
        expect(negativeValueColor.ref).to.equal('color.negativeValue.paletteColor');
      });
      it('should have correct default value', () => {
        expect(negativeValueColor.defaultValue).to.deep.equal({ index: -1, color: '#cc6677' });
      });
    });

    describe('subtotal color', () => {
      let subtotalColor;
      beforeAll(() => {
        subtotalColor = colors.items.subtotalColor;
      });
      it('should use correct ref', () => {
        expect(subtotalColor.ref).to.equal('color.subtotal.paletteColor');
      });
      it('should have correct default value', () => {
        expect(subtotalColor.defaultValue).to.deep.equal({ index: -1, color: '#c3c3c3' });
      });
    });
  });
});
