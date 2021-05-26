export default function data(env) {
  const { translator } = env;
  return {
    targets: [
      {
        path: '/qHyperCubeDef',
        dimensions: {
          min: 0,
          max: 0,
        },
        measures: {
          min: 1,
          max: 50,
          description: () => translator.get('Visualizations.Descriptions.Bars'),
        },
      },
    ],
  };
}
