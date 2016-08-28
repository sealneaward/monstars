'use strict';

const bunyan = require('bunyan');

module.exports = require('rc')('monstars', {
    log: {
        name: 'monstars',
        serializers: {
            res: bunyan.stdSerializers.res,
            req: bunyan.stdSerializers.req,
            err: bunyan.stdSerializers.err
        },
        level: 'info'
    },
    mongo: {
        uri:'mongodb://localhost/'
    }
});