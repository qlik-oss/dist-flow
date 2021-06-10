/* eslint-disable no-prototype-builtins */
/* eslint-disable no-use-before-define */
function generateDataFromArray(arr) {
  let i;
  let j;
  let numDim = 0;
  const matrix = [];
  let row;

  let numRows = arr ? arr.length : 0;
  const numCols = numRows && arr[0] ? arr[0].length : 0;

  const data = {
    qHyperCube: {
      qDataPages: [
        {
          qArea: {},
          qMatrix: [],
          qTails: [
            {
              qDown: 0,
              qUp: 0,
            },
          ],
        },
      ],
      qDimensionInfo: [],
      qMeasureInfo: [],
      qMode: 'S',
      qSize: {
        qcx: numCols,
        qcy: numRows,
      },
    },
  };

  const types = arr.splice(0, 1)[0];
  const labels = arr.splice(0, 1)[0];

  numRows -= 2;

  const elemMap = [];
  const elemSize = [];
  for (i = 0; i < numCols; i++) {
    if (types[i] === 'd') {
      numDim++;
      elemMap.push({});
      elemSize.push(0);
      data.qHyperCube.qDimensionInfo.push(generateDimensionInfoFromData(extractColumnFrom2DArray(i, arr), labels[i]));
    } else {
      data.qHyperCube.qMeasureInfo.push(generateMeasureInfoFromData(extractColumnFrom2DArray(i, arr), labels[i]));
    }
  }
  function getElemNo(string, dim) {
    const map = elemMap[dim];
    if (map[string] === undefined) {
      map[string] = elemSize[dim]++;
    }
    return map[string];
  }

  for (i = 0; i < numRows; i++) {
    row = [];
    for (j = 0; j < numDim; j++) {
      row.push({
        qElemNumber: getElemNo(arr[i][j], j),
        qNum: parseFloat(arr[i][j]),
        qState: 'S',
        qText: arr[i][j],
      });
    }

    for (; j < numCols; j++) {
      row.push({
        qElemNumber: 0,
        qNum: arr[i][j],
        qState: 'L',
        qText: `${arr[i][j]}`,
      });
    }
    matrix.push(row);
  }

  data.qHyperCube.qDataPages[0].qMatrix = matrix;
  data.qHyperCube.qDataPages[0].qArea = {
    qTop: 0,
    qLeft: 0,
    qWidth: numCols,
    qHeight: numRows,
  };

  data.color = {
    auto: true,
  };

  return data;
}

function generateDimensionInfoFromData(data, label) {
  const numUnique = Array_getUnique.call(data).length;
  const glyphCount = Math.max.apply(
    null,
    data.map((text) => (text ? text.length : 0))
  );

  const info = {
    othersLabel: 'Otheeeeers',
    qApprMaxGlyphCount: glyphCount,
    qCardinal: numUnique,
    qDimensionType: 'D',
    qFallbackTitle: label,
    qGroupFallbackTitles: [label],
    qGroupPos: 0,
    qGrouping: 'N',
    qSortIndicator: 'N',
    qStateCounts: {
      qAlternative: 0,
      qDeselected: 0,
      qExcluded: 0,
      qLocked: 0,
      qOption: numUnique,
      qSelected: 0,
    },
  };

  return info;
}

function generateMeasureInfoFromData(data, label) {
  const len = data ? data.length : 0;
  const glyphCount = Math.max.apply(
    null,
    data.map((value) => `${value}`.length)
  );
  const max = Math.max.apply(null, data);
  const min = Math.min.apply(null, data);

  const info = {
    qApprMaxGlyphCount: glyphCount,
    qCardinal: len,
    qFallbackTitle: label,
    qMax: max,
    qMin: min,
    qNumFormat: {
      qDec: '.',
      qFmt: '#,###.#',
      qThou: ',',
      qUseThou: 0,
      qnDec: 1,
    },
    qSortIndicator: 'N',
  };

  return info;
}

// eslint-disable-next-line camelcase
function Array_getUnique() {
  const u = {};
  const a = [];
  for (let i = 0, l = this.length; i < l; ++i) {
    if (u.hasOwnProperty(this[i])) {
      // eslint-disable-next-line no-continue
      continue;
    }
    a.push(this[i]);
    u[this[i]] = 1;
  }
  return a;
}

function extractColumnFrom2DArray(columnIndex, arr) {
  const column = [];
  arr.forEach((row) => {
    column.push(row[columnIndex]);
  });

  return column;
}

export default {
  generateDataFromArray,
};
