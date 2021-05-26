#! /usr/bin/env node

const path = require('path');
const fs = require('fs');

const validate = require('./validate-nebula-package');

const p = path.resolve(process.cwd(), 'package.json');

const cleanedPkg = validate(require(p), process.cwd()); // eslint-disable-line

// remove CHANGELOG since it's a mess at the moment
const log = path.resolve(process.cwd(), 'CHANGELOG.md');
if (fs.existsSync(log)) {
  fs.unlinkSync(log);
}

fs.writeFileSync(p, cleanedPkg);
