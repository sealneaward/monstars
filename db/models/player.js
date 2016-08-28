'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const Schema = mongoose.Schema;

const playerSchema = new Schema(
    {
        BLK: Number,
        DEF_RIM_FGA: Number,
        DEF_RIM_FGM: Number,
        DEF_RIM_FG_PCT: Number,
        DREB: Number,
        GP: Number,
        L: Number,
        MIN: Number,
        PLAYER_ID: Number,
        PLAYER_NAME: String,
        STL: Number,
        TEAM_ABBREVIATION: String,
        TEAM_ID: Number,
        W: Number
    },
    {
      collection: 'Players'
    });

const Player =  mongoose.model('Player', playerSchema);

module.exports = Player;