module.exports = function(mongoose) {

    var GymLeaderSchema = require('./gymleader.schema.server.js')(mongoose);
    var EliteFourSchema = require('./elitefour.schema.server.js')(mongoose);

    var LeagueSchema = mongoose.Schema({
        "leagueName": String,
        "difficulty": {
            type: String,
            enum: ["Easy", "Medium", "Hard"]
        },
        "gymLeaders": [GymLeaderSchema],
        "eliteFour": [EliteFourSchema]
    });

    return LeagueSchema;
};