#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');

const cwd = process.cwd();
const { version, main } = require(`${cwd}/package.json`); // eslint-disable-line import/no-dynamic-require
const extPath = main.split('.js').join('.qext');
const ext = JSON.parse(readFileSync(extPath, 'utf8'));
ext.version = version;
console.log(`Applying version ${version} to ${extPath}`); // eslint-disable-line no-console
writeFileSync(extPath, JSON.stringify(ext, null, 2), 'utf8');
