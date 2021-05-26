// import '../../../../../../test/unit/node-setup';

import chai from 'chai';
import BOXPLOT_SORTING_SETTINGS from '../boxplot-sorting-settings';

const expect = chai.expect;

describe('boxplot-sorting-settings', () => {
  describe('ASCII', () => {
    const ASCII = BOXPLOT_SORTING_SETTINGS.ASCII;

    it('should return correct values', () => {
      expect(ASCII.ELEMENT, 'ASCII.ELEMENT').to.be.undefined;
      expect(ASCII.SORT_BY_EXPRESSION, 'ASCII.SORT_BY_EXPRESSION').to.be.undefined;
      expect(ASCII.SORT_BY_ASCII, 'ASCII.SORT_BY_ASCII').to.be.equal(1);
      expect(ASCII.SORT_BY_NUMERIC, 'ASCII.SORT_BY_NUMERIC').to.be.equal(1);
      expect(ASCII.SORT_BY_LOAD_ORDER, 'ASCII.SORT_BY_LOAD_ORDER').to.be.equal(1);
    });
  });

  describe('BOX_MIDDLE', () => {
    const BOX_MIDDLE = BOXPLOT_SORTING_SETTINGS.BOX_MIDDLE;

    it('should return correct values', () => {
      expect(BOX_MIDDLE.ELEMENT, 'BOX_MIDDLE.ELEMENT').to.equal('boxMiddle');
      expect(BOX_MIDDLE.SORT_BY_EXPRESSION, 'BOX_MIDDLE.SORT_BY_EXPRESSION').to.equal(1);
      expect(BOX_MIDDLE.SORT_BY_ASCII, 'BOX_MIDDLE.SORT_BY_ASCII').to.be.equal(1);
      expect(BOX_MIDDLE.SORT_BY_NUMERIC, 'BOX_MIDDLE.SORT_BY_NUMERIC').to.be.equal(1);
      expect(BOX_MIDDLE.SORT_BY_LOAD_ORDER, 'BOX_MIDDLE.SORT_BY_LOAD_ORDER').to.be.equal(1);
    });
  });
});
