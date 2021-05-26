// import '../../../../../test/unit/node-setup';

import chai from 'chai';
import propsLogic from '../boxplot-properties-logic';

const expect = chai.expect;

describe('boxplot-properties-logic', () => {
  describe('onChangeCalcCond', () => {
    it('should copy qCalcCond to generated cubes', () => {
      const data = {
        boxplotDef: {
          qHyperCubeDef: {
            qCalcCond: 'qCalcCond',
            qCalcCondition: 'qCalcCondition',
          },
        },
        qUndoExclude: {
          box: {
            qHyperCubeDef: {},
          },
          outliers: {
            qHyperCubeDef: {},
          },
        },
      };

      propsLogic.onChangeCalcCond(data);

      expect(data.qUndoExclude.box.qHyperCubeDef.qCalcCond).to.equals('qCalcCond');
      expect(data.qUndoExclude.box.qHyperCubeDef.qCalcCondition).to.equals('qCalcCondition');
      expect(data.qUndoExclude.outliers.qHyperCubeDef.qCalcCond).to.equals('qCalcCond');
      expect(data.qUndoExclude.outliers.qHyperCubeDef.qCalcCondition).to.equals('qCalcCondition');
    });
  });
});
