const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common');

const cwd = process.cwd();

const base = path.basename(cwd);

module.exports = merge(common, {
  output: {
    path: path.resolve(cwd, 'dist'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    devtoolNamespace: base,
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
  externals: [
    'react',
    'react-dom',
    'hammerjs',
    'picasso.js',
    'picasso-plugin-hammer',
    'picasso-plugin-q',
    '@material-ui/core',
    '@material-ui/styles',
  ],
});
