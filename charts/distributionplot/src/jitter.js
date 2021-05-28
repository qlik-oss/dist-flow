/**
 * A tool for jittering positions of data points
 */
import hashFromString from '@qlik/common/extra/hash-from-string';

const JITTER_LEVELS = 10;

const Jitter = function () {
  this._maxJitter = 1;
};

/**
 * Sets _maxJitter relative to a given point size or limits to maximum available space specified
 * @param pointSize - Relative to chart rendering area
 * @param jitterParameter - Multiplier controlling how many points wide the jittering is going to be
 * @param availableWidth - Absolute max of jittering (relative to chart rendering area)
 */
Jitter.prototype.calcMaxJitter = function (pointSize, jitterParameter, availableWidth) {
  this._maxJitter = Math.min(pointSize * jitterParameter, availableWidth - pointSize);
};

/**
 * Calculates a jitter amount based on a number or string (CONSISTENT from time to time)
 * @param value - String or number used as a "seed" for calculating jitter amount
 * @returns {number} - fraction of chart rendering area (negative or positive)
 */
Jitter.prototype.getJitterValue = function (value) {
  const fraction = Math.abs(hashFromString(`${value}`) % JITTER_LEVELS) / (JITTER_LEVELS - 1);
  return this._maxJitter / 2 - fraction * this._maxJitter;
};

export default Jitter;
