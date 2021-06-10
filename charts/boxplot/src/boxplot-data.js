export default function data(env) {
  const { translator } = env;

  const dimensions = {
    min: 1,
    max: 2,
    description(properties, index) {
      let translationProperty;
      if (index === 0) {
        translationProperty = 'Visualizations.Descriptions.Box';
      } else {
        translationProperty = properties.orientation === 'horizontal' ? 'properties.yAxis' : 'properties.xAxis';
      }
      return translator.get(translationProperty);
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
        path: '/boxplotDef/qHyperCubeDef',
        dimensions,
        measures,
      },
    ],
  };
}
