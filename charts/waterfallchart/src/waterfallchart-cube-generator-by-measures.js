import waterfallUtils from './waterfallchart-utils';
// import NumberFormatter from '../../../assets/objects/utils/number-formatter';

/**
 * Implementation details
 */

// This will generate a hypercube from n measures

function getGeneratedDimensionPath(dimIndex) {
  return `qDimensionInfo/${dimIndex}`;
}

function getGeneratedMeasurePath(mesIndex) {
  return `qMeasureInfo/${mesIndex}`;
}

function getMeasureFormat(layout) {
  return layout.qHyperCube.qMeasureInfo[0].qNumFormat;
}

function generateHyperCube(layout, theme) {
  const qMeasureInfo = layout.qHyperCube.qMeasureInfo;
  const qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
  const numMeasures = qMeasureInfo.length;
  if (!numMeasures) {
    return;
  }

  const positveColor = waterfallUtils.getColorForPositiveValue(layout, theme);
  const negativeColor = waterfallUtils.getColorForNegativeValue(layout, theme);

  const subtotalColor = waterfallUtils.getColorForSubtotal(layout, theme);
  // const _numberFormatter = new NumberFormatter(); // TODO: number formatter from picasso-plugin-q ??
  const _numberFormatter = { prepare: () => {}, formatValue: (x) => `${x}` };
  _numberFormatter.prepare('#.#A'); // Used by client generated subtotals when format by Measure expression selected.

  const generatedMatrix = [];
  let start = 0;
  let end = 0;
  let startMax = -Number.MAX_VALUE;
  let startMin = Number.MAX_VALUE;
  let endMax = -Number.MAX_VALUE;
  let endMin = Number.MAX_VALUE;
  let numItems = 0;
  let color;
  let qNum;
  for (let i = 0; i < numMeasures; i++) {
    qNum = Number.isNaN(+qMatrix[0][i].qNum) ? 0 : qMatrix[0][i].qNum;
    if (qMeasureInfo[i].valueType !== waterfallUtils.valueTypes.SUBTOTAL) {
      start = end;
      end += qNum * (qMeasureInfo[i].valueType === waterfallUtils.valueTypes.INVERSE ? -1 : 1);
      color = start < end ? positveColor : negativeColor;
      generatedMatrix.push([
        { qText: qMeasureInfo[i].qFallbackTitle, qElemNumber: numItems++ },
        { qText: color },
        { qNum: start },
        { qNum: end },
        { qNum: end - start, qText: qMatrix[0][i].qText },
      ]);
      if (qMeasureInfo[i].subtotal && qMeasureInfo[i].subtotal.enable) {
        generatedMatrix.push([
          { qText: qMeasureInfo[i].subtotal.label || '', qElemNumber: numItems++ },
          { qText: subtotalColor },
          { qNum: 0 },
          { qNum: end },
          { qNum: end, qText: _numberFormatter.formatValue(end) },
        ]);
      }
    } else {
      start = 0;
      end = qNum;
      generatedMatrix.push([
        { qText: qMeasureInfo[i].qFallbackTitle, qElemNumber: numItems++ },
        { qText: subtotalColor },
        { qNum: start },
        { qNum: end },
        { qNum: end - start, qText: qMatrix[0][i].qText },
      ]);
    }
    startMax = Math.max(startMax, start);
    startMin = Math.min(startMin, start);
    endMax = Math.max(endMax, end);
    endMin = Math.min(endMin, end);
  }
  const numFormat = getMeasureFormat(layout);
  const isAutoFormat = layout.qHyperCube.qMeasureInfo[0].qIsAutoFormat;
  const isCustomFormatted = layout.qDef.isCustomFormatted;
  const generated = {
    qHyperCube: {
      qMode: 'S',
      qDataPages: [
        {
          qArea: {
            qTop: 0,
            qLeft: 0,
            qWidth: 5,
            qHeight: generatedMatrix.length,
          },
          qMatrix: generatedMatrix,
        },
      ],
      qDimensionInfo: [
        {
          qStateCounts: {},
        },
        {
          qStateCounts: {},
        },
      ],
      qMeasureInfo: [
        {
          qMin: startMin,
          qMax: startMax,
          qNumFormat: numFormat,
          qIsAutoFormat: isAutoFormat,
          isCustomFormatted,
        },
        {
          qMin: endMin,
          qMax: endMax,
          qNumFormat: numFormat,
          qIsAutoFormat: isAutoFormat,
          isCustomFormatted,
        },
        {
          qMin: endMin,
          qMax: endMax,
          qNumFormat: numFormat,
          qIsAutoFormat: isAutoFormat,
          isCustomFormatted,
        },
      ],
    },
  };
  layout.generatedMatrix = generatedMatrix;
  layout.generated = generated;
}

function generateSlicedHyperCube(layout, top, height) {
  layout.generated.qHyperCube.qDataPages = [
    {
      qArea: {
        qTop: top,
        qLeft: 0,
        qWidth: 5,
        qHeight: height,
      },
      qMatrix: layout.generatedMatrix.slice(top, top + height),
    },
  ];
}

export default {
  generateHyperCube,
  generateSlicedHyperCube,
  getGeneratedDimensionPath,
  getGeneratedMeasurePath,
};
