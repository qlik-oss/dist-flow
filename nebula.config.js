const path = require('path');
const defaultTheme = require('@qlik-trial/sense-themes-default/dist/sense/theme.json');

// eslint-disable-next-line import/no-dynamic-require
const targetPkg = require(path.resolve(process.cwd(), 'package.json'));

const replacementStrings = {
  'process.env.PACKAGE_VERSION': JSON.stringify(targetPkg.version),
};

module.exports = {
  build: {
    replacementStrings,
  },
  serve: {
    themes: [{ id: 'sense', theme: defaultTheme }],
  },
};
