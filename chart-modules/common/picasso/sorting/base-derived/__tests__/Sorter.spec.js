import '../../../../../../../test/unit/node-setup';

import chai from 'chai';
import sinon from 'sinon';
import angular from 'angular';
import Sorter from '../Sorter';

const expect = chai.expect;
let sandbox;
let settings;
let elements;
let sorter;

describe('Sorter', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();

    settings = {
      SORT_BY_EXPRESSION: 1,
      SORT_BY_ASCII: -1,
      SORT_BY_NUMERIC: undefined,
      SORT_BY_LOAD_ORDER: 1,
    };

    elements = [
      {
        id: 'firstWhisker',
        label: 'firstWhiskerLabel',
        exp: 'Sum(firstWhisker)',
        isDefault: false,
      },
      {
        id: 'boxMiddle',
        label: 'boxMiddleLabel',
        exp: 'Sum(boxMiddle)',
        isDefault: false,
      },
      {
        id: 'lastWhisker',
        label: 'lastWhiskerLabel',
        exp: 'Sum(lastWhisker)',
        isDefault: true,
      },
    ];

    sorter = new Sorter(sandbox.stub().returns(settings), sandbox.stub().returns(elements));
  });

  afterEach(() => {
    sandbox.reset();
  });

  it('instance should expose correct api', () => {
    const sorter = new Sorter({}, {});

    expect(Object.keys(sorter).length).to.equal(2);
    expect(sorter).to.have.keys(['getSettings', 'getElements']);
  });

  it('prototype should expose correct api', () => {
    expect(Object.keys(Sorter.prototype).length).to.equal(3);
    expect(Sorter.prototype).to.have.keys(['applyAutoSorting', 'applyDefaultCustomSorting', 'applyCustomSorting']);
  });

  describe('getSettings', () => {
    it('should return correct settings', () => {
      const sorter = new Sorter(() => settings);

      const result = sorter.getSettings({});

      expect(result).to.equal(settings);
    });
  });

  describe('getElements', () => {
    it('should return correct elements', () => {
      const sorter = new Sorter(undefined, () => elements);

      const result = sorter.getElements({});

      expect(result).to.equal(elements);
    });
  });

  describe('applyAutoSorting', () => {
    it('should add sort criteria if does not exist', () => {
      const dimension = {
        qDef: {
          qSortCriterias: [],
        },
      };

      sorter.applyAutoSorting(dimension);

      expect(dimension.qDef.qSortCriterias[0]).to.be.an('object');
    });

    it('should apply sorting correctly based on default element if it exists', () => {
      const dimension = {
        qDef: {
          qSortCriterias: [
            {
              qSortByExpression: undefined,
              qSortByAscii: 1,
              qSortByNumeric: 2,
              qSortByLoadOrder: 3,
            },
          ],
        },
      };

      sorter.applyAutoSorting(dimension);

      expect(dimension.qDef.qSortCriterias[0]).to.deep.equal({
        qExpression: {
          qv: 'Sum(lastWhisker)',
        },
        qSortByExpression: 1,
        qSortByAscii: -1,
        qSortByLoadOrder: 1,
      });
    });

    it('should apply sorting correctly based on first element if default element does not exist', () => {
      elements[2].isDefault = false;

      const dimension = {
        qDef: {
          qSortCriterias: [
            {
              qSortByExpression: undefined,
              qSortByAscii: 1,
              qSortByNumeric: 2,
              qSortByLoadOrder: 3,
            },
          ],
        },
      };

      sorter.applyAutoSorting(dimension);

      expect(dimension.qDef.qSortCriterias[0]).to.deep.equal({
        qExpression: {
          qv: 'Sum(firstWhisker)',
        },
        qSortByExpression: 1,
        qSortByAscii: -1,
        qSortByLoadOrder: 1,
      });
    });
  });

  describe('applyDefaultCustomSorting', () => {
    it('should apply sorting correctly based on default element if it exists', () => {
      const dimension = {
        qDef: {
          qSortCriterias: [
            {
              qSortByExpression: undefined,
              qSortByAscii: 1,
              qSortByNumeric: 2,
              qSortByLoadOrder: 3,
            },
          ],
        },
      };

      const chartSorting = {
        expression: 'Median(42)',
      };

      sorter.applyDefaultCustomSorting(dimension, chartSorting);

      expect(dimension.qDef.qSortCriterias[0]).to.deep.equal({
        qExpression: {
          qv: 'Sum(lastWhisker)',
        },
        qSortByExpression: 1,
        qSortByAscii: -1,
        qSortByLoadOrder: 1,
      });

      expect(chartSorting.elementId).to.equal('lastWhisker');

      expect(chartSorting.sortCriteria).to.deep.equal({
        sortByExpression: 1,
        sortByAscii: -1,
        sortByLoadOrder: 1,
      });
    });

    it('should apply sorting correctly based on first element if default element does not exist', () => {
      elements[2].isDefault = false;

      const dimension = {
        qDef: {
          qSortCriterias: [
            {
              qSortByExpression: undefined,
              qSortByAscii: 1,
              qSortByNumeric: 2,
              qSortByLoadOrder: 3,
            },
          ],
        },
      };

      const chartSorting = {
        expression: 'Median(42)',
      };

      sorter.applyDefaultCustomSorting(dimension, chartSorting);

      expect(dimension.qDef.qSortCriterias[0]).to.deep.equal({
        qExpression: {
          qv: 'Sum(firstWhisker)',
        },
        qSortByExpression: 1,
        qSortByAscii: -1,
        qSortByLoadOrder: 1,
      });

      expect(chartSorting.elementId).to.equal('firstWhisker');

      expect(chartSorting.sortCriteria).to.deep.equal({
        sortByExpression: 1,
        sortByAscii: -1,
        sortByLoadOrder: 1,
      });
    });
  });

  describe('applyCustomSorting', () => {
    it('should apply sorting correctly when has an element id', () => {
      const dimension = {
        qDef: {
          qSortCriterias: [
            {
              qExpression: {
                qv: 'Median(1)',
              },
              qSortByExpression: undefined,
              qSortByAscii: 1,
              qSortByNumeric: 2,
              qSortByLoadOrder: 3,
            },
          ],
        },
      };

      const chartSorting = {
        expression: 'Median(42)',
        elementId: 'boxMiddle',
        sortCriteria: {
          sortByExpression: 1,
          sortByAscii: undefined,
          sortByNumeric: -1,
          sortByLoadOrder: 0,
        },
      };

      sorter.applyCustomSorting(dimension, chartSorting);

      expect(dimension.qDef.qSortCriterias[0]).to.deep.equal({
        qExpression: {
          qv: 'Sum(boxMiddle)',
        },
        qSortByExpression: 1,
        qSortByNumeric: -1,
        qSortByLoadOrder: 0,
      });

      expect(chartSorting.elementId).to.equal('boxMiddle');

      expect(chartSorting.expression).to.equal('Median(42)');

      expect(chartSorting.sortCriteria).to.deep.equal({
        sortByExpression: 1,
        sortByAscii: undefined,
        sortByNumeric: -1,
        sortByLoadOrder: 0,
      });
    });

    it('should apply sorting correctly when has no element id', () => {
      const dimension = {
        qDef: {
          qSortCriterias: [
            {
              qExpression: {
                qv: 'Median(1)',
              },
              qSortByExpression: undefined,
              qSortByAscii: 1,
              qSortByNumeric: 2,
              qSortByLoadOrder: 3,
            },
          ],
        },
      };

      const chartSorting = {
        expression: {
          qValueExpression: {
            qExpr: 'Median(42)',
          },
        },
        sortCriteria: {
          sortByExpression: 1,
          sortByAscii: undefined,
          sortByNumeric: -1,
          sortByLoadOrder: 0,
        },
      };

      sorter.applyCustomSorting(dimension, chartSorting);

      expect(dimension.qDef.qSortCriterias[0]).to.deep.equal({
        qExpression: {
          qv: 'Median(42)',
        },
        qSortByExpression: 1,
        qSortByNumeric: -1,
        qSortByLoadOrder: 0,
      });

      expect(chartSorting.elementId).to.be.undefined;

      expect(chartSorting.expression).to.deep.equal({
        qValueExpression: {
          qExpr: 'Median(42)',
        },
      });

      expect(chartSorting.sortCriteria).to.deep.equal({
        sortByExpression: 1,
        sortByAscii: undefined,
        sortByNumeric: -1,
        sortByLoadOrder: 0,
      });
    });

    it('should not update dimensions qExpression if chartSorting.sortCriteria.sortByExpression is not used', () => {
      const dimension = {
        qDef: {
          qSortCriterias: [
            {
              qExpression: {
                qv: 'Median(1)',
              },
              qSortByExpression: 1,
              qSortByAscii: 1,
              qSortByNumeric: 2,
              qSortByLoadOrder: 3,
            },
          ],
        },
      };

      const chartSorting = {
        expression: 'Median(42)',
        sortCriteria: {
          sortByExpression: undefined,
          sortByAscii: undefined,
          sortByNumeric: -1,
          sortByLoadOrder: 0,
        },
      };

      sorter.applyCustomSorting(dimension, chartSorting);

      expect(dimension.qDef.qSortCriterias[0].qExpression.qv).to.equal('Median(1)');
    });

    it('should not modify chart sorting', () => {
      const dimension = {
        qDef: {
          qSortCriterias: [
            {
              qExpression: {
                qv: 'Median(1)',
              },
              qSortByExpression: undefined,
              qSortByAscii: 1,
              qSortByNumeric: 2,
              qSortByLoadOrder: 3,
            },
          ],
        },
      };

      const chartSorting = {
        expression: 'Median(42)',
        elementId: 'boxMiddle',
        sortCriteria: {
          sortByExpression: 1,
          sortByAscii: undefined,
          sortByNumeric: -1,
          sortByLoadOrder: 0,
        },
      };

      let original = angular.copy(chartSorting);

      sorter.applyCustomSorting(dimension, chartSorting);

      expect(chartSorting, 'has element id').to.deep.equal(original);

      delete chartSorting.elementId;
      chartSorting.expression = {
        qValueExpression: {
          qExpr: 'Median(42)',
        },
      };

      original = angular.copy(chartSorting);

      sorter.applyCustomSorting(dimension, chartSorting);

      expect(chartSorting, 'no element id').to.deep.equal(original);
    });
  });
});
