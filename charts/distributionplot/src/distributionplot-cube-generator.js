import extend from 'extend';
import { getValue } from 'qlik-chart-modules';
import AdvancedColorer from '@qlik/common/picasso/advanced-colorer';
import HyperCubeDefGenerator from '@qlik/common/picasso/hypercube-def-generator/hypercube-def-generator';
import attExpUtil from '@qlik/common/extra/attribute-expression-util';
// import util from '../../../js/lib/util';

import distplotUtils from './distributionplot-utils';
import distplotSorter from './sorting/distributionplot-sorter';
import elementsRetriever from './sorting/distributionplot-sorting-elements-retriever';

function generateHyperCube(layout, properties, app, translator) {
  if (!properties.qUndoExclude) {
    properties.qUndoExclude = {};
  }

  properties.qUndoExclude.qHyperCubeDef = extend(true, {}, properties.qHyperCubeDef);
  properties.qUndoExclude.qHyperCubeDef.qDimensions.reverse();

  AdvancedColorer.updateHypercubeAttributes(properties, 'qUndoExclude.qHyperCubeDef.', properties.color.point);

  let qAttributeExpressions = [];
  const numDims = properties.qUndoExclude.qHyperCubeDef.qDimensions.length;
  const colorByExpression =
    properties.color.point && !properties.color.point.auto && properties.color.point.mode === 'byExpression';
  if (numDims > 0 && colorByExpression) {
    const attrExps = attExpUtil.create(attExpUtil.IDMAP.COLOR_BY_EXPRESSION, {
      qExpression: getValue(properties, 'color.point.expression.qValueExpression.qExpr'),
    });
    qAttributeExpressions = [attrExps];
  }
  properties.qUndoExclude.qHyperCubeDef.qMeasures[0].qAttributeExpressions = qAttributeExpressions;

  if (distplotUtils.hasMultipleDimensions(properties)) {
    return HyperCubeDefGenerator.getAllHyperCubeExpressions(properties.qHyperCubeDef, layout.qHyperCube, app).then(
      (expressions) => {
        distplotSorter.applySorting(properties, layout, app, expressions, translator);

        // Box min max values
        const firstDimString = expressions.dimensions[0];

        const secondDimString = expressions.dimensions[1];
        const innerMeasureString = expressions.measures[0];
        const expMax = elementsRetriever.getFractileExpression(1, firstDimString, secondDimString, innerMeasureString);
        const expMin = elementsRetriever.getFractileExpression(0, firstDimString, secondDimString, innerMeasureString);
        const outerDimension = properties.qUndoExclude.qHyperCubeDef.qDimensions[0];
        outerDimension.qAttributeExpressions = [
          { qExpression: expMin, id: 'minBoxValue' },
          { qExpression: expMax, id: 'maxBoxValue' },
        ];
      }
    );
  }
  properties.qUndoExclude.qHyperCubeDef.qInterColumnSortOrder = [1, 0];

  return Promise.resolve();
}

export default {
  generateHyperCube,
};
