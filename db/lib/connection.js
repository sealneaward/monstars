const mongoose = require('mongoose');

const connect  = (config) => {
    return new Promise ((resolve,reject) => {
        const log = require('bunyan').createLogger(config.log);

        mongoose.connect(config.mongo.uri,(err) => {
            if(err){
                log.error('Could not connect to local database');
                reject();
                return;
            }
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
};