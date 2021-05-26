import extend from 'extend';
import ExpressionGenerator from '../expression-generator/expression-generator';

const HyperCubeGenerator = {
  generateHyperCubeDef,
  getAllHyperCubeExpressions,
};

// builds up a hyper cube using a hyper cube def and the hyper cube result, needs the app as well
// also supports additional mappings that allows generation of more advanced expressions
function generateHyperCubeDef(template, hyperCubeDef, hyperCube, app, mappings) {
  // hyper cube knows about {{Dim[n]}} {{Mea[n]}} mappings.
  return getKnownMappings(template.dimensions.concat(template.measures), hyperCubeDef, hyperCube, app).then(
    (knownMappings) => {
      const allMappings = extend({}, knownMappings, mappings);

      const generatedHyperCubeDef = extend(true, {}, hyperCubeDef);
      // clean the dimensions and measures
      generatedHyperCubeDef.qDimensions = [];
      generatedHyperCubeDef.qMeasures = [];

      template.dimensions.forEach((dimensionTemplate) => {
        generatedHyperCubeDef.qDimensions.push({
          qDef: {
            qFieldDefs: [`=${ExpressionGenerator.generateExpression(dimensionTemplate, allMappings)}`],
          },
        });
      });

      template.measures.forEach((measureTemplate) => {
        generatedHyperCubeDef.qMeasures.push({
          qDef: {
            qDef: ExpressionGenerator.generateExpression(measureTemplate, allMappings),
          },
        });
      });

      return generatedHyperCubeDef;
    }
  );
}

function getAllHyperCubeExpressions(hyperCubeDef, hyperCube, app) {
  const dimensions = hyperCubeDef.qDimensions.map((dimension, index) =>
    getExpressionFromDimension(dimension, app, index, hyperCube)
  );
  const measures = hyperCubeDef.qMeasures.map((measure) => getExpressionFromMeasure(measure, app));
  return Promise.all({
    dimensions: Promise.all(dimensions),
    measures: Promise.all(measures),
  });
}

function getExpressionFromDimension(dimension, app, index, hyperCube) {
  if (dimension.qLibraryId) {
    return getExpressionFromLibraryItem(dimension.qLibraryId, 'dimension', app, index, hyperCube);
  }
  const drillIndex = hyperCube.qDimensionInfo[index].qGroupPos;
  return Promise.resolve(dimension.qDef.qFieldDefs[drillIndex]);
}

function getExpressionFromMeasure(measure, app) {
  if (measure.qLibraryId) {
    return getExpressionFromLibraryItem(measure.qLibraryId, 'measure', app);
  }
  return Promise.resolve(measure.qDef.qDef);
}

// Internal functions

function getExpressionFromLibraryItem(id, type, app, index, hyperCube) {
  if (!app) {
    console.warn('No app provided, returning library id');
    return id;
  }

  const getFn = type === 'dimension' ? 'getDimension' : 'getMeasure';

  return app[getFn](id).then((item) =>
    item.getProperties().then((props) => {
      if (type === 'dimension') {
        return props.qDim.qFieldDefs[hyperCube.qDimensionInfo[index].qGroupPos];
      }
      return props.qMeasure.qDef;
    })
  );
}

// identifies {{Dim[x]}} {{Mea[x]}} mappings and returns the distinct instances of them
function getKnownMappings(mappings, hyperCubeDef, hyperCube, app) {
  const knownMappings = {};
  let dimensionIndices;
  let measureIndices;
  const dfds = [];

  mappings.forEach((mapping) => {
    dimensionIndices = spliceIdentifiedMatches(mapping.match(getMappingRegExp('Dim')));
    dimensionIndices.forEach((index) => {
      dfds.push(
        getExpressionFromDimension(hyperCubeDef.qDimensions[index], app, index, hyperCube).then((expression) => {
          knownMappings[`Dim[${index}]`] = { value: expression, wrap: true };
        })
      );
    });

    measureIndices = spliceIdentifiedMatches(mapping.match(getMappingRegExp('Mea')));
    measureIndices.forEach((index) => {
      dfds.push(
        getExpressionFromMeasure(hyperCubeDef.qMeasures[index], app).then((expression) => {
          knownMappings[`Mea[${index}]`] = { value: expression };
        })
      );
    });
  });

  let returnPromise;
  if (dfds.length) {
    returnPromise = Promise.all(dfds).then(() => Promise.resolve(knownMappings));
  } else {
    returnPromise = Promise.resolve(knownMappings);
  }
  return returnPromise;
}

function getMappingRegExp(string) {
  return new RegExp(`\\{\\{${string}\\[\\d\\]\\}\\}`, 'g');
}

function spliceIdentifiedMatches(matches) {
  if (!matches) {
    return [];
  }
  return matches.map((match) => match.substr(6, 1));
}

export default HyperCubeGenerator;
