const path = require('path');
const FileSize = require('./FileSize');

const cwd = process.cwd();
const base = path.basename(cwd);
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode,
  entry: {
    [base]: path.resolve(cwd, 'src', 'index'),
  },
  stats: 'errors-only',
  devtool: mode === 'production' ? false : 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$|\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(cwd, 'src'), path.resolve(__dirname, '..')],
        exclude: /mode_modules/,
        sideEffects: false,
        use: {
          loader: 'babel-loader',
          options: {
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
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    mainFields: ['kjellkod', 'module', 'main'],
  },
  plugins: [new FileSize()],
};
