'use strict';

const config = require('../config');
const log = require('bunyan').createLogger(config.log);

const server = require('./server/server');

server.createServer(config,log,() => {
   log.info('monstars started successfully');
});