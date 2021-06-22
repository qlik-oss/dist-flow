import hashFromString from '../../../extra/hash-from-string';

const hash = {
  generateHash,
  updateHash,
};

export default hash;

/**
 * Implementation details
 */

function generateHash(hashData) {
  return hashFromString(JSON.stringify(hashData));
}

function updateHash(properties, hashData) {
  if (!properties.qUndoExclude) {
    properties.qUndoExclude = {};
  }

  properties.qUndoExclude.hashCode = hash.generateHash(hashData);
}
