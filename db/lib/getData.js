'use strict';

const request = require('request');
const Promise = require('bluebird');
const connection = require('./connection');
const Player = require('../models/player');

/*
* Get data from stats.nba.com
* */
const getData = (url,log) => {
    return new Promise ((resolve,reject) => {
        request(url,(err,response) => {
            if (err) {
                log.error('Could not get data', err);
                reject(err);
            } else {
                log.info('Got data');

                connection.connect().then((mongoose) =>{
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
                            log.info('Inserted player successfully');
                        });
                    });
                });
            }
        });
    });
};

const insert = (mongoose, data) => {
    return new Promise ((resolve,reject) => {
        const player = new Player(data);
        mongoose.Players.findOneAndUpdate({PLAYER_ID:player.PLAYER_ID},player,{upsert:true}, (err) => {
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
}