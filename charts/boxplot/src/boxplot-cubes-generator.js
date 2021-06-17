import extend from 'extend';
import { getValue } from 'qlik-chart-modules';
import generateId from '@qlik/common/extra/generate-id';
import attExpUtil from '@qlik/common/extra/attribute-expression-util';
import NumberFormatUtil from '@qlik/common/extra/number-format-util';
import boxplotUtils from './boxplot-utils';
import boxplotSorter from './sorting/boxplot-sorter';
import bpExprGen from './boxplot-expression-generator';
// import translator from '../../../js/lib/translator';

const OUTLIERMEASURE =
  'If( {{InnerMeasure}} < {{FirstWhisker}} or {{InnerMeasure}} > {{LastWhisker}}, {{InnerMeasure}} )';
const OUTLIERFILTER2DIMS =
  'If( {{InnerMeasure}} < {{FirstWhisker}} or {{InnerMeasure}} > {{LastWhisker}} or {{FirstInnerRow}}, {{OuterDim&}} {{InnerDim}} )';
const OUTLIERFILTER1DIM =
  'If( {{InnerMeasure}} < {{FirstWhisker}} or {{InnerMeasure}} > {{LastWhisker}}, {{OuterDim&}} {{InnerDim}} )';
const OUTLIERSORTING =
  'If( {{InnerMeasure}} < {{FirstWhisker}}, {{FirstWhisker}} - {{InnerMeasure}}, {{InnerMeasure}} - {{LastWhisker}} )';
const FIRSTINNERROW = 'Alt( Aggr( RowNo(), {{OuterDim,}} {{InnerDim}} ), 1 ) = 1';

function getDefaultExpression(mode, element, innerMeasure, innerDim, outerDim, boxProps) {
  if (!boxProps.calculations || !boxProps.calculations.parameters) {
    return undefined;
  }

  let expressions;
  switch (mode) {
    case boxplotUtils.BOXMODES.STDDEV.value:
      expressions = boxplotUtils.BOXMODES.STDDEV.getBoxExpressions(boxProps.calculations.parameters.stdDev);
      break;
    case boxplotUtils.BOXMODES.FRACTILES.value:
      expressions = boxplotUtils.BOXMODES.FRACTILES.getBoxExpressions(boxProps.calculations.parameters.fractiles);
      break;
    case boxplotUtils.BOXMODES.TUKEY.value:
    default:
      expressions = boxplotUtils.BOXMODES.TUKEY.getBoxExpressions(boxProps.calculations.parameters.tukey);
      break;
  }

  if (!expressions) {
    return '';
  }

  return bpExprGen.replaceDefaultExpression(expressions[element], innerMeasure, innerDim, outerDim);
}

function getDimensionData(id, app, drillIndex) {
  return app.getDimension(id).then((item) => item.getProperties().then((props) => props.qDim.qFieldDefs[drillIndex]));
}

function getMeasureData(id, app) {
  return app.getMeasure(id).then((item) =>
    item.getProperties().then((props) => ({
      expression: props.qMeasure.qDef,
      format: {
        qNumFormat: props.qMeasure.qNumFormat,
        isCustomFormatted: props.qMeasure.isCustomFormatted,
      },
    }))
  );
}

function getDimensionAndMeasureData(hyperCubeDef, drillIndexes, app) {
  const dimensions = Promise.all(
    hyperCubeDef.qDimensions.map((dimension, index) => {
      if (dimension.qLibraryId) {
        return getDimensionData(dimension.qLibraryId, app, drillIndexes[index]);
      }
      return dimension.qDef.qFieldDefs[0];
    })
  );
  const measures = Promise.all(
    hyperCubeDef.qMeasures.map((measure) => {
      if (measure.qLibraryId) {
        return getMeasureData(measure.qLibraryId, app);
      }
      return {
        expression: measure.qDef.qDef,
      };
    })
  );
  return Promise.all([dimensions, measures]).then(([dimension, measures]) => ({
    expressions: dimension.concat(measures.map((m) => m.expression)),
    formats: measures.map((m) => m.format),
  }));
}

function createAttributeExpression(expr, id) {
  return attExpUtil.create(id, { qExpression: expr });
}

function generateHyperCubes(props, drillIndexes, layout, app, translator) {
  props.qUndoExclude = props.qUndoExclude || {};

  props.qUndoExclude.box = props.qUndoExclude.box || { qHyperCubeDef: {} };
  const boxCube = props.qUndoExclude.box.qHyperCubeDef;
  const boxProps = props.boxplotDef;
  const cube = boxProps.qHyperCubeDef;

  // Reset
  boxCube.qDimensions = [];
  boxCube.qMeasures = [];
  boxCube.qCalcCond = cube.qCalcCond;
  boxCube.qCalcCondition = cube.qCalcCondition;

  const mode = boxProps.calculations.mode;

  const innerDim = extend(true, {}, cube.qDimensions[0]);
  let outerDim;
  let limitDim;
  const innerMeasure = cube.qMeasures[0];
  const numDims = cube.qDimensions.length;
  let expression;
  let measure;
  const elements = boxProps.elements;

  const hasTwoDimensions = boxProps.qHyperCubeDef.qDimensions.length === 2;

  let qAttributeExpressions = [];
  const colorByExpression = !props.boxplotDef.color.auto && props.boxplotDef.color.mode === 'byExpression';
  if (numDims > 0 && colorByExpression) {
    qAttributeExpressions = [
      createAttributeExpression(
        props?.boxplotDef?.color?.expression?.qValueExpression?.qExpr,
        attExpUtil.IDMAP.COLOR_BY_EXPRESSION
      ),
    ];
  }

  if (cube.qDimensions[1]) {
    outerDim = extend(true, {}, cube.qDimensions[1]);
    boxCube.qDimensions.push(outerDim);
  }

  return getDimensionAndMeasureData(boxProps.qHyperCubeDef, drillIndexes, app).then(({ expressions, formats }) => {
    const outerDimExpr = outerDim ? expressions[1] : '';

    Object.keys(boxplotUtils.BOXELEMENTS).forEach((boxElement) => {
      const qExpr = getValue(boxProps, `elements.${boxElement}`);
      const hasExpression = !(
        !qExpr ||
        !qExpr.expression ||
        (qExpr.expression.qValueExpression &&
          (!qExpr.expression.qValueExpression.qExpr || !qExpr.expression.qValueExpression.qExpr.length))
      ); // checks for existance of an expression (not validity)
      if ((boxProps.calculations && boxProps.calculations.auto) || !elements || !hasExpression) {
        expression = getDefaultExpression(
          mode,
          boxElement,
          expressions[numDims],
          expressions[0],
          outerDimExpr,
          boxProps
        );
      } else {
        const elemExpr = elements[boxElement].expression;
        expression = typeof elemExpr === 'object' ? elemExpr.qValueExpression.qExpr : elemExpr;
      }

      measure = { qDef: {} };
      if (NumberFormatUtil.isUsingMasterNumberFormat(innerMeasure.qDef)) {
        measure.qDef.qNumFormat = formats[0]?.qNumFormat;
        measure.qDef.isCustomFormatted = formats[0]?.isCustomFormatted;
      } else {
        measure.qDef.qNumFormat = innerMeasure.qDef.qNumFormat;
        measure.qDef.isCustomFormatted = innerMeasure.qDef.isCustomFormatted;
      }

      measure.qDef.qDef = expression;
      measure.qDef.cId = generateId();
      measure.boxElement = boxElement;

      const customLabel = !boxProps.calculations.auto && elements && elements[boxElement] && elements[boxElement].name;
      measure.qDef.qLabel = translator.get(boxplotUtils.BOXELEMENTS[boxElement].translationKey);

      const customLabelFn = function (customLabel) {
        let label;

        if (customLabel) {
          label = `='${customLabel}'`;
        } else {
          const defaultNameTemplate = boxplotUtils.getDefaultNameTemplate(boxElement, boxProps, translator);

          if (defaultNameTemplate.type === 'expression') {
            label = `=${bpExprGen.replaceDefaultExpression(
              defaultNameTemplate.name,
              expressions[numDims],
              expressions[0],
              outerDimExpr
            )}`;
          } else {
            label = `='${defaultNameTemplate.name}'`;
          }
        }

        return label;
      };

      measure.qAttributeExpressions = [
        createAttributeExpression(
          customLabel && customLabel.qStringExpression
            ? customLabel.qStringExpression.qExpr
            : customLabelFn(customLabel),
          attExpUtil.IDMAP.TOOLTIP
        ),
      ];

      delete measure.qLibraryId;

      boxCube.qMeasures.push(measure);
    });

    boxCube.qMeasures[0].qAttributeExpressions = qAttributeExpressions.concat(
      boxCube.qMeasures[0].qAttributeExpressions
    );

    if (hasTwoDimensions) {
      boxplotSorter.applySorting(props, layout, translator);
    }

    if (!boxProps.elements || !boxProps.elements.outliers || !boxProps.elements.outliers.include) {
      delete props.qUndoExclude.outliers;
      return;
    }

    props.qUndoExclude.outliers = props.qUndoExclude.outliers || { qHyperCubeDef: {} };
    const outliersCube = props.qUndoExclude.outliers.qHyperCubeDef;

    // Reset
    outliersCube.qMode = 'K';
    outliersCube.qDimensions = [];
    outliersCube.qMeasures = [];
    outliersCube.qCalcCond = cube.qCalcCond;
    outliersCube.qCalcCondition = cube.qCalcCondition;

    // Now that all elements has been calculated, add the outlier measure as the first measure (because dimension limits only works on the first measure)
    const firstWhisker = boxCube.qMeasures[0].qDef.qDef.replace(/^=/, '');
    const lastWhisker = boxCube.qMeasures[4].qDef.qDef.replace(/^=/, '');
    const firstInnerRow = bpExprGen.replaceDefaultExpression(
      FIRSTINNERROW,
      expressions[numDims],
      expressions[0],
      outerDimExpr
    );
    if (hasTwoDimensions) {
      expression = bpExprGen.replaceDoubleCurlyReferences(
        bpExprGen.replaceDefaultExpression(OUTLIERFILTER2DIMS, expressions[numDims], expressions[0], outerDimExpr),
        {
          FirstWhisker: firstWhisker, // Exclude leading equal sign
          LastWhisker: lastWhisker,
          FirstInnerRow: firstInnerRow,
        }
      );
    } else {
      expression = bpExprGen.replaceDoubleCurlyReferences(
        bpExprGen.replaceDefaultExpression(OUTLIERFILTER1DIM, expressions[numDims], expressions[0], outerDimExpr),
        {
          FirstWhisker: firstWhisker, // Exclude leading equal sign
          LastWhisker: lastWhisker,
        }
      );
    }

    const outliersMeasureDef = bpExprGen.replaceDoubleCurlyReferences(
      bpExprGen.replaceDefaultExpression(OUTLIERMEASURE, expressions[numDims], expressions[0], outerDimExpr),
      {
        FirstWhisker: firstWhisker,
        LastWhisker: lastWhisker,
      }
    );
    const outliersSortingDef = bpExprGen.replaceDoubleCurlyReferences(
      bpExprGen.replaceDefaultExpression(OUTLIERSORTING, expressions[numDims], expressions[0], outerDimExpr),
      {
        FirstWhisker: firstWhisker,
        LastWhisker: lastWhisker,
      }
    );
    const outliersSortingExp = bpExprGen.getOutliersStatement(expressions[0], outliersSortingDef, outerDimExpr);

    measure = extend(true, {}, innerMeasure);
    if (NumberFormatUtil.isUsingMasterNumberFormat(measure.qDef)) {
      measure.qDef.qNumFormat = formats[0]?.qNumFormat;
      measure.qDef.isCustomFormatted = formats[0]?.isCustomFormatted;
    }
    measure.qDef.qDef = bpExprGen.getOutliersStatement(expressions[0], outliersMeasureDef, outerDimExpr);
    delete measure.qLibraryId;
    outliersCube.qMeasures.push(measure);
    outliersCube.qDimensions.push(innerDim);

    // Add the limit dimension (combination of first and second), with an if-statement to filter out outliers
    limitDim = extend(true, {}, outerDim ? cube.qDimensions[1] : cube.qDimensions[0]);
    limitDim.qNullSuppression = true;
    limitDim.qDef.cId = generateId();
    limitDim.qDef.qFieldDefs = [bpExprGen.getOutliersStatement(expressions[0], expression, outerDimExpr)]; // TODO: What about drill-downs?
    limitDim.qDef.qFieldLabels = [''];
    if (boxProps.elements.outliers.sortOutliers) {
      limitDim.qDef.qSortCriterias[0].qSortByExpression = 1;
      limitDim.qDef.qSortCriterias[0].qExpression.qv = outliersSortingExp;
    }
    delete limitDim.qLibraryId;
    outliersCube.qDimensions.splice(0, 0, limitDim);
    outliersCube.qAlwaysFullyExpanded = true;

    if (outerDim) {
      outliersCube.qDimensions.splice(1, 0, outerDim);
      outliersCube.qInterColumnSortOrder = [1, 0, 3, 2]; // Sort the inner dimension by the distance from the outlier to the nearest whisker
    } else {
      outliersCube.qInterColumnSortOrder = [0, 1, 2]; // Sort the inner dimension by the distance from the outlier to the nearest whisker
    }
  });
}

export default {
  generateHyperCubes,
};
