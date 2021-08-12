/**
 * String validation util.
 *
 */

const CHARACTER_AVERAGE_WIDTH = 166 / 26;
const CHARACTER_MAX_WIDTH = 12;
const M_WIDTH = 11;
const CJK_AVERAGE_WIDTH = 12;
const CJK_OVER_LATIN_WIDTH_RATIO = CJK_AVERAGE_WIDTH / M_WIDTH;

function startsWith(string, prefix) {
  return string.indexOf(prefix) === 0;
}

function endsWith(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
}

function contains(haystack, needle) {
  if (!haystack) {
    throw new Error('Haystack is undefined.');
  }

  if (!needle) {
    throw new Error('Needle is undefined.');
  }

  return haystack.indexOf(needle) !== -1;
}

function stringWidthOverMWidth(len) {
  const n = 3; // For short strings with wide letters or numbers
  return (Math.min(len, n) * CHARACTER_MAX_WIDTH + Math.max(len - n, 0) * CHARACTER_AVERAGE_WIDTH) / M_WIDTH;
}

function getCharacterRatios(s) {
  if (!s) {
    return {
      latin: 0,
      cjk: 0,
    };
  }
  let CJK = s.match(/[\u4E00-\u9FFF]/g);
  let hiragana = s.match(/[\u3040-\u309F]/g);
  let katakana = s.match(/[\u30A0-\u30FF]/g);
  CJK = CJK ? CJK.length : 0;
  hiragana = hiragana ? hiragana.length : 0;
  katakana = katakana ? katakana.length : 0;
  const t = CJK + hiragana + katakana;
  return {
    latin: s.length - t,
    cjk: t,
  };
}

function getTotalCharacterRatios(qMatrix, columnIndex) {
  const total = { latin: 0, cjk: 0 };
  if (columnIndex === undefined) {
    qMatrix.forEach((row) => {
      const res = getCharacterRatios(row.qText);
      total.latin += res.latin;
      total.cjk += res.cjk;
    });
  } else {
    qMatrix.forEach((row) => {
      const res = getCharacterRatios(row[columnIndex].qText);
      total.latin += res.latin;
      total.cjk += res.cjk;
    });
  }
  const t = Math.max(1, total.latin + total.cjk);
  total.latinRatio = total.latin / t;
  total.cjkRatio = total.cjk / t;
  return total;
}

function getAdjustedMaxGlyphCount(maxGlyphCount, qMatrix, columnIndex) {
  const totalCharacterRatios = getTotalCharacterRatios(qMatrix, columnIndex);
  const latinGlyphCount = totalCharacterRatios.latinRatio * maxGlyphCount;
  const cjkGlyphCount = totalCharacterRatios.cjkRatio * maxGlyphCount;
  const adjustedMaxGlyphCount = Math.ceil(
    stringWidthOverMWidth(latinGlyphCount) + cjkGlyphCount * CJK_OVER_LATIN_WIDTH_RATIO
  );
  return adjustedMaxGlyphCount;
}

// TODO: Need to improve to make sure longer strings should have bigger width than shorter strings
function estimateLatinLabelWidth(numLatins, maxLatinWidth, averageLatinWidth) {
  const latinWidth = numLatins <= 24 ? maxLatinWidth : averageLatinWidth;
  return numLatins * latinWidth;
}

function estimateLabelWidth(numCjks, numLatins, cjkWidth, maxLatinWidth, averageLatinWidth) {
  return numCjks * cjkWidth + estimateLatinLabelWidth(numLatins, maxLatinWidth, averageLatinWidth);
}

export default {
  endsWith,
  startsWith,
  contains,
  stringWidthOverMWidth,
  getCharacterRatios,
  getTotalCharacterRatios,
  getAdjustedMaxGlyphCount,
  estimateLatinLabelWidth,
  estimateLabelWidth,
};
