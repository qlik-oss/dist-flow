export default function data(env) {
  const { translator } = env;

  const dimensions = {
    min: 1,
    max: 1,
    description() {
      return translator.get('Visualization.Histogram.Binning');
    },
  };
  return {
    targets: [
      {
        path: '/qHyperCubeDef',
        dimensions,
      },
    ],
  };
}
