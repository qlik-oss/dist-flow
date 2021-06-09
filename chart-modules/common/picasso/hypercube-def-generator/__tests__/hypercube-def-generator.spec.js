import chai from 'chai';
import HyperCubeDefGenerator from '../hypercube-def-generator';

const expect = chai.expect;

describe('HyperCubeDefGenerator ', () => {
  describe(' generateHyperCubeDef', () => {
    it('should generate a simple hyper cube def with only one measure, based on a dimension', async () => {
      const generatedCubeDefTemplate = {
        dimensions: [],
        measures: ['Count(Distinct {{Dim[0]}} )'],
      };
      const hyperCubeDef = {
        qDimensions: [{ qDef: { qFieldDefs: ['City'] } }],
      };
      const hyperCube = {
        qDimensionInfo: [{ qGroupPos: 0 }],
      };

      const expectedHyperCubeDef = {
        qDimensions: [],
        qMeasures: [{ qDef: { qDef: 'Count(Distinct [City] )' } }],
      };

      const hyperCubeDefResult = await HyperCubeDefGenerator.generateHyperCubeDef(
        generatedCubeDefTemplate,
        hyperCubeDef,
        hyperCube
      );
      expect(hyperCubeDefResult).to.deep.equal(expectedHyperCubeDef);
    });

    it('should generate a hyper cube with two measures, and two dimensions, based on one dimension and two measures', async () => {
      const generatedCubeDefTemplate = {
        dimensions: ['{{Dim[0]}} & {{Dim[0]}}', 'class( Aggr( {{Mea[0]}}, {{Dim[0]}}, 10)'],
        measures: ['Avg( Aggr( {{Mea[1]}}, {{Dim[0]}} ) )', 'Count( {{Dim[0]}} )'],
      };
      const hyperCubeDef = {
        qDimensions: [{ qDef: { qFieldDefs: ['City'] } }],
        qMeasures: [{ qDef: { qDef: 'Sum(Sales)' } }, { qDef: { qDef: 'Avg(Population)' } }],
      };
      const hyperCube = {
        qDimensionInfo: [{ qGroupPos: 0 }],
      };

      const expectedHyperCubeDef = {
        qDimensions: [
          { qDef: { qFieldDefs: ['=[City] & [City]'] } },
          { qDef: { qFieldDefs: ['=class( Aggr( Sum(Sales), [City], 10)'] } },
        ],
        qMeasures: [
          { qDef: { qDef: 'Avg( Aggr( Avg(Population), [City] ) )' } },
          { qDef: { qDef: 'Count( [City] )' } },
        ],
      };

      const hyperCubeDefResult = await HyperCubeDefGenerator.generateHyperCubeDef(
        generatedCubeDefTemplate,
        hyperCubeDef,
        hyperCube
      );
      expect(hyperCubeDefResult).to.deep.equal(expectedHyperCubeDef);
    });

    it('should generate a simple hyper cube def with only one measure, based on a drill down dimension', async () => {
      const generatedCubeDefTemplate = {
        dimensions: [],
        measures: ['Count(Distinct {{Dim[0]}} )'],
      };
      const hyperCubeDef = {
        qDimensions: [{ qDef: { qFieldDefs: ['City', 'Year'] } }],
      };
      const hyperCube = {
        qDimensionInfo: [{ qGroupPos: 1 }],
      };

      const expectedHyperCubeDef = {
        qDimensions: [],
        qMeasures: [{ qDef: { qDef: 'Count(Distinct [Year] )' } }],
      };

      const hyperCubeDefResult = await HyperCubeDefGenerator.generateHyperCubeDef(
        generatedCubeDefTemplate,
        hyperCubeDef,
        hyperCube
      );
      expect(hyperCubeDefResult).to.deep.equal(expectedHyperCubeDef);
    });

    it('should fetch all the expressions from a hyper cube def', async () => {
      const hyperCubeDef = {
        qDimensions: [{ qDef: { qFieldDefs: ['City', 'Year'] } }],
        qMeasures: [{ qDef: { qDef: 'Sum(Sales)' } }],
      };
      const hyperCube = {
        qDimensionInfo: [{ qGroupPos: 1 }],
      };

      const expectedExpressions = {
        dimensions: ['Year'],
        measures: ['Sum(Sales)'],
      };

      const expressions = await HyperCubeDefGenerator.getAllHyperCubeExpressions(hyperCubeDef, hyperCube);
      expect(expressions).to.deep.equal(expectedExpressions);
    });
  });
});
