'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('../config.js');
const mongodb = require('./lib/getData');
const log = require('bunyan').createLogger(config.log);
mongoose.Promise = Promise;

const url = 'http://stats.nba.com/stats/leaguedashptstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=' +
    '&DraftPick=&DraftYear=&GameScope=&Height=&LastNGames=0&LeagueID=00&Location=&Month=0&OpponentTeamID=0' +
    '&Outcome=&PORound=0&PerMode=Totals&PlayerExperience=&PlayerOrTeam=Player&PlayerPosition=' +
    '&PtMeasureType=Defense&Season=2015-16&SeasonSegment=&SeasonType=Playoffs&StarterBench=&TeamID=0' +
    '&VsConference=&VsDivision=&Weight=';

mongodb.getData(url, log).then(() => {
    log.info('Succesfully inserted data into mongo collection');
}).catch((err) => {
    log.error('Error inserting data into collection: ', err);
});