#! /usr/bin/env node

const cp = require('child_process');

let server;

function exit(a) {
  if (server) {
    server.send('CLOSE');
  }

  if (a) {
    console.error(String(a));
    process.exit(1);
  } else {
    process.exit();
  }
}

function exec(cmd, stdio = 'inherit') {
  try {
    cp.execSync(cmd, {
      stdio,
    });
    exit();
  } catch (e) {
    exit(e);
  }
}

server = cp.fork('./scripts/integration-server.js');
server.on('message', async (message) => {
  if (message === 'READY') {
    exec('pnpm run test:rendering');
  }
});

server.on('exit', (code) => {
  process.exit(code);
});
