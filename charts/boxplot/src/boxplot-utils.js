const totalAndAggr = 'total {{<OuterDim>}} Aggr( {{InnerMeasure}}, {{OuterDim,}} {{InnerDim}} ) ';
const medianFn = `Median( ${totalAndAggr} )`;

function getFractileFunction(percentile) {
  let fnName = 'Fractile';
  let percentileString = '';

  if (percentile === 0) {
    fnName = 'Min';
  } else if (percentile === 1) {
    fnName = 'Max';
  } else {
    percentileString = `,${percentile}`;
  }

  return `${fnName}( ${totalAndAggr}${percentileString} )`;
}

function getInterQuartileRangeFunction(range) {
  return `((${getFractileFunction(0.75)} - ${getFractileFunction(0.25)}) * ${range})`;
}

function withinRangeMin(expr) {
  return `Rangemin(${expr}, ${getFractileFunction(1)})`;
}

function withinRangeMax(expr) {
  return `Rangemax(${expr}, ${getFractileFunction(0)})`;
}

const firstQuartileFn = getFractileFunction(0.25);
const thirdQuartileFn = getFractileFunction(0.75);
const stdDevExpr = `Stdev( ${totalAndAggr} ) `;
const meanFn = `Avg( ${totalAndAggr} )`;

const boxplotUtils = {
  getFractileFunction,
  BOXELEMENTS: {
    firstWhisker: {
      translationKey: 'boxplot.firstWhisker',
    },
    boxStart: {
      translationKey: 'boxplot.boxStart',
    },
    boxMiddle: {
      translationKey: 'boxplot.centerLine',
    },
    boxEnd: {
      translationKey: 'boxplot.boxEnd',
    },
    lastWhisker: {
      translationKey: 'boxplot.lastWhisker',
    },
  },
  BOXMODES: {
    TUKEY: {
      value: 'tukey',
      translation: 'properties.boxplot.calculationMode.tukey',
      calcParameters: [
        { value: 1, labelKey: 'properties.boxplot.calculationMode.tukey.short' },
        { value: 1.5, labelKey: 'properties.boxplot.calculationMode.tukey.medium' },
        { value: 2, labelKey: 'properties.boxplot.calculationMode.tukey.long' },
      ],
      defaultCalcParam: 1.5,
      getBoxExpressions(calcParameter) {
        calcParameter = calcParameter || this.defaultCalcParam;
        const iqrFn = getInterQuartileRangeFunction(calcParameter);
        const firstWhiskerExpr = `${firstQuartileFn} - ${iqrFn}`;
        const lastWhiskerExpr = `${thirdQuartileFn} + ${iqrFn}`;

        return {
          firstWhisker: withinRangeMax(firstWhiskerExpr),
          boxStart: firstQuartileFn,
          boxMiddle: medianFn,
          boxEnd: thirdQuartileFn,
          lastWhisker: withinRangeMin(lastWhiskerExpr),

          // also exposing expressions without rangemin/max in order to base label on same expression
          _nonWrapped: {
            /*
            firstWhisker: firstWhiskerExpr,
            lastWhisker: lastWhiskerExpr,
          */
          },
        };
      },
    },
    FRACTILES: {
      value: 'fractiles',
      translation: 'properties.boxplot.calculationMode.fractiles',
      calcParameters: [
        { value: 0, labelKey: 'properties.boxplot.calculationMode.fractiles.minmax' },
        { value: 0.01, labelKey: 'properties.boxplot.calculationMode.fractiles.first' },
        { value: 0.05, labelKey: 'properties.boxplot.calculationMode.fractiles.fifth' },
        { value: 0.1, labelKey: 'properties.boxplot.calculationMode.fractiles.tenth' },
      ],
      defaultCalcParam: 0.01,
      getBoxExpressions(calcParameter) {
        if (Number.isNaN(+calcParameter)) {
          calcParameter = this.defaultCalcParam;
        }

        return {
          firstWhisker: getFractileFunction(calcParameter),
          boxStart: firstQuartileFn,
          boxMiddle: medianFn,
          boxEnd: thirdQuartileFn,
          lastWhisker: getFractileFunction(1 - calcParameter),
        };
      },
    },
    STDDEV: {
      value: 'stdDev',
      translation: 'properties.boxplot.calculationMode.stdDev',
      calcParameters: [
        { value: 2, labelKey: 'properties.boxplot.calculationMode.stdDev.short' },
        { value: 3, labelKey: 'properties.boxplot.calculationMode.stdDev.medium' },
        { value: 4, labelKey: 'properties.boxplot.calculationMode.stdDev.long' },
      ],
      defaultCalcParam: 3,
      getBoxExpressions(calcParameter) {
        calcParameter = calcParameter || this.defaultCalcParam;

        const firstWhiskerExpr = `${meanFn} - ${calcParameter} *(${stdDevExpr})`;
        const boxStartExpr = `${meanFn} - ${stdDevExpr}`;
        const boxEndExpr = `${meanFn} + ${stdDevExpr}`;
        const lastWhiskerExpr = `${meanFn} + ${calcParameter} *(${stdDevExpr})`;

        return {
          firstWhisker: withinRangeMax(firstWhiskerExpr),
          boxStart: withinRangeMax(boxStartExpr),
          boxMiddle: meanFn,
          boxEnd: withinRangeMin(boxEndExpr),
          lastWhisker: withinRangeMin(lastWhiskerExpr),

          _nonWrapped: {
            /*
            firstWhisker: firstWhiskerExpr,
            boxStart: boxStartExpr,
            boxEnd: boxEndExpr,
            lastWhisker: lastWhiskerExpr,
            */
          },
        };
      },
    },
  },
};

// Dynamicily built translations
// properties.boxplot.calculationMode.fractiles.elements.boxEnd
// properties.boxplot.calculationMode.fractiles.elements.boxMiddle
// properties.boxplot.calculationMode.fractiles.elements.boxStart
// properties.boxplot.calculationMode.fractiles.elements.firstWhisker.fifth
// properties.boxplot.calculationMode.fractiles.elements.firstWhisker.first
// properties.boxplot.calculationMode.fractiles.elements.firstWhisker.min
// properties.boxplot.calculationMode.fractiles.elements.firstWhisker.tenth
// properties.boxplot.calculationMode.fractiles.elements.lastWhisker.max
// properties.boxplot.calculationMode.fractiles.elements.lastWhisker.ninetieth
// properties.boxplot.calculationMode.fractiles.elements.lastWhisker.ninetyfifth
// properties.boxplot.calculationMode.fractiles.elements.lastWhisker.ninetynineth
// properties.boxplot.calculationMode.stdDev.elements.boxEnd
// properties.boxplot.calculationMode.stdDev.elements.boxMiddle
// properties.boxplot.calculationMode.stdDev.elements.boxStart
// properties.boxplot.calculationMode.stdDev.elements.firstWhisker
// properties.boxplot.calculationMode.stdDev.elements.lastWhisker
// properties.boxplot.calculationMode.tukey.elements.boxEnd
// properties.boxplot.calculationMode.tukey.elements.boxMiddle
// properties.boxplot.calculationMode.tukey.elements.boxStart
// properties.boxplot.calculationMode.tukey.elements.firstWhisker
// properties.boxplot.calculationMode.tukey.elements.lastWhisker

function modifyElementNameForFractileWhiskers(elementName, calcParam) {
  let additionalString = '';
  const isFirst = elementName === 'firstWhisker';

  switch (calcParam) {
    case 0:
      additionalString = isFirst ? '.min' : '.max';
      break;
    case 0.01:
      additionalString = isFirst ? '.first' : '.ninetynineth';
      break;
    case 0.05:
      additionalString = isFirst ? '.fifth' : '.ninetyfifth';
      break;
    case 0.1:
      additionalString = isFirst ? '.tenth' : '.ninetieth';
      break;
    default:
      break;
  }
  elementName += additionalString;

  return elementName;
}

function getNameExpressionForFractilesMode(elementName, calcParam, mode, translator) {
  if (elementName === 'firstWhisker' || elementName === 'lastWhisker') {
    elementName = modifyElementNameForFractileWhiskers(elementName, calcParam);
  }

  const name = translator.get(`properties.boxplot.calculationMode.${mode}.elements.${elementName}`, calcParam);
  return { name, type: 'string' };
}

function getNameExpression(elementName, calcParam, mode, translator) {
  const defaultString = translator.get(`properties.boxplot.calculationMode.${mode}.elements.${elementName}`, calcParam);

  let boxModeUtils;

  switch (mode) {
    case boxplotUtils.BOXMODES.FRACTILES.value:
      boxModeUtils = boxplotUtils.BOXMODES.FRACTILES;
      break;
    case boxplotUtils.BOXMODES.STDDEV.value:
      boxModeUtils = boxplotUtils.BOXMODES.STDDEV;
      break;
    case boxplotUtils.BOXMODES.TUKEY.value:
      boxModeUtils = boxplotUtils.BOXMODES.TUKEY;
      break;
    default:
      break;
  }

  const boxExpressions = boxModeUtils.getBoxExpressions(calcParam);
  const nonWrappedExpr = boxExpressions._nonWrapped[elementName];

  if (!nonWrappedExpr) {
    return { name: defaultString, type: 'string' };
  }

  let returnString;

  if (elementName === 'firstWhisker' || elementName === 'boxStart') {
    const minString = translator.get('properties.boxplot.calculationMode.fractiles.elements.firstWhisker.min');
    const minExpr = getFractileFunction(0);

    returnString = `if(${nonWrappedExpr} < ${minExpr}, '${minString}', '${defaultString}' )`;
  } else {
    const maxString = translator.get('properties.boxplot.calculationMode.fractiles.elements.lastWhisker.max');
    const maxExpr = getFractileFunction(1);

    returnString = `if(${nonWrappedExpr} > ${maxExpr}, '${maxString}', '${defaultString}' )`;
  }

  return { name: returnString, type: 'expression' };
}

boxplotUtils.getDefaultNameTemplate = function (elementName, boxProps, translator) {
  const mode = boxProps.calculations.mode;
  const calcParam = boxProps.calculations.parameters[mode];
  let nameTemplate;

  if (mode === boxplotUtils.BOXMODES.FRACTILES.value) {
    nameTemplate = getNameExpressionForFractilesMode(elementName, calcParam, mode, translator);
  } else {
    nameTemplate = getNameExpression(elementName, calcParam, mode, translator);
  }

  return nameTemplate;
};

export default boxplotUtils;
