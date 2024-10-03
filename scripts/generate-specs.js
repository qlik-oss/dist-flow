#! /usr/bin/env node

const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const chartDir = path.resolve(__dirname, '../charts');
const dirs = fs.readdirSync(chartDir).filter((f) => fs.statSync(path.join(chartDir, f)).isDirectory());
const markdownTemplatePath = path.resolve(__dirname, '../docs/markdown-template.hbs');

function exec(cmd, stdio = 'inherit') {
  try {
    cp.execSync(cmd, {
      stdio,
    });
  } catch (err) {
    console.log(err.message);
    console.log('');
    throw err;
  }
}

dirs.forEach((dir) => {
  const propsConfPath = path.join(chartDir, dir, '/spec-configs/props.conf.js');
  const hasSpecConf = fs.existsSync(propsConfPath);

  if (hasSpecConf) {
    console.log(`Generating specification for ${dir}...`);

    let toMarkdownBin = path.resolve(__dirname, '../node_modules/.bin/jsdoc2md');

    if (process.platform === 'win32') {
      toMarkdownBin += '.cmd';
    }

    const scriptAppyBaseCmd = 'sy from-jsdoc -c';

    const scriptAppyCmd = `${scriptAppyBaseCmd} ${propsConfPath}`;

    console.log(scriptAppyCmd);

    exec(scriptAppyCmd);

    const {
      glob,
      output: { file },
    } = require(propsConfPath).fromJsdoc; // eslint-disable-line import/no-dynamic-require, global-require

    const toMarkdownCmd = `${toMarkdownBin} -t ${markdownTemplatePath} ${glob.join(' ')} > ${path.join(
      file,
      '../api.md'
    )}`;

    exec(toMarkdownCmd);
  }
});
