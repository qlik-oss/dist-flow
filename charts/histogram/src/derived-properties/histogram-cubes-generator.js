import { setValue } from 'qlik-chart-modules';
import HyperCubeDefGenerator from '@qlik/common/picasso/hypercube-def-generator/hypercube-def-generator';
import ExpressionGenerator from '@qlik/common/picasso/expression-generator/expression-generator';
// import translator from '../../../../js/lib/translator';
import histogramMappings from './histogram-mappings';
import histogramUtils from '../histogram-utils';

/**
 * Implementation details
 */

async function generateHyperCubes(layout, properties, app, translator) {
  const mappingValues = histogramMappings.getMappingValues(layout);
  const mappings = histogramMappings.getMappings(mappingValues);

  const hyperCubeTemplate = {
    dimensions: ['Class(aggr({{Dim[0]}},{{Dim[0]}}){{BinSize}}{{Label}}{{Offset}})'],
    measures: ['Count({{Distinct}}{{Dim[0]}})'],
  };

  // Sturges' formula - https://en.wikipedia.org/wiki/Histogram#Number_of_bins_and_width
  const binCountTemplate = '=Ceil(Log10(Count({{Dim[0]}})) / Log10(2)) + 1';

  const expressionsPromise = HyperCubeDefGenerator.getAllHyperCubeExpressions(
    properties.qHyperCubeDef,
    layout.qHyperCube,
    app
  );
  const boxCubeDefPromise = HyperCubeDefGenerator.generateHyperCubeDef(
    hyperCubeTemplate,
    properties.qHyperCubeDef,
    layout.qHyperCube,
    app,
    mappings
  );

  const expressions = await expressionsPromise;
  const boxCubeDef = await boxCubeDefPromise;
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
  setValue(boxCubeDef, 'qDimensions.0.qDef.qSortCriterias', [{ qSortByNumeric: 1 }]);

  // Store the data labels, used when object is flipped to table
  setValue(boxCubeDef, 'qDimensions.0.qDef.qFieldLabels', [layout.qHyperCube.qDimensionInfo[0].qFallbackTitle]);
  setValue(
    boxCubeDef,
    'qMeasures.0.qDef.qLabel',
    layout.measureAxis.label || translator.get('Visualization.Histogram.MeasureAxisLabel')
  );

  // Store the generated hyperCube on properties
  setValue(properties, 'qUndoExclude.box.qHyperCubeDef', boxCubeDef);

  // Store the binSize (which in auto mode will be dynamically calculated)
  setValue(properties, 'qUndoExclude.bins.binSize', mappingValues.binSize);
  setValue(properties, 'qUndoExclude.bins.offset', mappingValues.binOffset);
  setValue(properties, 'qUndoExclude.bins.binCount', binCountExpr);
}

const cubesGenerator = {
  generateHyperCubes,
};

export default cubesGenerator;
