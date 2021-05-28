// import '../../../../../../test/unit/node-setup';

import chai from 'chai';
import extend from 'extend';
import expressionSortOrderer from '../distributionplot-expression-sort-orderer';

const expect = chai.expect;
let properties;
let prevProperties;

describe('distributionplot-expression-sort-orderer', () => {
  it('should expose the correct api', () => {
    expect(Object.keys(expressionSortOrderer).length).to.equal(1);
    expect(expressionSortOrderer).to.have.keys(['updateSortOrder']);
  });

  describe('updateSortOrder', () => {
    beforeEach(() => {
      const base = {
        sorting: {
          sortCriteria: {},
        },
      };

      properties = extend(true, {}, base);

      prevProperties = extend(true, {}, base);
    });

    it('should not update sortByExpression if no prevProperties', () => {
      expressionSortOrderer.updateSortOrder(properties);

      expect(properties.sorting.sortCriteria.sortByExpression).to.be.undefined;
    });

    it('should not update sortByExpression if sortByExpression is 0 and no prevProperties', () => {
      properties.sorting.sortCriteria.sortByExpression = 0;

      expressionSortOrderer.updateSortOrder(properties);

      expect(properties.sorting.sortCriteria.sortByExpression).to.equal(0);
    });

    it('should not update sortByExpression if sortByExpression is 0, current sortingElement is max and no previous sortingElement', () => {
      properties.sorting.sortCriteria.sortByExpression = 0;
      properties.sorting.elementId = 'distplot-exp-max';

      expressionSortOrderer.updateSortOrder(properties, prevProperties);

      expect(properties.sorting.sortCriteria.sortByExpression).to.equal(0);
    });

    it('should not update sortByExpression if sortByExpression is 0, current sortingElement is max and previous sortingElement is min', () => {
      properties.sorting.sortCriteria.sortByExpression = 0;
      properties.sorting.elementId = 'distplot-exp-max';
      prevProperties.sorting.elementId = 'distplot-exp-min';

      expressionSortOrderer.updateSortOrder(properties, prevProperties);

      expect(properties.sorting.sortCriteria.sortByExpression).to.equal(0);
    });

    it('should set sortByExpression to 1 if current sortingElement is min and previous sortingElement is max', () => {
      properties.sorting.sortCriteria.sortByExpression = -1;
      properties.sorting.elementId = 'distplot-exp-min';
      prevProperties.sorting.elementId = 'distplot-exp-max';

      expressionSortOrderer.updateSortOrder(properties, prevProperties);

      expect(properties.sorting.sortCriteria.sortByExpression).to.equal(1);
    });

    it('should set sortByExpression to -1 if current sortingElement is max and previous sortingElement is min', () => {
      properties.sorting.sortCriteria.sortByExpression = 1;
      properties.sorting.elementId = 'distplot-exp-max';
      prevProperties.sorting.elementId = 'distplot-exp-min';

      expressionSortOrderer.updateSortOrder(properties, prevProperties);

      expect(properties.sorting.sortCriteria.sortByExpression).to.equal(-1);
    });

    it('should set sortByExpression to -1 if current sortingElement is max and there is no previous sortingElement', () => {
      properties.sorting.sortCriteria.sortByExpression = 1;
      properties.sorting.elementId = 'distplot-exp-max';

      expressionSortOrderer.updateSortOrder(properties, prevProperties);

      expect(properties.sorting.sortCriteria.sortByExpression).to.equal(-1);
    });

    it('should set sortByExpression to -1 if current sortingElement is max, properties.sorting.sortByExpression is 1 and no prevProperties.sorting.sortCriteria.sortByExpression', () => {
      properties.sorting.sortCriteria.sortByExpression = 1;
      properties.sorting.elementId = 'distplot-exp-max';

      expressionSortOrderer.updateSortOrder(properties, prevProperties);

      expect(properties.sorting.sortCriteria.sortByExpression).to.equal(-1);
    });

    it('should not update sortByExpression if current and previous both use sortByExpression, but only previous has sortingElement', () => {
      properties.sorting.sortCriteria.sortByExpression = 1;

      prevProperties.sorting.sortCriteria.sortByExpression = 1;
      prevProperties.sorting.elementId = 'distplot-exp-max';

      expressionSortOrderer.updateSortOrder(properties, prevProperties);

      expect(properties.sorting.sortCriteria.sortByExpression).to.equal(1);
    });
  });
});
