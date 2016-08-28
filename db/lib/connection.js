const mongoose = require('mongoose');
const config = require('../../config.js');
const log = require('bunyan').createLogger(config.log);

const connect  = () => {
    return new Promise ((resolve,reject) => {
        mongoose.connect(config.mongo.uri);
        mongoose.connection.on('error', () => {
            log.error('Could not connect to local database');
            reject();
            return;
        });
        mongoose.connection.once('connected', () => {
            log.info('Connection succesfull');
            resolve(mongoose);
            return;
        });
    });
};
module.exports = {
    connect
}