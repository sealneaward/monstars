'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('../config.js');
const api = require('./lib/getData');
const connection = require('./lib/connection');
const log = require('bunyan').createLogger(config.log);
mongoose.Promise = Promise;

const url = config.url;
connection.connect(config).then(() =>{
    api.getData(url, log, config).then(() => {
        log.info('Succesfully inserted data into mongo collection');
        mongoose.connection.close();
    });
}).catch((err) => {
    log.error('Error inserting data into collection: ', err);
});