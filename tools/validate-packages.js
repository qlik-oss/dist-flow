#! /usr/bin/env node

/* eslint import/no-dynamic-require:0 */

const path = require('path');
const globby = require('globby');

const rootPkg = require('../package.json');
const validateNebula = require('./validate-nebula-package.js');
const validateQlik = require('./validate-qlik-package.js');

const { workspaces } = rootPkg;

const packs = globby
  .sync(workspaces, {
    onlyDirectories: true,
  })
  .map((dir) => {
    let pkg;
    try {
      pkg = require(path.resolve(dir, 'package.json')); // eslint-disable-line
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw e;
      }
    }
    return pkg ? { pkg, dir } : false;
  })
  .filter(Boolean)
  .sort((a, b) => {
    if (a.pkg.private && !b.pkg.private) {
      return 1;
    }
    if (b.pkg.private && !a.pkg.private) {
      return -1;
    }
    return b.pkg.name > a.pkg.name ? -1 : 1;
  });

let category = '';

packs.forEach(({ pkg, dir }) => {
  const c = pkg.private ? 'Private' : /^@qlik/.test(pkg.name) ? 'Internal' : 'Public'; // eslint-disable-line
  if (c !== category) {
    category = c;
    console.log(`\n  ${category} packages  \n`);
  }
  let validate = validateQlik;
  let badges = [];
  if (/^@nebula\.js/.test(pkg.name)) {
    validate = validateNebula;
    badges.push(pkg.scripts && /--native/.test(pkg.scripts.build) ? '\x1b[35m[S]\x1b[0m' : '   ');
    badges.push(pkg.qext ? '\x1b[34m[X]\x1b[0m' : '   '); // eslint-disable-line
  }
  // badges = badges.map(b => `\x1b[44m\x1b[37m${b}\x1b[0m`).join('');
  badges = badges.join('');
  try {
    validate(pkg, dir);
    console.log(`    \x1b[32m✔\x1b[0m ${badges} ${pkg.name}`);
  } catch (e) {
    console.log(`    \x1b[31mx ${badges} \x1b[31m${pkg.name} - ${e.message} \x1b[0m`);
    process.exitCode = 1;
  }
});
