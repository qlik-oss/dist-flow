import chai from 'chai';
import columnOrderAdapter from '../distributionplot-column-order-adapter';

const expect = chai.expect;
describe('distributionplot-column-order-adapter', () => {
  describe('toAfter', () => {
    it('should swap dimension if created before the reordering', () => {
      const innerDimension = 'inner';
      const outerDimension = 'outer';
      const hyperCube = {
        qDimensionInfo: [innerDimension, outerDimension],
        qEffectiveInterColumnSortOrder: [1, 0],
      };
      const layout = { qUndoExclude: { qHyperCube: hyperCube } };

      columnOrderAdapter.toAfter(layout);

      expect(hyperCube.qEffectiveInterColumnSortOrder).to.deep.equals([0, 1]);
      expect(hyperCube.qDimensionInfo).to.deep.equals([outerDimension, innerDimension]);
    });

    it('should not swap dimension if the new order is used', () => {
      const innerDimension = 'inner';
      const outerDimension = 'outer';
      const hyperCube = {
        qDimensionInfo: [outerDimension, innerDimension],
        qEffectiveInterColumnSortOrder: [0, 1],
      };
      const layout = { qUndoExclude: { qHyperCube: hyperCube } };

      columnOrderAdapter.toAfter(layout);

      expect(hyperCube.qEffectiveInterColumnSortOrder).to.deep.equals([0, 1]);
      expect(hyperCube.qDimensionInfo).to.deep.equals([outerDimension, innerDimension]);
    });
  });

  describe('toBefore', () => {
    it('should swap dimension if from after the reordering', () => {
      const innerDimension = 'inner';
      const outerDimension = 'outer';
      const hyperCube = {
        qDimensionInfo: [innerDimension, outerDimension],
        qEffectiveInterColumnSortOrder: [1, 0],
      };
      const layout = { qUndoExclude: { qHyperCube: hyperCube } };

      columnOrderAdapter.toBefore(layout);

      expect(hyperCube.qEffectiveInterColumnSortOrder).to.deep.equals([1, 0]);
      expect(hyperCube.qDimensionInfo).to.deep.equals([innerDimension, outerDimension]);
    });

    it('should not swap dimension if the old order is used', () => {
      const innerDimension = 'inner';
      const outerDimension = 'outer';
      const hyperCube = {
        qDimensionInfo: [outerDimension, innerDimension],
        qEffectiveInterColumnSortOrder: [0, 1],
      };
      const layout = { qUndoExclude: { qHyperCube: hyperCube } };

      columnOrderAdapter.toBefore(layout);

      expect(hyperCube.qEffectiveInterColumnSortOrder).to.deep.equals([1, 0]);
      expect(hyperCube.qDimensionInfo).to.deep.equals([innerDimension, outerDimension]);
    });
  });
});
