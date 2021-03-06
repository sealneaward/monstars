'use strict';

const bunyan = require('bunyan');

module.exports = require('rc')('monstars', {
    log: {
        name: 'monstars',
        serializers: {
            res: bunyan.stdSerializers.res,
            req: bunyan.stdSerializers.req,
            err: bunyan.stdSerializers.err
        },
        level: 'info'
    },
    mongo: {
        uri:'mongodb://localhost/monstars'
    },
    web:{
        port: 3000,
        url: 'http://localhost:3000'
    },
    urls:{
        players: 'http://stats.nba.com/stats/leaguedashptstats?College=&Conference=&Country=&DateFrom=&DateTo=' +
        '&Division=&DraftPick=&DraftYear=&GameScope=&Height=&LastNGames=0&LeagueID=00&Location=&Month=0' +
        '&OpponentTeamID=0&Outcome=&PORound=0&PerMode=Totals&PlayerExperience=&PlayerOrTeam=Player&PlayerPosition=' +
        '&PtMeasureType=Defense&Season=2015-16&SeasonSegment=&SeasonType=Playoffs&StarterBench=&TeamID=0' +
        '&VsConference=&VsDivision=&Weight=',
        teams: 'http://stats.nba.com/stats/leaguedashteamstats?Conference=&DateFrom=&DateTo=&Division=&GameScope=' +
        '&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=' +
        '&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N' +
        '&Season=2015-16&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=' +
        '&VsDivision='
    }
});