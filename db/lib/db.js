const Promise = require('bluebird');
const Player = require('../models/player');
const Team = require('../models/team');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

/*
* Get players from local db
* */
const getPlayers = () => {
    return new Promise ((resolve,reject) => {
        const player = new Player(mongoose);

        // no parameters used to get all from db
        player.find({}, (err,records) => {
            /* istanbul ignore if */
            if(err){
                reject(err);
            } else {
                resolve(records);
            }
        });
    });
};

/*
 * Get teams from local db
 * */
const getTeams = () => {
    return new Promise ((resolve,reject) => {
        const team = new Team(mongoose);

        // no parameters used to get all from db
        team.find({}, (err,records) => {
            /* istanbul ignore if */
            if(err){
                reject(err);
            } else {
                resolve(records);
            }
        });
    });
};

module.exports = {
    getTeams,
    getPlayers
};

