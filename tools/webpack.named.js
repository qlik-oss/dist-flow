const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const cwd = process.cwd();

module.exports = merge(common, {
  output: {
    path: path.resolve(cwd, 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    globalObject: `(() => {
      if (typeof self !== 'undefined') {
          return self;
      } else if (typeof window !== 'undefined') {
          return window;
      } else if (typeof global !== 'undefined') {
          return global;
      } else {
          return Function('return this')();
      }
  })()`,
  },
});
