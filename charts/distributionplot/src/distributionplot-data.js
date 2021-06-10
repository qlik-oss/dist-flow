function fixInterColumnSortOrder(data) {
  if (data.qHyperCubeDef.qInterColumnSortOrder.length === 2) {
    // makes sure we always sort by the outer dimension (second)
    data.qHyperCubeDef.qInterColumnSortOrder = [1, 0];
  } else if (data.qHyperCubeDef.qInterColumnSortOrder.length === 3) {
    data.qHyperCubeDef.qInterColumnSortOrder = [1, 2, 0];
  }
}

function setColorVars(data) {
  const dims = data.qHyperCubeDef.qDimensions;
  if (dims.length > 1 && data.color) {
    data.color.point.persistent = true;
  }
}

export default function (env) {
  const { translator } = env;

  const dimensions = {
    min: 1,
    max: 2,
    description(properties, index) {
      let translationProperty;
      if (index === 0) {
        translationProperty = 'Visualizations.Descriptions.Point';
      } else {
        translationProperty = properties.orientation === 'horizontal' ? 'properties.yAxis' : 'properties.xAxis';
      }
      return translator.get(translationProperty);
    },
    added(dimension, data) {
      fixInterColumnSortOrder(data);
      setColorVars(data);
    },
    moved(dimension, data) {
      fixInterColumnSortOrder(data);
      setColorVars(data);
    },
    removed(dimension, data) {
      fixInterColumnSortOrder(data);
      setColorVars(data);
    },
  };

  const measures = {
    min: 1,
    max: 1,
    description(properties) {
      const translationProperty = properties.orientation === 'horizontal' ? 'properties.xAxis' : 'properties.yAxis';
      return translator.get(translationProperty);
    },
  };

  return {
    targets: [
      {
        path: '/qHyperCubeDef',
        dimensions,
        measures,
      },
    ],
  };
}
