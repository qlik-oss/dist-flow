/* eslint no-var: 0, no-plusplus: 0, no-self-compare: 0, no-restricted-globals: 0 */
if (!Math.sign) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
  Math.sign = (x) => (x > 0) - (x < 0) || +x;
}

if (!Object.entries) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
  Object.entries = (obj) => {
    var ownProps = Object.keys(obj);
    var i = ownProps.length;
    var resArray = new Array(i); // preallocate the Array
    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }

    return resArray;
  };
}

if (!Number.isNaN) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
  Number.isNaN = (value) => value !== value;
}

if (Number.isFinite === undefined) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
  Number.isFinite = function isNumberFinite(value) {
    return typeof value === 'number' && isFinite(value);
  };
}
