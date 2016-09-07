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
        request(url,(err,response) => {
            if (err) {
                log.error('Could not get data', err);
                reject(err);
                return;
            } else {
                log.info('Got data');
                response = JSON.parse(response.body).resultSets[0];
                const headers = response.headers;
                const data = response.rowSet;

                //set headers as keys
                data.forEach((playerData) => {
                    const playerObj = {};
                    headers.forEach((header, index) => {
                        playerObj[header] = playerData[index];
                    });
                    insert(playerObj).then(() => {
                        log.info('Inserted player '+playerObj.PLAYER_NAME+' successfully');
                    });
                });
                resolve();
                return;
            }
        });
    });
};

/*
* Create model from player object and insert/update into db
* */
const insert = (data) => {
    return new Promise ((resolve,reject) => {
        const player = new Player(mongoose);
        player.findOneAndUpdate({PLAYER_ID:data.PLAYER_ID},data,{upsert:true}, (err) => {
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