const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    poly: [require.resolve('core-js/features/promise'), require.resolve('core-js/features/object/assign')],
    app: path.resolve(__dirname, 'index'),
  },
  devServer: {
    contentBase: './',
    watchContentBase: true,
    stats: 'minimal',
    port: 8088,
    host: '0.0.0.0',
    before(app) {
      app.get('/data/:path', (req, res) => {
        const p = path.resolve(
          __dirname,
          '../__data__',
          /\.js$/.test(req.params.path) ? req.params.path : `${req.params.path}.js`
        );
        if (!fs.existsSync(p)) {
          res.sendStatus('404');
          return;
        }
        const f = require(p);
        res.json(f);
      });
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../..')],
        sideEffects: false,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    browsers: ['ie 11'],
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    mainFields: ['main'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Integration tests',
      template: path.resolve(__dirname, './index.html'),
      chunks: ['app'],
    }),
  ],
};
