'use strict';

const request = require('request');
const Promise = require('bluebird');
const Player = require('../models/player');
const Team = require('../models/team');
const mongoose = require('mongoose');

/*
* Get data from stats.nba.com
* */
const getData = (log, config) => {
    return new Promise ((resolve,reject) => {
        // delete db on each population to avoid overlap
        mongoose.connection.db.dropDatabase();

        getTeams(log, config.urls.teams).then(() => {
            log.info('Inserted team data successfully');
            getPlayers(log, config.urls.players).then(() => {
                log.info('Inserted player data successfully');
                resolve();
            }).catch((err) => {
                log.info('Could not insert player data successfully: ', err);
                reject(err);
            });
        }).catch((err) => {
            log.info('Could not insert team data successfully: ', err);
            reject(err);
        });
    });
};

/*
* Get team data from api and organize headers into team object
* */
const getTeams = (log, url) => {
    return new Promise ((resolve,reject) => {
        let data;

        request(url,(err,response) => {
            if (err) {
                log.info('Could not get data', err);
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
                        if(header === "TEAM_ID" || header === "TEAM_NAME")
                        {
                            playerObj[header] = playerData[index];
                        }
                    });
                    return playerObj;
                });
                insertTeams(data).then((err) => {
                    /* istanbul ignore if */
                    if(err){
                        log.info('Could not save teams: ', err);
                        reject(err);
                    } else {
                        log.info('Successfully saved teams');
                        resolve();
                    }
                });
            }
        });
    });
};

/*
* Get player data from api then organize headers to form player object
* */
const getPlayers = (log, url) => {
    return new Promise ((resolve,reject) => {
        let data;

        request(url,(err,response) => {
            if (err) {
                log.info('Could not get data', err);
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
                insertPlayers(data).then((err) => {
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
const insertPlayers = (data) => {
    return new Promise ((resolve,reject) => {
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

/*
 * Create model from team object and insert/update into db
 * */
const insertTeams = (data) => {
    return new Promise ((resolve,reject) => {
        const team = new Team(mongoose);
        team.create(data,(err) => {
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
    getData,
    getTeams,
    getPlayers
};