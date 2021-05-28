import HyperCubeDefGenerator from '@qlik/common/picasso/hypercube-def-generator/hypercube-def-generator';
import ExpressionGenerator from '@qlik/common/picasso/expression-generator/expression-generator';
// import util from '../../../../js/lib/util';
// import translator from '../../../../js/lib/translator';
import histogramMappings from './histogram-mappings';
import histogramUtils from '../histogram-utils';

/**
 * Implementation details
 */

function generateHyperCubes(layout, properties, app) {
  const mappingValues = histogramMappings.getMappingValues(layout);
  const mappings = histogramMappings.getMappings(mappingValues);

  const hyperCubeTemplate = {
    dimensions: ['Class(aggr({{Dim[0]}},{{Dim[0]}}){{BinSize}}{{Label}}{{Offset}})'],
    measures: ['Count({{Distinct}}{{Dim[0]}})'],
  };

  // Sturges' formula - https://en.wikipedia.org/wiki/Histogram#Number_of_bins_and_width
  const binCountTemplate = '=Ceil(Log10(Count({{Dim[0]}})) / Log10(2)) + 1';

  return Promise.all({
    expressions: HyperCubeDefGenerator.getAllHyperCubeExpressions(properties.qHyperCubeDef, layout.qHyperCube, app),
    boxCubeDef: HyperCubeDefGenerator.generateHyperCubeDef(
      hyperCubeTemplate,
      properties.qHyperCubeDef,
      layout.qHyperCube,
      app,
      mappings
    ),
  }).then((args) => {
    const expressions = args.expressions;
    const boxCubeDef = args.boxCubeDef;
    let binCountExpr;

    if (histogramUtils.isAutoBin(layout)) {
      binCountExpr = {
        qValueExpression: {
          qExpr: ExpressionGenerator.generateExpression(binCountTemplate, {
            'Dim[0]': { value: expressions.dimensions[0], wrap: true },
          }),
        },
      };
    } else if (histogramUtils.getBinMode(layout) === 'maxCount' && histogramUtils.isEmpty(properties.bins.binCount)) {
      // When the user have not provided any binCount we use the derived value which will be the output of the auto algorithm in most cases
      binCountExpr = histogramUtils.getDerivedBinCount(layout);
    } else {
      binCountExpr = properties.bins.binCount;
    }

    // Dimension should be sorted numeric ascending
    util.setValue(boxCubeDef, 'qDimensions.0.qDef.qSortCriterias', [{ qSortByNumeric: 1 }]);

    // Store the data labels, used when object is flipped to table
    util.setValue(boxCubeDef, 'qDimensions.0.qDef.qFieldLabels', [layout.qHyperCube.qDimensionInfo[0].qFallbackTitle]);
    util.setValue(
      boxCubeDef,
      'qMeasures.0.qDef.qLabel',
      layout.measureAxis.label || translator.get('Visualization.Histogram.MeasureAxisLabel')
    );

    // Store the generated hyperCube on properties
    util.setValue(properties, 'qUndoExclude.box.qHyperCubeDef', boxCubeDef);

    // Store the binSize (which in auto mode will be dynamically calculated)
    util.setValue(properties, 'qUndoExclude.bins.binSize', mappingValues.binSize);
    util.setValue(properties, 'qUndoExclude.bins.offset', mappingValues.binOffset);
    util.setValue(properties, 'qUndoExclude.bins.binCount', binCountExpr);
  });
}

const cubesGenerator = {
  generateHyperCubes,
};

export default cubesGenerator;
