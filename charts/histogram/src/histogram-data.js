export default function data(env) {
  const { translator } = env;

  const dimensions = {
    min: 1,
    max: 1,
    description() {
      return translator.get('Visualization.Histogram.Binning');
    },
  };
  const measures = {
    min: 0,
    max: 0,
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
