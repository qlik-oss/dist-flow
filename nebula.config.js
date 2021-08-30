const path = require('path');

const targetPkg = require(path.resolve(process.cwd(), 'package.json'));

const replacementStrings = {
  'process.env.PACKAGE_VERSION': JSON.stringify(targetPkg.version),
};

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const sourcemap = mode !== 'production';

module.exports = {
  build: {
    core: 'core',
    mode,
    replacementStrings,
    sourcemap,
  },
};
