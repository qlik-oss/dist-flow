import chai from 'chai';
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

  it('should generate a hypercube at the correct location in the properties', async () => {
    await cubesGenerator.generateHyperCubes(layout, properties, app);
    expect(properties.qUndoExclude.box.qHyperCubeDef).to.be.an('object');
  });

  it('should generate a dimension and measure based on the provided field name', async () => {
    await cubesGenerator.generateHyperCubes(layout, properties, app);

    const cube = properties.qUndoExclude.box.qHyperCubeDef;
    const dimensions = cube.qDimensions;
    const measures = cube.qMeasures;

    expect(dimensions.length).to.equal(1);
    expect(dimensions[0].qDef.qFieldDefs).to.deep.equal(['=Class(aggr([City],[City]),10)']);

    expect(measures.length).to.equal(1);
    expect(measures[0].qDef.qDef).to.equal('Count([City])');
  });

  it('should sort the dimension numerically ascending', async () => {
    await cubesGenerator.generateHyperCubes(layout, properties, app);

    const sortCriterias = properties.qUndoExclude.box.qHyperCubeDef.qDimensions[0].qDef.qSortCriterias;

    expect(sortCriterias).to.be.an('array');
    expect(sortCriterias.length).to.equal(1);
    expect(sortCriterias[0].qSortByNumeric).to.equal(1);
  });

  it('should store the qFieldLabel on the derived properties', async () => {
    await cubesGenerator.generateHyperCubes(layout, properties, app);

    expect(properties.qUndoExclude.box.qHyperCubeDef.qDimensions[0].qDef.qFieldLabels[0]).to.equal(
      layout.qHyperCube.qDimensionInfo[0].qFallbackTitle
    );
  });

  it('should store the measureAxis.label on the derived properties', async () => {
    await cubesGenerator.generateHyperCubes(layout, properties, app);

    expect(properties.qUndoExclude.box.qHyperCubeDef.qMeasures[0].qDef.qLabel).to.equal(layout.measureAxis.label);
  });

  it('should store the binSize on the derived properties', async () => {
    await cubesGenerator.generateHyperCubes(layout, properties, app);

    expect(properties.qUndoExclude.bins.binSize).to.equal(layout.bins.binSize);
  });

  it('should generate the Sturges formula expression in auto mode', async () => {
    layout.bins.auto = true;

    await cubesGenerator.generateHyperCubes(layout, properties, app);

    expect(properties.qUndoExclude.bins.binCount).to.deep.equal({
      qValueExpression: {
        qExpr: '=Ceil(Log10(Count([City])) / Log10(2)) + 1',
      },
    });
  });

  it("should use the derived binCount in maxCount mode if the user haven't provided an custom expression", async () => {
    layout.bins.binMode = 'maxCount';
    layout.qUndoExclude = {
      bins: {
        binCount: 7,
      },
    };
    properties.bins.binCount = undefined;

    await cubesGenerator.generateHyperCubes(layout, properties, app);

    expect(properties.qUndoExclude.bins.binCount).to.deep.equal(layout.qUndoExclude.bins.binCount);
  });

  it('should use the provided expression in maxCount mode', async () => {
    layout.bins.binMode = 'maxCount';
    properties.bins.binCount = '=Count([City])';

    await cubesGenerator.generateHyperCubes(layout, properties, app);

    expect(properties.qUndoExclude.bins.binCount).to.equal(properties.bins.binCount);
  });
});
