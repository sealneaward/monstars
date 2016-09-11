'use strict';

const chai = require('chai');
const assert = chai.assert;
const supertest = require('supertest');

const server = require('../server/server');
const config = require('../../config');
const log = require('bunyan').createLogger(config.log);

describe('Server Tests', () => {
    let app, api;

    before(() => {
        api = supertest(config.web.url);

        server.createServer(config,log,(createdServer) => {
            log.info('server successfully created');
            app = createdServer;
        });
    });

    it('Test response of default page', (done) => {
        api.get('/')
            .set('Accept', 'application/json')
            .expect(200,done);
    });
});