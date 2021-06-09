
import chai from 'chai';
import CubeGenerator from '../waterfallchart-cube-generator-by-measures';

const expect = chai.expect;
describe('Cube generator', () => {
  describe('getGeneratedDimensionPath', () => {
    it('should return correct value in case 1', () => {
      expect(CubeGenerator.getGeneratedDimensionPath(0)).to.equal('qDimensionInfo/0');
    });
    it('should return correct value in case 2', () => {
      expect(CubeGenerator.getGeneratedDimensionPath(1)).to.equal('qDimensionInfo/1');
    });
  });
  describe('getGeneratedMeasurePath', () => {
    it('should return correct value in case 1', () => {
      expect(CubeGenerator.getGeneratedMeasurePath(0)).to.equal('qMeasureInfo/0');
    });
    it('should return correct value in case 2', () => {
      expect(CubeGenerator.getGeneratedMeasurePath(1)).to.equal('qMeasureInfo/1');
    });
  });
  describe('generateHyperCube', () => {
    let layout;
    const positiveColor = '#0000ff';
    const negativeColor = '#ff0000';
    const subtotalColor = '#c3c3c3';
    const normal = 'NORMAL';
    const inverse = 'INVERSE';
    const subtotal = 'SUBTOTAL';
    const measure1 = 'Measure 1';
    const measure2 = 'Measure 2';
    const subtotal1 = 'Subtotal 1';
    beforeEach(() => {
      layout = {
        qHyperCube: {
          qMeasureInfo: [],
          qDataPages: [{ qMatrix: [] }],
        },
        color: {
          positiveValue: { paletteColor: { color: positiveColor, index: -1 } },
          negativeValue: { paletteColor: { color: negativeColor, index: -1 } },
          subtotal: { paletteColor: { color: subtotalColor, index: -1 } },
        },
        qDef: {
          isCustomFormatted: false,
        },
      };
    });
    it('should return correct value in case 1.1', () => {
      layout.qHyperCube.qMeasureInfo[0] = { valueType: normal, subtotal: {}, qFallbackTitle: measure1 };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [{ qNum: 100, qText: '15G' }];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(1);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: positiveColor },
        { qNum: 0 },
        { qNum: 100 },
        { qNum: 100, qText: '15G' },
      ]);
    });
    it('should return correct value in case 1.2', () => {
      layout.qHyperCube.qMeasureInfo[0] = { valueType: inverse, subtotal: {}, qFallbackTitle: measure1 };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [{ qNum: 100, qText: '20M' }];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(1);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: negativeColor },
        { qNum: 0 },
        { qNum: -100 },
        { qNum: -100, qText: '20M' },
      ]);
    });
    it('should return correct value in case 1.3', () => {
      layout.qHyperCube.qMeasureInfo[0] = { valueType: subtotal, subtotal: {}, qFallbackTitle: measure1 };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [{ qNum: 100, qText: '25K' }];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(1);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: subtotalColor },
        { qNum: 0 },
        { qNum: 100 },
        { qNum: 100, qText: '25K' },
      ]);
    });
    it('should return correct value in case 1.4', () => {
      layout.qHyperCube.qMeasureInfo[0] = {
        valueType: normal,
        subtotal: { enable: true, label: subtotal1 },
        qFallbackTitle: measure1,
      };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [{ qNum: 100, qText: '30' }];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(2);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: positiveColor },
        { qNum: 0 },
        { qNum: 100 },
        { qNum: 100, qText: '30' },
      ]);
      expect(hypercube.qDataPages[0].qMatrix[1]).to.deep.equal([
        { qElemNumber: 1, qText: subtotal1 },
        { qText: subtotalColor },
        { qNum: 0 },
        { qNum: 100 },
        { qNum: 100, qText: '100' },
      ]);
    });
    it('should return correct value in case 1.5', () => {
      layout.qHyperCube.qMeasureInfo[0] = {
        valueType: inverse,
        subtotal: { enable: true, label: subtotal1 },
        qFallbackTitle: measure1,
      };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [{ qNum: 100, qText: '35' }];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(2);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: negativeColor },
        { qNum: 0 },
        { qNum: -100 },
        { qNum: -100, qText: '35' },
      ]);
      expect(hypercube.qDataPages[0].qMatrix[1]).to.deep.equal([
        { qElemNumber: 1, qText: subtotal1 },
        { qText: subtotalColor },
        { qNum: 0 },
        { qNum: -100 },
        { qNum: -100, qText: '-100' },
      ]);
    });
    it('should return correct value in case 1.6', () => {
      layout.qHyperCube.qMeasureInfo[0] = {
        valueType: subtotal,
        subtotal: { enable: true, label: subtotal1 },
        qFallbackTitle: measure1,
      };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [{ qNum: 100, qText: '40' }];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(1);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: subtotalColor },
        { qNum: 0 },
        { qNum: 100 },
        { qNum: 100, qText: '40' },
      ]);
    });
    it('should return correct value in case 2.1', () => {
      layout.qHyperCube.qMeasureInfo[0] = { valueType: normal, subtotal: {}, qFallbackTitle: measure1 };
      layout.qHyperCube.qMeasureInfo[1] = { valueType: normal, subtotal: {}, qFallbackTitle: measure2 };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [
        { qNum: 100, qText: '45' },
        { qNum: -20, qText: '50' },
      ];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(2);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: positiveColor },
        { qNum: 0 },
        { qNum: 100 },
        { qNum: 100, qText: '45' },
      ]);
      expect(hypercube.qDataPages[0].qMatrix[1]).to.deep.equal([
        { qElemNumber: 1, qText: measure2 },
        { qText: negativeColor },
        { qNum: 100 },
        { qNum: 80 },
        { qNum: -20, qText: '50' },
      ]);
    });
    it('should return correct value in case 2.2', () => {
      layout.qHyperCube.qMeasureInfo[0] = { valueType: normal, subtotal: {}, qFallbackTitle: measure1 };
      layout.qHyperCube.qMeasureInfo[1] = { valueType: inverse, subtotal: {}, qFallbackTitle: measure2 };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [
        { qNum: 100, qText: '55' },
        { qNum: -20, qText: '60' },
      ];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(2);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: positiveColor },
        { qNum: 0 },
        { qNum: 100 },
        { qNum: 100, qText: '55' },
      ]);
      expect(hypercube.qDataPages[0].qMatrix[1]).to.deep.equal([
        { qElemNumber: 1, qText: measure2 },
        { qText: positiveColor },
        { qNum: 100 },
        { qNum: 120 },
        { qNum: 20, qText: '60' },
      ]);
    });
    it('should return correct value in case 2.3', () => {
      layout.qHyperCube.qMeasureInfo[0] = { valueType: normal, subtotal: {}, qFallbackTitle: measure1 };
      layout.qHyperCube.qMeasureInfo[1] = { valueType: subtotal, subtotal: {}, qFallbackTitle: measure2 };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [
        { qNum: 100, qText: '65' },
        { qNum: -20, qText: '70' },
      ];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(2);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: positiveColor },
        { qNum: 0 },
        { qNum: 100 },
        { qNum: 100, qText: '65' },
      ]);
      expect(hypercube.qDataPages[0].qMatrix[1]).to.deep.equal([
        { qElemNumber: 1, qText: measure2 },
        { qText: subtotalColor },
        { qNum: 0 },
        { qNum: -20 },
        { qNum: -20, qText: '70' },
      ]);
    });
    it('should return correct value in case 2.4', () => {
      layout.qHyperCube.qMeasureInfo[0] = { valueType: normal, subtotal: {}, qFallbackTitle: measure1 };
      layout.qHyperCube.qMeasureInfo[1] = {
        valueType: normal,
        subtotal: { enable: true, label: subtotal1 },
        qFallbackTitle: measure2,
      };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [
        { qNum: 100, qText: '75' },
        { qNum: -20, qText: '80' },
      ];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: positiveColor },
        { qNum: 0 },
        { qNum: 100 },
        { qNum: 100, qText: '75' },
      ]);
      expect(hypercube.qDataPages[0].qMatrix[1]).to.deep.equal([
        { qElemNumber: 1, qText: measure2 },
        { qText: negativeColor },
        { qNum: 100 },
        { qNum: 80 },
        { qNum: -20, qText: '80' },
      ]);
      expect(hypercube.qDataPages[0].qMatrix[2]).to.deep.equal([
        { qElemNumber: 2, qText: subtotal1 },
        { qText: subtotalColor },
        { qNum: 0 },
        { qNum: 80 },
        { qNum: 80, qText: '80' },
      ]);
    });
    it('should return correct value in case 2.5', () => {
      layout.qHyperCube.qMeasureInfo[0] = { valueType: normal, subtotal: {}, qFallbackTitle: measure1 };
      layout.qHyperCube.qMeasureInfo[1] = {
        valueType: inverse,
        subtotal: { enable: true, label: subtotal1 },
        qFallbackTitle: measure2,
      };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [
        { qNum: 100, qText: '85' },
        { qNum: -20, qText: '90' },
      ];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: positiveColor },
        { qNum: 0 },
        { qNum: 100 },
        { qNum: 100, qText: '85' },
      ]);
      expect(hypercube.qDataPages[0].qMatrix[1]).to.deep.equal([
        { qElemNumber: 1, qText: measure2 },
        { qText: positiveColor },
        { qNum: 100 },
        { qNum: 120 },
        { qNum: 20, qText: '90' },
      ]);
      expect(hypercube.qDataPages[0].qMatrix[2]).to.deep.equal([
        { qElemNumber: 2, qText: subtotal1 },
        { qText: subtotalColor },
        { qNum: 0 },
        { qNum: 120 },
        { qNum: 120, qText: '120' },
      ]);
    });
    it('should return correct value in case 2.6', () => {
      layout.qHyperCube.qMeasureInfo[0] = { valueType: normal, subtotal: {}, qFallbackTitle: measure1 };
      layout.qHyperCube.qMeasureInfo[1] = {
        valueType: subtotal,
        subtotal: { enable: true, label: subtotal1 },
        qFallbackTitle: measure2,
      };
      layout.qHyperCube.qDataPages[0].qMatrix[0] = [
        { qNum: 100, qText: '95' },
        { qNum: -20, qText: '100' },
      ];
      CubeGenerator.generateHyperCube(layout);
      const hypercube = layout.generated.qHyperCube;
      expect(hypercube.qDimensionInfo.length).to.equal(2);
      expect(hypercube.qMeasureInfo.length).to.equal(3);
      expect(hypercube.qDataPages[0].qMatrix.length).to.equal(2);
      expect(hypercube.qDataPages[0].qMatrix[0]).to.deep.equal([
        { qElemNumber: 0, qText: measure1 },
        { qText: positiveColor },
        { qNum: 0 },
        { qNum: 100 },
        { qNum: 100, qText: '95' },
      ]);
      expect(hypercube.qDataPages[0].qMatrix[1]).to.deep.equal([
        { qElemNumber: 1, qText: measure2 },
        { qText: subtotalColor },
        { qNum: 0 },
        { qNum: -20 },
        { qNum: -20, qText: '100' },
      ]);
    });
  });
});
