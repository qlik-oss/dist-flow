function booleanConvertFunctions(isReverseSortFn, defaultSort) {
  isReverseSortFn =
    isReverseSortFn ||
    function () {
      return false;
    };
  defaultSort = defaultSort || 1;
  return {
    get(getFn) {
      return !!getFn('integer');
    },
    set(value, setFn) {
      if (value) {
        const reverseSort = isReverseSortFn();
        let intValue = reverseSort ? -1 : 1;
        intValue *= defaultSort;
        setFn('integer', intValue);
      } else {
        setFn('integer', 0);
      }
    },
  };
}

/**
 * Create convert functions to convert an integer property value for usage in string / enum
 * property-panel components such as the dropdown.
 *
 * @param {Function} isReverseSortFn Function to determine reverse sorting. Optional.
 */
function enumConvertFunctions(isReverseSortFn) {
  isReverseSortFn =
    isReverseSortFn ||
    function () {
      return false;
    };
  return {
    get(getFn) {
      const reverseSortMultiplier = isReverseSortFn() ? -1 : 1;
      const value = getFn('integer') * reverseSortMultiplier;
      switch (value) {
        case -1:
          return 'descending';
        case 1:
          return 'ascending';
        default:
          // 0
          return 'disabled';
      }
    },
    set(value, setFn) {
      const reverseSort = isReverseSortFn();
      switch (value) {
        case 'descending':
          setFn('integer', reverseSort ? 1 : -1);
          break;
        case 'ascending':
          setFn('integer', reverseSort ? -1 : 1);
          break;
        case 'disabled':
          setFn('integer', 0);
          break;
        default:
          // will delete the property
          setFn('integer', undefined);
          break;
      }
    },
  };
}

function invertedEnumConvertFunctions(isReverseSortFn) {
  const invertedIsReverseSortFn = function () {
    return isReverseSortFn ? !isReverseSortFn() : true;
  };
  return enumConvertFunctions(invertedIsReverseSortFn);
}

export default {
  booleanConvertFunctions,
  enumConvertFunctions,
  invertedEnumConvertFunctions,
};
