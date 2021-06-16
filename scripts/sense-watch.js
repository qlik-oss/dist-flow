const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const build = require('@nebula.js/cli-build');
const sense = require('@nebula.js/cli-sense');

function getExtensionsFolder(extName) {
  const cwd = process.cwd();
  let qdirpath;
  if (process.env.EXT_DIR) {
    qdirpath = [cwd, process.env.EXT_DIR, extName];
  } else {
    qdirpath = [os.homedir(), 'Qlik', 'Sense', 'Extensions', extName];
    if (os.platform() === 'win32') {
      qdirpath.splice(1, 0, 'Documents');
    }
  }
  return path.resolve(...qdirpath);
}

async function run() {
  const cwd = process.cwd();
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const supernovaPkg = require(path.resolve(cwd, 'package.json'));
  const extName = supernovaPkg.name.split('/').reverse()[0];
  const extensionsFolder = getExtensionsFolder(extName);
  const extFile = `${extName}.qext`;
  const jsFile = `${extName}.js`;

  await sense({
    partial: true,
  });

  fs.copySync(path.resolve(cwd, extFile), path.resolve(extensionsFolder, extFile));

  const watcher = await build({
    watch: true,
    core: false,
  });

  fs.copySync(path.resolve(cwd, 'dist', jsFile), path.resolve(extensionsFolder, jsFile));

  watcher.on('event', (event) => {
    if (event.code === 'BUNDLE_END') {
      fs.copySync(path.resolve(cwd, 'dist', jsFile), path.resolve(extensionsFolder, jsFile));
    }
  });
}

run();
