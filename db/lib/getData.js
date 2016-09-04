'use strict';

const request = require('request');
const Promise = require('bluebird');
const connection = require('./connection');
const Player = require('../models/player');

/*
* Get data from stats.nba.com
* */
const getData = (url,log, config) => {
    return new Promise ((resolve,reject) => {
        request(url,(err,response) => {
            if (err) {
                log.error('Could not get data', err);
                reject(err);
            } else {
                log.info('Got data');

                connection.connect(config).then((mongoose) =>{
                    response = JSON.parse(response.body).resultSets[0];
                    const headers = response.headers;
                    const data = response.rowSet;

                    //set headers as keys
                    data.forEach((playerData) => {
                        const playerObj = {};
                        headers.forEach((header, index) => {
                            playerObj[header] = playerData[index];
                        });
                        insert(mongoose,playerObj).then(() => {
                            log.info('Inserted player '+playerObj.PLAYER_NAME+' successfully');
                        });
                    });
                }).then(() => {
                    mongoose.connection.close();
                    resolve();
                });
            }
        });
    });
};

/*
* Create model from player object and insert/update into db
* */
const insert = (mongoose, data) => {
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