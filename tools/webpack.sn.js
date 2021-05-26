/* eslint import/no-dynamic-require: 0, class-methods-use-this: 0 */

const path = require('path');
const os = require('os');
const crypto = require('crypto');
const fs = require('fs-extra');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const sourceBase = process.cwd();
const sourceBaseName = path.basename(sourceBase);

const privateTargetDist = path.resolve(sourceBase, 'dist');
const targetPkg = require(path.resolve(sourceBase, 'package.json'));
const targetBaseName = /^sn-/.test(sourceBaseName) ? sourceBaseName : `sn-${sourceBaseName}`;

const qextTargetDir = path.resolve(sourceBase, 'qext');
const qextFileName = path.resolve(sourceBase, `${targetBaseName}.qext`);
const qextFileNameJs = qextFileName.replace(/\.qext$/, '.js');

const versionHash = crypto
  .createHash('md5')
  .update(`${targetPkg.name}@${targetPkg.version}`) // TODO - consider using the commit sha since all charts from the same commit could have the same style
  .digest('hex')
  .slice(0, 4);

// cleanup old build
fs.removeSync(privateTargetDist);

fs.removeSync(qextTargetDir);
fs.removeSync(qextFileName);
fs.removeSync(qextFileNameJs);

const moduleName = targetPkg.name.split('/').reverse()[0];

const cfg = (format = 'umd') => {
  const modularBundle = format === 'amd';
  return {
    ...merge(common, {
      devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
      output: {
        path: privateTargetDist,
        filename: modularBundle ? `[name].${format}.js` : '[name].js',
        library: format !== 'amd' ? moduleName : '', // anonymous module for amd
        libraryTarget: format,
        libraryExport: 'default',
      },
      plugins: [
        new webpack.BannerPlugin({
          banner: `${targetPkg.name} v${targetPkg.version}
Copyright (c) ${new Date().getFullYear()} QlikTech International AB`,
        }),
        new webpack.DefinePlugin({
          'process.env.VERSION_HASH': JSON.stringify(versionHash),
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.PACKAGE_VERSION': JSON.stringify(targetPkg.version),
        }),
      ],
    }),
    entry: {
      [targetBaseName]: path.resolve(sourceBase, 'src', 'index'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      mainFields: ['kjellkod', 'module', 'main'],
    },
    externals: modularBundle
      ? [
          // known peers available in Sense
          'react',
          'react-dom',
          'hammerjs',
          'picasso.js',
          'picasso-plugin-hammer',
          'picasso-plugin-q',
          '@material-ui/core',
          '@material-ui/styles',
          '@nebula.js/stardust',
        ]
      : {
          // always external
          '@nebula.js/stardust': {
            amd: '@nebula.js/stardust',
            commonjs2: '@nebula.js/stardust',
            commonjs: '@nebula.js/stardust',
            root: 'stardust',
          },
        },
  };
};

const configs = [cfg()];

const args = process.argv.slice(2);
const hasExt = args.indexOf('--ext') !== -1;
const isNative = args.indexOf('--native') !== -1;

if (isNative) {
  configs.push(cfg('amd'));
}

// ======= config for supernova as external extension =============
if (hasExt) {
  const createQextFiles = () => {
    const qext = targetPkg.qext || {};
    const contents = {
      author: targetPkg.author,
      description: `${targetPkg.description}`,
      icon: qext.icon || 'extension',
      name: qext.name || targetBaseName,
      preview: qext.preview,
      supernova: true,
      type: 'visualization',
      version: targetPkg.version,
    };

    let qextjs = fs.readFileSync(path.resolve(__dirname, 'qext.js'), { encoding: 'utf8' });
    qextjs = qextjs.replace('{{DIST}}', `./dist/${targetBaseName}`);

    fs.writeFileSync(qextFileName, JSON.stringify(contents, null, 2));
    fs.writeFileSync(qextFileNameJs, qextjs);
  };

  createQextFiles();

  const copyFiles = (destination, files) => {
    files.forEach((f) => {
      fs.copySync(path.resolve(process.cwd(), f), path.resolve(destination, f));
    });
  };

  let destination = '';
  let qdirpath = '';

  if (process.env.EXT_DIR) {
    qdirpath = [__dirname, '..', process.env.EXT_DIR, targetBaseName];
  } else {
    qdirpath = [os.homedir(), 'Qlik', 'Sense', 'Extensions', targetBaseName];
    if (os.platform() === 'win32') {
      qdirpath.splice(1, 0, 'Documents');
    }
  }
  destination = path.resolve(...qdirpath);
  fs.removeSync(destination);
  class Copier {
    constructor(files) {
      this.files = files;
    }

    apply(compiler) {
      compiler.hooks.done.tap('Copier', () => {
        copyFiles(destination, this.files);
      });
    }
  }

  configs[0].plugins.push(new Copier(targetPkg.files.filter((f) => f === 'dist')));
  configs[configs.length - 1].plugins.push(new Copier(targetPkg.files.filter((f) => f !== 'dist')));
}

module.exports = configs;
