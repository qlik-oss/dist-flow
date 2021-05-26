global.define = (m) => m;

module.exports = {
  mocks: [
    ['**/hammer.js', '{}'],
    ['qvangular', '{ getService: () => {} }'],
    ['translator', '{}'],
    [
      'objects.extension/object-conversion',
      `{
      colorChart: {
        importProperties() {},
      },
    }`,
    ],
    [
      '**/dist/conversion.js',
      `{
      axisChart: {
        importProperties() {},
        exportProperties() {},
      },
    }`,
    ],
    [
      'client.utils/default-property-logic',
      `{
        getLogicFor() {
          return {
            color: {
              colorMode: {
                options: [],
              },
              persistentColors: {
                show: true,
              }
            },
            legend: {
              show: false,
              showTitle: {
                show: false,
              },
              dock: {
                show: false,
              },
            },
          };
        },
      }`,
    ],
  ],
};
