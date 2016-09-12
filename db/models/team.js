'use strict';
let team;

module.exports = function (mongoose) {
    /* istanbul ignore if */
    if (team) {
        return team;
    }
    const schema = new mongoose.Schema({
            TEAM_ID: Number,
            TEAM_NAME: String
        },
        {
            collection: 'Teams'
        });

    team = mongoose.model('Team', schema);
    return team;
};