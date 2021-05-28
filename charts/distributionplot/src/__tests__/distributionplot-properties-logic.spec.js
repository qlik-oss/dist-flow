// import '../../../../../test/unit/node-setup';

import chai from 'chai';
import sinon from 'sinon';
import distplotPropsLogic from '../distributionplot-properties-logic';
import util from '../../../../js/lib/util';

// -- Variables --

const expect = chai.expect;

let sandbox;

const mockData = {
  color: {
    point: {
      mode: 'byExpression',
      expressionIsColor: true,
      auto: false,
    },
  },
};

const mockHandler = {
  layout: {
    qHyperCube: {
      qMeasureInfo: [
        {
          coloring: { baseColor: { color: '#FFF000' } },
        },
      ],
      qDimensionInfo: [
        {
          coloring: { baseColor: { color: '#000FFF' } },
        },
      ],
    },
  },
};

// -- Funcs --

/**
 * Used for cloning mocked objects before modifying.
 * @param {object} obj
 */
function clone(obj) {
  return extend(true, {}, obj);
}

/**
 * Test measuresHasBaseColors() and dimensionsHasBaseColors()
 * @param {boolean} isMeasure
 */
function testBaseColor(isMeasure) {
  isMeasure = isMeasure || false;

  const testData = clone(mockHandler);

  const func = isMeasure ? distplotPropsLogic.measuresHasBaseColors : distplotPropsLogic.dimensionsHasBaseColors;

  it('should return true when base colors exist', () => {
    const resp = func(testData);
    expect(resp).to.be.a('boolean');
    expect(resp).to.equal(true);
  });

  it('should return false when no base colors exist', () => {
    testData.layout.qHyperCube.qMeasureInfo = [];
    testData.layout.qHyperCube.qDimensionInfo = [];

    const resp = func(testData);
    expect(resp).to.be.a('boolean');
    expect(resp).to.equal(false);
  });
}

/**
 * Test checks for isDimension, isMeasure and isExpression
 * @param {string} methodName e.g. "isColorByDimension"
 * @param {array} expectedArr Array of booleans indicating expected response for hard-coded scenarios
 */
function testIsColorBy(methodName, expectedArr) {
  const testData = clone(mockData);
  const scenarios = [
    {
      mode: 'byDimension',
      auto: false,
    },
    {
      mode: 'byMeasure',
      auto: false,
    },
    {
      mode: 'byExpression',
      auto: false,
    },
    {
      mode: 'primary',
      auto: false,
    },

    {
      mode: 'byDimension',
      auto: true,
    },
    {
      mode: 'byMeasure',
      auto: true,
    },
    {
      mode: 'byExpression',
      auto: true,
    },
    {
      mode: 'primary',
      auto: true,
    },
  ];

  scenarios.forEach((scenario, index) => {
    it('should return correct boolean', () => {
      testData.color.point.mode = scenario.mode;
      testData.color.point.auto = scenario.auto;

      const func = distplotPropsLogic[methodName];
      const resp = func(testData);

      expect(resp).to.be.a('boolean');
      expect(resp).to.equal(expectedArr[index]);
    });
  });
}

function testIsLibraryItem(methodName, expectedArr) {
  const func = distplotPropsLogic[methodName];
  const testData = clone(mockData);

  const scenarios = ['libraryItem', 'notALibraryItem'];
  scenarios.forEach((type, index) => {
    testData.color.point.byDimDef = {
      type,
    };
    testData.color.point.byMeasureDef = {
      type,
    };
    const resp = func(testData);
    it('returns correct boolean for given input', () => {
      expect(resp).to.be.a('boolean');
      expect(resp).to.equal(expectedArr[index]);
    });
  });
}

// -- Tests --

describe('distributionplot-properties-logic', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should expose the correct api', () => {
    expect(distplotPropsLogic).to.be.an('object');
    expect(Object.keys(distplotPropsLogic).length).to.equal(13);
  });

  // Test exposed methods

  describe('measuresHasBaseColors', () => {
    testBaseColor(true);
  });

  describe('dimensionsHasBaseColors', () => {
    testBaseColor(false);
  });

  // isColorByDimension
  describe('isColorByDimension', () => {
    const expectedArr = [true, false, false, false, false, false, false, false];
    testIsColorBy('isColorByDimension', expectedArr);
  });

  // isColorByMeasure
  describe('isColorByMeasure', () => {
    const expectedArr = [false, true, false, false, false, false, false, false];
    testIsColorBy('isColorByMeasure', expectedArr);
  });

  // isColorByExpression
  describe('isColorByExpression', () => {
    const expectedArr = [false, false, true, false, false, false, false, false];
    testIsColorBy('isColorByExpression', expectedArr);
  });

  // isColorByExpression
  describe('isColorBySingle', () => {
    const expectedArr = [false, false, false, true, false, false, false, false];
    testIsColorBy('isColorBySingle', expectedArr);
  });

  // isDimensionLibraryItem
  describe('isDimensionLibraryItem', () => {
    testIsLibraryItem('isDimensionLibraryItem', [true, false]);
  });

  // isDimensionLibraryItem
  describe('isDimensionLibraryItem', () => {
    testIsLibraryItem('isMeasureLibraryItem', [true, false]);
  });

  // showLegend
  describe('showLegend', () => {
    const testData = clone(mockData);

    const scenarios = [
      { mode: 'primary', auto: true },
      { mode: 'byMeasure', auto: true },
      { mode: 'byDimension', auto: true },
      { mode: 'byExpression', auto: true },
      { mode: 'primary', auto: false },
      { mode: 'byMeasure', auto: false },
      { mode: 'byDimension', auto: false },
      { mode: 'byExpression', auto: false },
    ];
    const expected = [false, false, false, false, false, true, true, false];

    scenarios.forEach((scenario, index) => {
      testData.color.point.mode = scenario.mode;
      testData.color.point.auto = scenario.auto;
      const resp = distplotPropsLogic.showLegend(testData);

      it('returns correct boolean for given input', () => {
        expect(resp).to.be.a('boolean');
        expect(resp).to.equal(expected[index]);
      });
    });
  });

  describe('showColorByLabel', () => {
    const testData = clone(mockData);

    const scenarios = [
      { mode: 'primary', auto: true, isLibraryItem: false },
      { mode: 'byMeasure', auto: true, isLibraryItem: false },
      { mode: 'byDimension', auto: true, isLibraryItem: false },
      { mode: 'primary', auto: false, isLibraryItem: false },
      { mode: 'byMeasure', auto: false, isLibraryItem: false },
      { mode: 'byDimension', auto: false, isLibraryItem: false },
      { mode: 'primary', auto: true, isLibraryItem: true },
      { mode: 'byMeasure', auto: true, isLibraryItem: true },
      { mode: 'byDimension', auto: true, isLibraryItem: true },
      { mode: 'primary', auto: false, isLibraryItem: true },
      { mode: 'byMeasure', auto: false, isLibraryItem: true },
      { mode: 'byDimension', auto: false, isLibraryItem: true },
    ];
    const expected = [false, false, false, false, true, true, false, false, false, false, false, false];

    scenarios.forEach((scenario, index) => {
      const type = scenario.isLibraryItem ? 'libraryItem' : 'notALibraryItem';
      testData.color.point.byDimDef = {
        type,
      };
      testData.color.point.byMeasureDef = {
        type,
      };
      testData.color.point.mode = scenario.mode;
      testData.color.point.auto = scenario.auto;
      const resp = distplotPropsLogic.showColorByLabel(testData);

      it('returns correct boolean for given input', () => {
        expect(resp).to.be.a('boolean');
        expect(resp).to.equal(expected[index]);
      });
    });
  });

  describe('onChangeCalcCond', () => {
    it('should copy qCalcCond to generated cube', () => {
      const data = {
        qHyperCubeDef: {
          qCalcCond: 'qCalcCond',
          qCalcCondition: 'qCalcCondition',
        },
        qUndoExclude: {
          qHyperCubeDef: {},
        },
      };

      distplotPropsLogic.onChangeCalcCond(data);

      expect(data.qUndoExclude.qHyperCubeDef.qCalcCond).to.equals('qCalcCond');
      expect(data.qUndoExclude.qHyperCubeDef.qCalcCondition).to.equals('qCalcCondition');
    });
  });
});
