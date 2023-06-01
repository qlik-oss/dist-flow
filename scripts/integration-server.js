#! /usr/bin/env node

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../testplaywright/utils/webpack.config.js');

process.on('message', async (message) => {
  if (message === 'CLOSE') {
    console.log('Closing server...');
    process.exit();
  }
});

WebpackDevServer.addDevServerEntrypoints(config, config.devServer);

console.info('Starting the dev web server... \n');

const compiler = webpack(config);

compiler.hooks.emit.tap('foo', () => {
  process.send && process.send('READY'); // eslint-disable-line
});

const server = new WebpackDevServer(compiler, config.devServer);

server.listen(config.devServer.port, '0.0.0.0', (err) => {
  if (err) {
    console.error(err);
  }
  console.info('WebpackDevServer listening at localhost:', config.devServer.port);
});
