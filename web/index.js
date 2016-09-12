'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('../config.js');
const db = require('../db/lib/db');
const log = require('bunyan').createLogger(config.log);
mongoose.Promise = Promise;

const server = require('./server/server');
const connection = require('../db/lib/connection');

connection.connect(config).then(() =>{
   db.getPlayers().then((players) => {
      db.getTeams().then((teams) => {
         server.createServer(config,log, players, teams, () => {
            log.info('monstars started successfully');
         });
      });
   });
}).catch((err) => {
   log.info('Could not connect to db: ', err);
});
