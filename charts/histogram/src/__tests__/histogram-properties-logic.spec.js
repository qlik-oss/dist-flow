import chai from 'chai';
import propsLogic from '../histogram-properties-logic';

const expect = chai.expect;

describe('histogram-properties-logic', () => {
  let data;

  beforeEach(() => {
    data = {
      qHyperCubeDef: {
        qCalcCond: 'qCalcCond',
        qCalcCondition: 'qCalcCondition',
      },
      qUndoExclude: {
        box: {
          qHyperCubeDef: {},
        },
      },
    };
  });

  it('should append calculation condition data to generated cube', () => {
    propsLogic.onChangeCalcCond(data);
    expect(data.qUndoExclude.box.qHyperCubeDef.qCalcCond).to.equal('qCalcCond');
    expect(data.qUndoExclude.box.qHyperCubeDef.qCalcCondition).to.equal('qCalcCondition');
  });

  it('should handle when base cube is not availble', () => {
    const str = 'should not be overwritten';
    data.qHyperCubeDef = undefined;
    data.qUndoExclude.box.qHyperCubeDef.qCalcCond = str;
    data.qUndoExclude.box.qHyperCubeDef.qCalcCondition = str;
    propsLogic.onChangeCalcCond(data);
    expect(data.qUndoExclude.box.qHyperCubeDef.qCalcCond).to.equal(str);
    expect(data.qUndoExclude.box.qHyperCubeDef.qCalcCondition).to.equal(str);
  });

  it('should handle when data is not availble', () => {
    data = undefined;
    let fn = () => propsLogic.onChangeCalcCond(data);
    expect(fn).to.not.throw(TypeError);

    data = {};
    fn = () => propsLogic.onChangeCalcCond(data);
    expect(fn).to.not.throw(TypeError);

    data.qHyperCubeDef = {};
    data.qUndoExclude = {};
    expect(fn).to.not.throw(TypeError);
  });
});
