'use strict';

const request = require('request');
const Promise = require('bluebird');
const config = require('../../config');
const connection = require('./connection');
const Player = require('../models/player');
const mongoose = require('mongoose');

/*
* Get data from stats.nba.com
* */
const getData = (url,log) => {
    return new Promise ((resolve,reject) => {
        let data;

        request(url,(err,response) => {
            if (err) {
                log.error('Could not get data', err);
                reject(err);
                return;
            } else {
                log.info('Got data');
                response = JSON.parse(response.body).resultSets[0];
                const headers = response.headers;
                data = response.rowSet;

                //set headers as keys
                data = data.map((playerData) => {
                    const playerObj = {};
                    headers.forEach((header, index) => {
                        playerObj[header] = playerData[index];
                    });
                    return playerObj;
                });
                insert(data).then((err) => {
                    /* istanbul ignore if */
                    if(err){
                        log.info('Could not save players: ', err);
                        reject(err);
                    } else {
                        log.info('Successfully saved players');
                        resolve();
                    }
                });
            }
        });
    });
};

/*
* Create model from player object and insert/update into db
* */
const insert = (data) => {
    return new Promise ((resolve,reject) => {
        // delete db on each population to avoid overlap
        mongoose.connection.db.dropDatabase();

        const player = new Player(mongoose);
        player.create(data,(err) => {
            /* istanbul ignore if */
            if(err){
                reject(err);
            }
            else{
                resolve();
            }
        });
    });
};

module.exports = {
    getData
};