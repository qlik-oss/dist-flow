import isInteger from '@qlik/common/extra/is-integer';
import isNumeric from '@qlik/common/extra/is-numeric';

const LOG10 = Math.log(10);
const EPSILON = 1e-9;
const NICE_NUMBERS1 = [1, 1.5, 2, 3, 4, 5, 6, 10];
const NICE_NUMBERS2 = [1, 2, 4, 5, 6, 8, 10];
const LOOP_CONTROL_NUMBERS = [2, 4, 5, 10];

/**
 * Implementation details
 */

function validateInput(min, max, binCount) {
  if (!isNumeric(min) || !isNumeric(max) || !isNumeric(binCount)) {
    throw Error('binSizeCalculator: One of the inputs is NOT numeric');
  }

  if (min > max) {
    throw Error("binSizeCalculator: The 'min' parameter is bigger than the 'max' parameter");
  }
}

function getBinCount(binCount) {
  // The smallest number of bins possible is 1
  if (binCount < 1) {
    return 1;
  }

  // The numbers of bins needs to be an integer, round it with Math.ceil
  if (!isInteger(binCount)) {
    return Math.ceil(binCount);
  }

  return binCount;
}

function getGoodNumber(value, niceNumbers) {
  if (value === 0) {
    return 0;
  }
  let roundedFraction;
  const magnitude = Math.floor(Math.log(Math.abs(value)) / LOG10);
  const fraction = value / 10 ** magnitude;
  for (let i = 0; i < niceNumbers.length; i++) {
    if (fraction <= niceNumbers[i]) {
      roundedFraction = niceNumbers[i];
      break;
    }
  }

  // Fix floating error
  return (
    (magnitude >= 0 ? roundedFraction * 10 ** magnitude : roundedFraction / 10 ** -magnitude) * (value < 0 ? -1 : 1)
  );
}

function calculateNumEmptyBins(min, max, nbrOfBins, binSize, newMin, newMax) {
  return Math.floor(Math.abs(min - newMin) / binSize) + Math.floor(Math.abs(newMax - max) / binSize);
}

function calculateBinSize(min, max, nbrOfBins) {
  let newMin;
  let newMax;
  let range;
  let binSize;
  let niceBinSize;
  let magnitude;
  let f;
  let k;
  let i = -1;
  let delta;
  let n;
  let loop;
  let t;
  let niceNumbers = NICE_NUMBERS1;
  nbrOfBins = Math.max(1, nbrOfBins);
  if (max === min) {
    if (max === 0) {
      binSize = 1;
      if (nbrOfBins === 1) {
        return {
          min,
          max,
          nbrOfBins,
          rawBinSize: range / nbrOfBins,
          offset: -0.5, // new min
          newMax: 0.5,
          binSize: 1,
          numEmptyBins: 0,
        };
      }
    } else if (nbrOfBins === 1) {
      binSize = max + EPSILON;
      niceNumbers = NICE_NUMBERS2;
    } else {
      binSize = Math.abs(max / nbrOfBins);
    }
  } else {
    max += EPSILON;
    range = max - min;
    binSize = range / nbrOfBins;
  }
  do {
    k = 1;
    loop = 0;
    if (i >= 0) {
      delta = 1 / LOOP_CONTROL_NUMBERS[i];
      n = 1;
      niceNumbers = [];
      while (n <= 10) {
        niceNumbers.push(Math.round(n * 1000) / 1000);
        n += delta;
      }
    }
    niceBinSize = binSize;
    do {
      niceBinSize = getGoodNumber(niceBinSize * k, niceNumbers);
      magnitude = Math.floor(Math.log(niceBinSize) / LOG10);
      f = 10 ** magnitude;
      if (max === min) {
        newMax = (Math.ceil(max / niceBinSize) + Math.floor(nbrOfBins / 2)) * niceBinSize;
      } else {
        newMax = Math.ceil(max / niceBinSize) * niceBinSize;
      }
      newMin = newMax - nbrOfBins * niceBinSize;
      let j = 0;
      t = f;
      while ((newMin > min || newMax < max) && j < LOOP_CONTROL_NUMBERS.length) {
        newMin = Math.floor(min / t) * t;
        newMax = newMin + nbrOfBins * niceBinSize;
        t = f / LOOP_CONTROL_NUMBERS[j++];
      }

      // Fix floating error
      if (magnitude < 1) {
        f = 10 ** (Math.abs(magnitude) + 1);
        newMax = Math.round(newMax * f) / f;
        newMin = Math.round(newMin * f) / f;
      }
      k = 1.1;
      loop++;
    } while ((newMin > min || newMax < max) && loop < 10); // Bin size should be increased to cover the min-max range
    i++;
  } while (calculateNumEmptyBins(min, max, nbrOfBins, binSize, newMin, newMax) > 0 && i < LOOP_CONTROL_NUMBERS.length);
  return {
    binCount: nbrOfBins,
    offset: newMin, // new min
    binSize: niceBinSize,
  };
}

function preCalculateBinSize(min, max, binCount) {
  // General input validation
  validateInput(min, max, binCount);

  // Makes sure binCount is an integer bigger than 0
  binCount = getBinCount(binCount);

  return calculateBinSize(min, max, binCount);
}

const binSizeCalculator = {
  calculateBinSize: preCalculateBinSize,
};

export default binSizeCalculator;
