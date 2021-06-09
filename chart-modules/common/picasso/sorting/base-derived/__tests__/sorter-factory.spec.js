import chai from 'chai';
import sorterFactory from '../sorter-factory';
import Sorter from '../Sorter';

const expect = chai.expect;

describe('sorter-factory', () => {
  it('should expose the correct api', () => {
    expect(Object.keys(sorterFactory).length).to.equal(1);
    expect(sorterFactory).to.have.keys(['create']);
  });

  describe('create', () => {
    it('should return an instance of Sorter', () => {
      const sorter = sorterFactory.create({}, {});

      expect(sorter).to.be.an.instanceof(Sorter);
    });
  });
});
