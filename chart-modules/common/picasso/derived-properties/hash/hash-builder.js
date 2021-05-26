import { getValue } from '@qlik/chart-modules';

const hashBuilder = {
  getDefaultHashDataForHyperCube,
};

export default hashBuilder;

/**
 * Implementation details
 */

function getDefaultHashDataForHyperCube(hyperCubeDef, hyperCube, app) {
  return getMeasureExpressions(hyperCubeDef, app).then((measureExpressions) => ({
    drillLevel: getDrillIndices(hyperCube),
    dimensionExpressions: getDimensionExpressions(hyperCube),
    measureExpressions,
  }));
}

function getMeasureExpressions(hyperCubeDef, app) {
  const dfds = [];

  if (!hyperCubeDef.qMeasures) {
    return Promise.resolve(dfds);
  }

  hyperCubeDef.qMeasures.forEach((measure) => {
    if (measure.qLibraryId) {
      dfds.push(getMeasureDataFromLibraryItem(measure.qLibraryId, app));
    } else {
      dfds.push(Promise.resolve());
    }
  });

  return Promise.all(dfds);
}

function getMeasureDataFromLibraryItem(libraryId, app) {
  return app.getMeasure(libraryId).then((item) => item.getProperties().then((props) => props.qMeasure.qDef));
}

function getDimensionExpressions(hyperCube) {
  return hyperCube.qDimensionInfo.map((dimensionInfo) => dimensionInfo.qGroupFieldDefs);
}

function getDrillIndices(hyperCube) {
  const dimensions = getDimensions(hyperCube);
  return dimensions.map((dim) => dim.qGroupPos);
}

function getDimensions(hyperCube) {
  return getValue(hyperCube, 'qDimensionInfo', []);
}
