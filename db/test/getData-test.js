'use strict';

const chaiAsPromised = require('chai-as-promised');
const chai  = require('chai');
const _ = require('lodash');
const assert = chai.assert;
chai.use(chaiAsPromised);

const config = require('../../config');
const api = require('../lib/getData');
const log = require('bunyan').createLogger(config.log);

/*
* TODO : complete API tests
* */
describe('NBA Statistics API tests', () => {
    it('Gets data from api with valid url', () => {
        return api.getData(config.url, log, config);
    });

    it('Gets data from api with invalid url', (done) => {
        assert.isRejected(api.getData(config.url, log, config)).then(() => {
            done();
        });
    });
});