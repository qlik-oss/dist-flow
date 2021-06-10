import chai from 'chai';
import sortingConvertFunctions from '../convert-functions';

const expect = chai.expect;

function trueFn() {
  return true;
}

describe('sorting-convert-functions: ', () => {
  let value;

  function getFn(/* type */) {
    return value;
  }

  function setFn(type, val) {
    value = val;
  }

  beforeEach(() => {
    value = 0;
  });

  describe('booleanConvertFunctions: ', () => {
    it('get: ', () => {
      const get = sortingConvertFunctions.booleanConvertFunctions().get;

      value = 1;
      expect(get(getFn)).to.be.true;

      value = -1;
      expect(get(getFn)).to.be.true;

      value = 0;
      expect(get(getFn)).to.be.false;
    });

    it('set: ', () => {
      const set = sortingConvertFunctions.booleanConvertFunctions().set;

      set(true, setFn); // Should set ascending as default
      expect(value).to.equal(1);

      set(false, setFn);
      expect(value).to.equal(0);
    });

    it('get - inverted: ', () => {
      const get = sortingConvertFunctions.booleanConvertFunctions(trueFn).get;

      value = 1;
      expect(get(getFn)).to.be.true;

      value = -1;
      expect(get(getFn)).to.be.true;

      value = 0;
      expect(get(getFn)).to.be.false;
    });

    it('set - inverted: ', () => {
      const set = sortingConvertFunctions.booleanConvertFunctions(trueFn).set;

      set(true, setFn);
      expect(value).to.equal(-1); // Should set descending as default

      set(false, setFn);
      expect(value).to.equal(0);
    });

    it('set - default sorting: ', () => {
      const set = sortingConvertFunctions.booleanConvertFunctions(() => false, -1).set;

      set(true, setFn); // Should set decending as default
      expect(value).to.equal(-1);

      set(false, setFn);
      expect(value).to.equal(0);
    });
  });
});
