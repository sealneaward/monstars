'use strict';

const chaiAsPromised = require('chai-as-promised');
const chai  = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');

const config = require('../../config');
const connection = require('../lib/connection');
const api = require('../lib/getData');
const log = require('bunyan').createLogger(config.log);

chai.use(chaiAsPromised);

/*
* TODO : complete API tests
* */
describe('NBA Statistics API tests', () => {
    before('establishes mongo connection', (done) => {
        connection.connect(config).then(() => {
            done();
        });
    });

    it('Gets data from api with valid url', () => {
        return api.getData(config.url, log, config);
    });

    it('Gets data from api with invalid url', (done) => {
        assert.isRejected(api.getData('notvalid.com', log, config)).then(() => {
            done();
        });
    });

    after('close mongo connection', () => {
       mongoose.connection.close();
    });
});