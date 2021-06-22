/**
 * Generates an object with the items from an array
 * will use the string found in the property defined by the 'id' property
 *
 *
 * @param array Array of strings with existing items
 * @param idProperty The id of the property to use for mapping to the object.
 * @returns {object} an object with the item and the index of the item in the input array
 */
function mapArrayToObject(array, idProperty) {
  if (!Array.isArray(array)) {
    throw TypeError('array parameter must be of type: array');
  }

  const returnObject = {};
  idProperty = idProperty || 'id';

  array.forEach((item, index) => {
    const id = item[idProperty];

    if (typeof id !== 'string') {
      throw TypeError(`object property value of property:${idProperty} is not a string: ${id}`);
    }

    returnObject[id] = {
      item,
      index,
    };
  });

  return returnObject;
}

export default {
  mapArrayToObject,
};
