// import chai from 'chai';
import cubesGenerator from '../histogram-cubes-generator';

const expect = chai.expect;

describe('Generate hyper cube for histogram', () => {
  let properties;
  let layout;
  let app;

  beforeEach(() => {
    properties = {
      qHyperCubeDef: {
        qDimensions: [{ qDef: { qFieldDefs: ['City'] } }],
        qMeasures: [],
      },
      bins: {
        binCount: 15,
      },
    };

    layout = {
      qHyperCube: {
        qDimensionInfo: [
          {
            qGroupPos: 0,
            qFallbackTitle: 'fieldLabel',
          },
        ],
      },
      bins: {
        auto: false,
        binCount: 15,
        binSize: 10,
        offset: 0,
        countDistinct: false,
        binMode: 'size',
      },
      measureAxis: {
        label: 'measureAxisLabel',
      },
    };

    app = {
      getDimension() {},
      getMeasure() {},
    };
  });

  it('should generate a hypercube at the correct location in the properties', (done) => {
    cubesGenerator.generateHyperCubes(layout, properties, app).then(() => {
      expect(properties.qUndoExclude.box.qHyperCubeDef).to.be.an('object');
      done();
    });

    window.flush();
  });

  it('should generate a dimension and measure based on the provided field name', (done) => {
    cubesGenerator.generateHyperCubes(layout, properties, app).then(() => {
      const cube = properties.qUndoExclude.box.qHyperCubeDef;
      const dimensions = cube.qDimensions;
      const measures = cube.qMeasures;

      expect(dimensions.length).to.equal(1);
      expect(dimensions[0].qDef.qFieldDefs).to.deep.equal(['=Class(aggr([City],[City]),10)']);

      expect(measures.length).to.equal(1);
      expect(measures[0].qDef.qDef).to.equal('Count([City])');

      done();
    });

    window.flush();
  });

  it('should sort the dimension numerically ascending', (done) => {
    cubesGenerator.generateHyperCubes(layout, properties, app).then(() => {
      const sortCriterias = properties.qUndoExclude.box.qHyperCubeDef.qDimensions[0].qDef.qSortCriterias;

      expect(sortCriterias).to.be.an('array');
      expect(sortCriterias.length).to.equal(1);
      expect(sortCriterias[0].qSortByNumeric).to.equal(1);

      done();
    });

    window.flush();
  });

  it('should store the qFieldLabel on the derived properties', (done) => {
    cubesGenerator.generateHyperCubes(layout, properties, app).then(() => {
      expect(properties.qUndoExclude.box.qHyperCubeDef.qDimensions[0].qDef.qFieldLabels[0]).to.equal(
        layout.qHyperCube.qDimensionInfo[0].qFallbackTitle
      );

      done();
    });

    window.flush();
  });

  it('should store the measureAxis.label on the derived properties', (done) => {
    cubesGenerator.generateHyperCubes(layout, properties, app).then(() => {
      expect(properties.qUndoExclude.box.qHyperCubeDef.qMeasures[0].qDef.qLabel).to.equal(layout.measureAxis.label);

      done();
    });

    window.flush();
  });

  it('should store the binSize on the derived properties', (done) => {
    cubesGenerator.generateHyperCubes(layout, properties, app).then(() => {
      expect(properties.qUndoExclude.bins.binSize).to.equal(layout.bins.binSize);

      done();
    });

    window.flush();
  });

  it('should generate the Sturges formula expression in auto mode', (done) => {
    layout.bins.auto = true;

    cubesGenerator.generateHyperCubes(layout, properties, app).then(() => {
      expect(properties.qUndoExclude.bins.binCount).to.deep.equal({
        qValueExpression: {
          qExpr: '=Ceil(Log10(Count([City])) / Log10(2)) + 1',
        },
      });

      done();
    });

    window.flush();
  });

  it("should use the derived binCount in maxCount mode if the user haven't provided an custom expression", (done) => {
    layout.bins.binMode = 'maxCount';
    layout.qUndoExclude = {
      bins: {
        binCount: 7,
      },
    };
    properties.bins.binCount = undefined;

    cubesGenerator.generateHyperCubes(layout, properties, app).then(() => {
      expect(properties.qUndoExclude.bins.binCount).to.deep.equal(layout.qUndoExclude.bins.binCount);

      done();
    });

    window.flush();
  });

  it('should use the provided expression in maxCount mode', (done) => {
    layout.bins.binMode = 'maxCount';
    properties.bins.binCount = '=Count([City])';

    cubesGenerator.generateHyperCubes(layout, properties, app).then(() => {
      expect(properties.qUndoExclude.bins.binCount).to.equal(properties.bins.binCount);

      done();
    });

    window.flush();
  });
});
