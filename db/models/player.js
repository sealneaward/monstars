'use strict';
let player;

module.exports = function (mongoose) {
        if (player) {
                return player;
        }
        const schema = new mongoose.Schema({
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

        player = mongoose.model('Player', schema);
        return player;
};