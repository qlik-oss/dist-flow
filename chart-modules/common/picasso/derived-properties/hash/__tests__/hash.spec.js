import '../../../../../../../test/unit/node-setup';
import sinon from 'sinon';
import { expect } from 'chai';
import hash from '../hash';

describe('derived properties hash', () => {
  const hashData = {
    numbers: [1, 2, 3],
    props: {
      text: 'My text',
      bool: false,
    },
  };

  describe('updateHash', () => {
    it("should create qUndoExlcude property if it's missing", () => {
      const properties = {};

      hash.updateHash(properties, hashData);

      expect(properties).to.deep.equal({
        qUndoExclude: {
          hashCode: hash.generateHash(hashData),
        },
      });
    });

    it('should update hashCode', () => {
      const properties = {
        qUndoExclude: {
          something: true,
        },
      };

      sinon.spy(hash, 'generateHash');

      hash.updateHash(properties, hashData);

      // Make sure updateHash calls generateHash to create the hash
      expect(hash.generateHash.calledOnce).to.be.true;
      hash.generateHash.restore();

      expect(properties).to.deep.equal({
        qUndoExclude: {
          something: true,
          hashCode: hash.generateHash(hashData),
        },
      });
    });
  });
});
