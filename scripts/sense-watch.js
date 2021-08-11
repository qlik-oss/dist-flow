const path = require('path');
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
  const supernovaPkg = require(path.resolve(cwd, 'package.json'));
  const extName = supernovaPkg.name.split('/').reverse()[0];
  const extensionsFolder = getExtensionsFolder(extName);

  const watcher = await build({
    watch: true,
    core: false,
    config: path.join(__dirname, '../nebula.config.js'),
  });

  const buildExt = () =>
    sense({
      partial: true,
      sourcemap: true,
      output: extensionsFolder,
    });

  buildExt();
  watcher.on('event', (event) => {
    if (event.code === 'BUNDLE_END') {
      buildExt();
    }
  });
}

run();
