import chai from 'chai';
import sinon from 'sinon';
import CubeGenerator from '../boxplot-cubes-generator';
import boxplotUtils from '../boxplot-utils';
import boxplotSorter from '../sorting/boxplot-sorter';
import translator from '../../../../js/lib/translator';

const expect = chai.expect;

const boxProperties = {
  boxplotDef: {
    qHyperCubeDef: {
      qDimensions: [],
      qMeasures: [],
    },
    calculations: {
      mode: boxplotUtils.BOXMODES.TUKEY.value,
      parameters: {
        tukey: 1.5,
        stdDev: 2,
        fractiles: 0.01,
      },
    },
    elements: {
      outliers: {
        include: true,
      },
    },
    sorting: {
      autoSort: true,
    },
    color: {
      auto: true,
    },
  },
  qUndoExclude: {
    box: {
      qHyperCubeDef: {
        qDimensions: [],
        qMeasures: [],
      },
    },
    outliers: {
      qHyperCubeDef: {
        qDimensions: [],
        qMeasures: [],
      },
    },
  },
};

const generatedProps = boxProperties.qUndoExclude;

const mockedMasterItemsProps = {
  measure1: {
    qMeasure: {
      qDef: 'avg(MasterField1)',
    },
  },
  measure2: {
    qMeasure: {
      qDef: 'count(MasterField2)',
    },
  },
  dimension1: {
    qDim: {
      qFieldDefs: ['MasterField1'],
    },
  },
  dimension2: {
    qDim: {
      qFieldDefs: ['MasterField2'],
    },
  },
  drillDim: {
    qDim: {
      qFieldDefs: ['DillField1', 'DillField2'],
    },
  },
};

const layout = {};

function resetBoxCube() {
  boxProperties.boxplotDef.qHyperCubeDef.qDimensions.length = 0;
  boxProperties.boxplotDef.qHyperCubeDef.qMeasures.length = 0;
  boxProperties.boxplotDef.calculations.mode = boxplotUtils.BOXMODES.TUKEY.value;
  boxProperties.boxplotDef.includeOutliers = true;
  delete boxProperties.boxplotDef.elements;
  boxProperties.boxplotDef.elements = {
    outliers: {
      include: true,
    },
  };
  boxProperties.boxplotDef.sorting.autoSort = true;
}

function mockBasicProps() {
  boxProperties.boxplotDef.qHyperCubeDef.qDimensions = [
    {
      qDef: {
        qFieldDefs: ['Field1'],
      },
    },
    {
      qDef: {
        qFieldDefs: ['Field2'],
        qSortCriterias: [
          {
            qExpression: {},
          },
        ],
      },
    },
  ];

  boxProperties.boxplotDef.qHyperCubeDef.qMeasures.push({
    qDef: {
      qDef: 'Sum(Field2)',
    },
  });
}

describe('Generate hypercubes for boxplot', () => {
  const sandbox = sinon.createSandbox();
  let app;

  before(() => {
    const getMock = function (id) {
      return Promise.resolve({
        getProperties() {
          return Promise.resolve(mockedMasterItemsProps[id]);
        },
      });
    };

    app = {
      getDimension: getMock,
      getMeasure: getMock,
    };

    sandbox.stub(translator, 'get').callsFake((translationKey) => `${translationKey}_translated`);

    boxplotSorter.applySorting = sandbox.spy();
  });

  beforeEach(() => {
    resetBoxCube();
  });

  afterEach(() => {
    boxplotSorter.applySorting.resetHistory();
  });

  after(() => {
    sandbox.restore();
  });

  it('should generate one cube for the boxes and one for the outliers', () => {
    mockBasicProps();

    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(generatedProps.box.qHyperCubeDef.qDimensions, 'dimensions in generated box cube').to.not.be.empty;

    expect(generatedProps.box.qHyperCubeDef.qMeasures, 'measures in generated box cube').to.not.be.empty;

    expect(generatedProps.outliers.qHyperCubeDef.qDimensions, 'dimensions in generated outliers cube').to.not.be.empty;

    expect(generatedProps.outliers.qHyperCubeDef.qMeasures, 'measures in generated outliers cube').to.not.be.empty;
  });

  // Have to keep the outliers cube due to engine error (related to removal of outliers cube + applyPatch -> setProperties)
  /* it( 'should not generate outliers cube when elements.outliers.include is set to false', function () {

        mockBasicProps();
        boxProperties.boxplotDef.elements.outliers.include = false;

        CubeGenerator.generateHyperCubes( boxProperties );

        window.flush();

        expect( generatedProps.outliers,
            'generated outliers cube' ).to.be.undefined;
    } ); */

  it('should generate correct amount of dimensions and measures', () => {
    mockBasicProps();

    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(generatedProps.box.qHyperCubeDef.qDimensions.length, '1 dimension in generated box cube').to.equal(1);

    expect(generatedProps.box.qHyperCubeDef.qMeasures.length, '5 measures in generated box cube').to.equal(5);

    expect(
      generatedProps.outliers.qHyperCubeDef.qDimensions.length,
      '3 dimensions in generated outliers cube'
    ).to.equal(3);

    expect(generatedProps.outliers.qHyperCubeDef.qMeasures.length, '1 measure in generated outliers cube').to.equal(1);
  });

  it('should generate a box cube with one dimension and 5 measures', () => {
    mockBasicProps();

    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(generatedProps.outliers.qHyperCubeDef.qDimensions, '1 dimension in generated outliers cube').to.not.be.empty;

    expect(generatedProps.outliers.qHyperCubeDef.qMeasures, '5 measures in generated outliers cube').to.not.be.empty;
  });

  it("should fetch master measures and use it's expression in box cube", () => {
    boxProperties.boxplotDef.qHyperCubeDef.qDimensions = [
      {
        qDef: {
          qFieldDefs: ['Field1'],
        },
      },
      {
        qDef: {
          qFieldDefs: ['Field2'],
          qSortCriterias: [
            {
              qExpression: {},
            },
          ],
        },
      },
    ];

    boxProperties.boxplotDef.qHyperCubeDef.qMeasures.push({
      qLibraryId: 'measure1',
      qDef: {},
    });

    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    generatedProps.box.qHyperCubeDef.qMeasures.forEach((measure) => {
      expect(measure.qDef.qDef, 'expression from master measure').to.contain('MasterField1');
    });
  });

  it('should fetch master drilldown dimension and use current expression in box cube', () => {
    boxProperties.boxplotDef.qHyperCubeDef.qDimensions = [
      {
        qDef: {
          qFieldDefs: ['Field1'],
        },
      },
      {
        qLibraryId: 'drillDim',
        qDef: {
          qSortCriterias: [
            {
              qExpression: {},
            },
          ],
        },
      },
    ];

    boxProperties.boxplotDef.qHyperCubeDef.qMeasures.push({
      qDef: {
        qDef: 'Sum(Field2)',
      },
    });

    CubeGenerator.generateHyperCubes(boxProperties, [0, 1], layout, app);

    window.flush();

    generatedProps.box.qHyperCubeDef.qMeasures.forEach((measure) => {
      expect(measure.qDef.qDef, 'expression from drilldown dimension').to.contain('DillField2');
    });
  });

  it('should support fields on the fly', () => {
    boxProperties.boxplotDef.qHyperCubeDef.qDimensions = [
      {
        qDef: {
          qFieldDefs: ['Field1+Fly1'],
        },
      },
      {
        qDef: {
          qFieldDefs: ['Field2'],
          qSortCriterias: [
            {
              qExpression: {},
            },
          ],
        },
      },
    ];

    boxProperties.boxplotDef.qHyperCubeDef.qMeasures.push({
      qDef: {
        qDef: 'Sum(Field2)',
      },
    });

    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    generatedProps.box.qHyperCubeDef.qMeasures.forEach((measure) => {
      expect(measure.qDef.qDef, 'expression from fields on the fly diemnsion').to.contain(
        `[${boxProperties.boxplotDef.qHyperCubeDef.qDimensions[0].qDef.qFieldDefs[0]}]`
      );
    });
  });

  it('should support custom element expressions', () => {
    mockBasicProps();

    boxProperties.boxplotDef.elements = {
      firstWhisker: { expression: 'customFirstWhisker' },
      boxStart: { expression: 'customBoxStart' },
      boxMiddle: { expression: 'customBoxMiddle' },
      boxEnd: { expression: 'customBoxEnd' },
      lastWhisker: { expression: 'customLastWhisker' },
      outliers: { include: false },
    };

    boxProperties.boxplotDef.calculations.auto = false;

    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(generatedProps.box.qHyperCubeDef.qMeasures[0].qDef.qDef, 'custom First Whisker expression').to.contain(
      'customFirstWhisker'
    );

    expect(generatedProps.box.qHyperCubeDef.qMeasures[1].qDef.qDef, 'custom box start expression').to.contain(
      'customBoxStart'
    );

    expect(generatedProps.box.qHyperCubeDef.qMeasures[2].qDef.qDef, 'custom box middle expression').to.contain(
      'customBoxMiddle'
    );

    expect(generatedProps.box.qHyperCubeDef.qMeasures[3].qDef.qDef, 'custom box end expression').to.contain(
      'customBoxEnd'
    );

    expect(generatedProps.box.qHyperCubeDef.qMeasures[4].qDef.qDef, 'custom Last Whisker expression').to.contain(
      'customLastWhisker'
    );
  });

  it('should generate all expressions when using auto calculations', () => {
    mockBasicProps();

    boxProperties.boxplotDef.elements = {
      firstWhisker: { expression: 'customFirstWhisker' },
    };

    boxProperties.boxplotDef.calculations.auto = true;

    CubeGenerator.generateHyperCubes(boxProperties, undefined, layout, app);

    window.flush();

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[0].qDef.qDef,
      'generated First Whisker expression'
    ).to.not.contain('customFirstWhisker');
  });

  it('should generate box measures based on boxplot mode', () => {
    mockBasicProps();
    boxProperties.boxplotDef.calculations.mode = boxplotUtils.BOXMODES.STDDEV.value;
    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);
    window.flush();

    expect(generatedProps.box.qHyperCubeDef.qMeasures[0].qDef.qDef, 'sttdev specific expression').to.contain('Stdev(');

    boxProperties.boxplotDef.calculations.mode = boxplotUtils.BOXMODES.FRACTILES.value;
    CubeGenerator.generateHyperCubes(boxProperties, undefined, layout, app);
    window.flush();

    expect(generatedProps.box.qHyperCubeDef.qMeasures[0].qDef.qDef, 'fractiles specific expression').to.contain(
      'Fractile('
    );

    boxProperties.boxplotDef.calculations.mode = boxplotUtils.BOXMODES.TUKEY.value;
    CubeGenerator.generateHyperCubes(boxProperties, undefined, layout, app);
    window.flush();

    expect(generatedProps.box.qHyperCubeDef.qMeasures[0].qDef.qDef, 'tukey specific expression').to.contain('1.5'); // 1.5 is specific for tukey
  });

  it('should not apply sorting if has single dimension', () => {
    mockBasicProps();

    boxProperties.boxplotDef.qHyperCubeDef.qDimensions.splice(
      0,
      boxProperties.boxplotDef.qHyperCubeDef.qDimensions.length - 1
    );

    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(boxplotSorter.applySorting.notCalled, 'not call applySorting').to.be.true;
  });

  it('should apply sorting if has two dimensions', () => {
    mockBasicProps();

    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(boxplotSorter.applySorting.calledOnce, 'call applySorting').to.be.true;

    expect(
      boxplotSorter.applySorting.calledWithExactly(boxProperties, layout),
      'call applySorting with correct arguments'
    ).to.be.true;
  });

  it('should allow custom name', () => {
    mockBasicProps();

    boxProperties.boxplotDef.calculations.auto = false;
    boxProperties.boxplotDef.elements = {
      firstWhisker: { name: 'customFirstWhisker' },
      boxStart: { name: 'customBoxStart' },
      boxMiddle: { name: 'customBoxMiddle' },
      boxEnd: { name: 'customBoxEnd' },
      lastWhisker: { name: 'customLastWhisker' },
      outliers: { include: false },
    };

    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[0].qAttributeExpressions[0].qExpression,
      'custom First Whisker expression'
    ).to.contain('customFirstWhisker');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[1].qAttributeExpressions[0].qExpression,
      'custom box start expression'
    ).to.contain('customBoxStart');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[2].qAttributeExpressions[0].qExpression,
      'custom box middle expression'
    ).to.contain('customBoxMiddle');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[3].qAttributeExpressions[0].qExpression,
      'custom box end expression'
    ).to.contain('customBoxEnd');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[4].qAttributeExpressions[0].qExpression,
      'custom Last Whisker expression'
    ).to.contain('customLastWhisker');
  });

  it('should not use custom name when using auto calculations', () => {
    mockBasicProps();

    boxProperties.boxplotDef.calculations.auto = true;
    boxProperties.boxplotDef.calculations.mode = 'tukey';
    boxProperties.boxplotDef.calculations.parameters = { tukey: 1.5 };
    boxProperties.boxplotDef.elements = {
      firstWhisker: { name: 'customFirstWhisker' },
      boxStart: { name: 'customBoxStart' },
      boxMiddle: { name: 'customBoxMiddle' },
      boxEnd: { name: 'customBoxEnd' },
      lastWhisker: { name: 'customLastWhisker' },
      outliers: { include: false },
    };

    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[0].qAttributeExpressions[0].qExpression,
      'custom First Whisker expression'
    ).to.contain('properties.boxplot.calculationMode.tukey.elements.firstWhisker_translated');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[1].qAttributeExpressions[0].qExpression,
      'custom box start expression'
    ).to.contain('properties.boxplot.calculationMode.tukey.elements.boxStart_translated');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[2].qAttributeExpressions[0].qExpression,
      'custom box middle expression'
    ).to.contain('properties.boxplot.calculationMode.tukey.elements.boxMiddle_translated');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[3].qAttributeExpressions[0].qExpression,
      'custom box end expression'
    ).to.contain('properties.boxplot.calculationMode.tukey.elements.boxEnd_translated');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[4].qAttributeExpressions[0].qExpression,
      'custom Last Whisker expression'
    ).to.contain('properties.boxplot.calculationMode.tukey.elements.lastWhisker_translated');
  });

  it('should support using expression as labels', () => {
    mockBasicProps();

    boxProperties.boxplotDef.calculations.auto = false;
    boxProperties.boxplotDef.elements = {
      firstWhisker: { name: { qStringExpression: { qExpr: 'customFirstWhiskerExpr' } } },
      boxStart: { name: { qStringExpression: { qExpr: 'customBoxStartExpr' } } },
      boxMiddle: { name: { qStringExpression: { qExpr: 'customBoxMiddleExpr' } } },
      boxEnd: { name: { qStringExpression: { qExpr: 'customBoxEndExpr' } } },
      lastWhisker: { name: { qStringExpression: { qExpr: 'customLastWhiskerExpr' } } },
    };

    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[0].qAttributeExpressions[0].qExpression,
      'custom First Whisker expression'
    ).to.contain('customFirstWhiskerExpr');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[1].qAttributeExpressions[0].qExpression,
      'custom box start expression'
    ).to.contain('customBoxStartExpr');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[2].qAttributeExpressions[0].qExpression,
      'custom box middle expression'
    ).to.contain('customBoxMiddleExpr');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[3].qAttributeExpressions[0].qExpression,
      'custom box end expression'
    ).to.contain('customBoxEndExpr');

    expect(
      generatedProps.box.qHyperCubeDef.qMeasures[4].qAttributeExpressions[0].qExpression,
      'custom Last Whisker expression'
    ).to.contain('customLastWhiskerExpr');
  });

  it('should copy number format to box measures', () => {
    const numFormat = {
      qDec: '.',
      qThou: ',',
      qType: 'U',
      qUseThou: 0,
      qnDec: 2,
    };

    mockBasicProps();
    boxProperties.boxplotDef.qHyperCubeDef.qMeasures[0].qDef.qNumFormat = numFormat;
    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(generatedProps.box.qHyperCubeDef.qMeasures[0].qDef.qNumFormat, 'first whisker num format').to.deep.equals(
      numFormat
    );
    expect(generatedProps.box.qHyperCubeDef.qMeasures[1].qDef.qNumFormat, 'box start num format').to.deep.equals(
      numFormat
    );
    expect(generatedProps.box.qHyperCubeDef.qMeasures[2].qDef.qNumFormat, 'box middle num format').to.deep.equals(
      numFormat
    );
    expect(generatedProps.box.qHyperCubeDef.qMeasures[3].qDef.qNumFormat, 'box end num format').to.deep.equals(
      numFormat
    );
    expect(generatedProps.box.qHyperCubeDef.qMeasures[4].qDef.qNumFormat, 'last whisker num format').to.deep.equals(
      numFormat
    );
  });

  it('should not copy label expression to box measures', () => {
    mockBasicProps();
    boxProperties.boxplotDef.qHyperCubeDef.qMeasures[0].qDef.qLabelExpression = '=expr';
    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(generatedProps.box.qHyperCubeDef.qMeasures[0].qDef.qLabelExpression, 'first whisker label expression').to.be
      .undefined;
    expect(generatedProps.box.qHyperCubeDef.qMeasures[0].qDef.qLabelExpression, 'box start label expression').to.be
      .undefined;
    expect(generatedProps.box.qHyperCubeDef.qMeasures[0].qDef.qLabelExpression, 'box middle label expression').to.be
      .undefined;
    expect(generatedProps.box.qHyperCubeDef.qMeasures[0].qDef.qLabelExpression, 'box end label expression').to.be
      .undefined;
    expect(generatedProps.box.qHyperCubeDef.qMeasures[0].qDef.qLabelExpression, 'last whisker label expression').to.be
      .undefined;
  });

  it('should copy qCalcCond and qCalcCondition to the box and outliers cubes', () => {
    mockBasicProps();
    boxProperties.boxplotDef.qHyperCubeDef.qCalcCond = 'qCalcCond';
    boxProperties.boxplotDef.qHyperCubeDef.qCalcCondition = 'qCalcCondition';
    CubeGenerator.generateHyperCubes(boxProperties, [], layout, app);

    window.flush();

    expect(generatedProps.box.qHyperCubeDef.qCalcCond, 'qCalcCond in generated box cube').to.equals('qCalcCond');
    expect(generatedProps.box.qHyperCubeDef.qCalcCondition, 'qCalcCondition in generated box cube').to.equals(
      'qCalcCondition'
    );
    expect(generatedProps.outliers.qHyperCubeDef.qCalcCond, 'qCalcCond in generated outliers cube').to.equals(
      'qCalcCond'
    );
    expect(generatedProps.outliers.qHyperCubeDef.qCalcCondition, 'qCalcCondition in generated outliers cube').to.equals(
      'qCalcCondition'
    );
  });
});
