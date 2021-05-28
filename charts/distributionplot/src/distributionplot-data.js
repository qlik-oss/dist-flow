import translator from '../../../js/lib/translator';

function fixInterColumnSortOrder(dimension, data) {
  if (data.qHyperCubeDef.qInterColumnSortOrder.length === 2) {
    // makes sure we always sort by the outer dimension (second)
    data.qHyperCubeDef.qInterColumnSortOrder = [1, 0];
  } else if (data.qHyperCubeDef.qInterColumnSortOrder.length === 3) {
    data.qHyperCubeDef.qInterColumnSortOrder = [1, 2, 0];
  }
}

function setColorVars(data, handler) {
  const dims = handler.getDimensions();
  if (dims.length > 1 && data.color) {
    data.color.point.persistent = true;
  }
}

const data = {
  measures: {
    min: 1,
    max: 1,
    description(properties) {
      const translationProperty = properties.orientation === 'horizontal' ? 'properties.xAxis' : 'properties.yAxis';
      return translator.get(translationProperty);
    },
    add() /* measure, data, handler */ {},
    move() /* measure, data, handler */ {},
    remove() /* measure, data, handler */ {},
  },
  dimensions: {
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
    add(dimension, data, handler) {
      fixInterColumnSortOrder(dimension, data);
      setColorVars(data, handler);
    },
    move(dimension, data, handler) {
      fixInterColumnSortOrder(dimension, data);
      setColorVars(data, handler);
    },
    remove(dimension, data, handler) {
      fixInterColumnSortOrder(dimension, data);
      setColorVars(data, handler);
    },
  },
};

export default data;
