/**
 * String validation util.
 *
 */
import 'jquery';

const _MIN_CONNECTION_NAME_LENGTH = 1;
const _MAX_CONNECTION_NAME_LENGTH = 256;
const CHARACTER_AVERAGE_WIDTH = 166 / 26;
const CHARACTER_MAX_WIDTH = 12;
const M_WIDTH = 11;
const CJK_AVERAGE_WIDTH = 12;
const CJK_OVER_LATIN_WIDTH_RATIO = CJK_AVERAGE_WIDTH / M_WIDTH;

function isValidConnectionName(string) {
  // eslint-disable-next-line no-control-regex
  const reg = /^[^\\/:*?"<>|\x00-\x1f]+$/; // forbidden characters
  return (
    typeof string !== 'undefined' &&
    !startsWith(string, '_') &&
    !startsWith(string, '$$') &&
    reg.test(string) &&
    string.length >= _MIN_CONNECTION_NAME_LENGTH &&
    string.length <= _MAX_CONNECTION_NAME_LENGTH
  );
}

function _isValidFieldName(name) {
  return !/[\\*?"()<>|' &$£¤^/+-]+/.test(name);
}

function isValidUrl(url) {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(url.toLowerCase());
}

function prefixHttpToUrl(url) {
  if (/^.*:\/\//.test(url)) {
    return url;
  }

  return `http://${url}`;
}

function startsWith(string, prefix) {
  return string.indexOf(prefix) === 0;
}

function endsWith(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1;
}

function arrayToString(array, delimiter) {
  if (!delimiter) {
    delimiter = '';
  }
  return array.length > 0 ? array.reduce((a, b) => a + delimiter + b) : '';
}

function connectionStringToArray(connectionString) {
  const innerPart = connectionString.replace(/.*\[|\]/gi, '');
  const connArr = innerPart.match(/"[^=]*"|[^;]+/g);
  return connArr;
}

function getValueFromConnectionString(connectionString, key) {
  const connArr = connectionStringToArray(connectionString);
  let i;

  if (connArr) {
    for (i = 0; i < connArr.length; i++) {
      if (connArr[i].toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        return connArr[i].split('=')[1];
      }
    }
  }
  return '';
}

function combinePath(path, filename) {
  function removeDoubleSlashes() {
    return `${path}\\${filename}`.replace('\\\\', '\\');
  }

  function uncPath() {
    if (path.substring(0, 2) === '\\\\') {
      return `\\${removeDoubleSlashes()}`;
    }
    return undefined;
  }

  return uncPath() || removeDoubleSlashes();
}

function tokenizeConnectionString(connectionString) {
  const connArr = connectionStringToArray(connectionString);

  const resultArr = [];

  let pair;

  if (connArr) {
    connArr.forEach((token) => {
      pair = token.split('=');
      if (pair) {
        resultArr.push({
          key: pair[0],
          value: pair.length > 1 ? pair[1] : '',
        });
      }
    });
  }

  return resultArr;
}

function removeSurroundingSlashes(path) {
  if (path.charAt(0) === '\\') {
    path = path.substring(1);
  }
  if (path.charAt(path.length - 1) === '\\') {
    path = path.slice(0, -1);
  }
  return path;
}

function formatDirectoryPathForEngine(path) {
  if (path.charAt(path.length - 1) !== '\\') {
    path += '\\';
  }
  return path;
}

/**

 * Dorky function name, but it basically takes in a file path, such as "c:\\christoffer\\" and goes up one level to "c:\\christoffer\\".
 */

function goUpOneFolderLevel(path) {
  let pathitems;
  if (path.substring(0, 2) === '\\\\') {
    // UNC paths
    pathitems = removeSurroundingSlashes(path.substring(2)).split('\\');
    pathitems.pop();
    return `\\\\${arrayToString(pathitems, '\\')}`;
  }
  pathitems = removeSurroundingSlashes(path).split('\\');
  pathitems.pop();
  return pathitems.length === 1 ? `${pathitems[0]}\\` : arrayToString(pathitems, '\\');
}

function expandNumbersForNaturalSorting(str) {
  return str.replace(/[0-9]+/g, (numberString) => {
    const len = numberString.length;
    const lenString = `${len}`;
    const pad = '000';
    const paddedLength = pad.substring(0, pad.length - lenString.length) + lenString;
    return `${paddedLength}${numberString}`;
  });
}

function _sortSlightlyMoreNaturallyArray(array, propertyName, language) {
  array.sort((a, b) => _sortSlightlyMoreNaturallySingle(a[propertyName], b[propertyName], language));
}

function _sortSlightlyMoreNaturallySingle(a, b, language) {
  const aa = expandNumbersForNaturalSorting(a).toLowerCase();
  const bb = expandNumbersForNaturalSorting(b).toLowerCase();
  return aa.localeCompare(bb, language);
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

/** Returns the number of occurences of the supplied subtring pattern (which could be either a string or a regexp pattern
 * @param {String} string   The string to search
 * @param {String} subStringQuery A string or regexp pattern to search for
 * @param {Boolean} matchCase A state to find string occurrences by matching the string case
 */
function occurrencesRE(string, subStringQuery, matchCase) {
  string += '';
  subStringQuery += '';
  if (!subStringQuery) {
    return 0;
  }
  const isRE = subStringQuery.match(/^\/(.*)\/([a-z]*)$/);
  if (isRE) {
    try {
      const query = new RegExp(isRE[1], isRE[2].indexOf('i') === -1 ? '' : 'i');
      return string.split(query).length - 1;
    } catch (error) {
      return 0;
    }
  } else {
    if (!matchCase) {
      string = string.toLowerCase();
      subStringQuery = subStringQuery.toLowerCase();
    }

    let n = 0;
    let pos = 0;
    const step = subStringQuery.length;
    let done = false;
    while (!done) {
      pos = string.indexOf(subStringQuery, pos);
      if (pos >= 0) {
        n++;
        pos += step;
      } else {
        done = true;
      }
    }
    return n;
  }
}

function fileNameFromPath(filePath) {
  return filePath.substring(filePath.lastIndexOf('\\') + 1, filePath.length);
}

function fileDirectoryFromPath(filePath) {
  return filePath.substring(0, filePath.lastIndexOf('\\') + 1);
}

function lastFolderFromPath(filePath) {
  let match = filePath.match(/.*\\(.*)\\.*$/);

  if (!match) {
    match = filePath.match(/^(.*)\\.*$/);
  }

  if (match) {
    return match[1];
  }

  return null;
}

function bool(value) {
  if (value && value !== 'false') {
    return true;
  }
  return false;
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

function escapeHtml(str) {
  if (!str) {
    return '';
  }
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default {
  MIN_CONNECTION_NAME_LENGTH: _MIN_CONNECTION_NAME_LENGTH,
  MAX_CONNECTION_NAME_LENGTH: _MAX_CONNECTION_NAME_LENGTH,
  isValidConnectionName,
  isValidFieldName: _isValidFieldName,
  isValidUrl,
  prefixHttpToUrl,
  endsWith,
  startsWith,
  goUpOneFolderLevel,
  removeSurroundingSlashes,
  arrayToString,
  formatDirectoryPathForEngine,
  sortSlightlyMoreNaturallyArray: _sortSlightlyMoreNaturallyArray,
  sortSlightlyMoreNaturallySingle: _sortSlightlyMoreNaturallySingle,
  _expandNumbersForNaturalSorting: expandNumbersForNaturalSorting,
  getValueFromConnectionString,
  tokenizeConnectionString,
  contains,
  occurrencesRE,
  combinePath,
  fileNameFromPath,
  fileDirectoryFromPath,
  lastFolderFromPath,
  bool,
  stringWidthOverMWidth,
  getCharacterRatios,
  getTotalCharacterRatios,
  getAdjustedMaxGlyphCount,
  estimateLatinLabelWidth,
  estimateLabelWidth,
  escapeHtml,
};
