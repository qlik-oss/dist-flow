import chai from 'chai';
import BASE_SORTING_SETTINGS from '../sorter-base-sorting-settings';

const expect = chai.expect;

describe('sorter-base-sorting-settings', () => {
  it('should be frozen', () => {
    expect(Object.isFrozen(BASE_SORTING_SETTINGS)).to.be.true;
  });

  describe('ASCII', () => {
    const ASCII = BASE_SORTING_SETTINGS.ASCII;

    it('should be frozen', () => {
      expect(Object.isFrozen(ASCII)).to.be.true;
    });

    it('should return correct values', () => {
      expect(ASCII.ELEMENT, 'ASCII.ELEMENT').to.be.undefined;
      expect(ASCII.SORT_BY_EXPRESSION, 'ASCII.SORT_BY_EXPRESSION').to.be.undefined;
      expect(ASCII.SORT_BY_ASCII, 'ASCII.SORT_BY_ASCII').to.be.equal(1);
      expect(ASCII.SORT_BY_NUMERIC, 'ASCII.SORT_BY_NUMERIC').to.be.equal(1);
      expect(ASCII.SORT_BY_LOAD_ORDER, 'ASCII.SORT_BY_LOAD_ORDER').to.be.equal(1);
    });
  });
});
