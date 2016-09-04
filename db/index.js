'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('../config.js');
const mongodb = require('./lib/getData');
const log = require('bunyan').createLogger(config.log);
mongoose.Promise = Promise;

const url = config.url;

mongodb.getData(url, log, config).then(() => {
    log.info('Succesfully inserted data into mongo collection');
}).catch((err) => {
    log.error('Error inserting data into collection: ', err);
});