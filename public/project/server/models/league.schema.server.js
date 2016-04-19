module.exports = function(mongoose) {

    var LeagueSchema = mongoose.Schema({
        "leagueName": String,
        "difficulty": {
            type: String,
            enum: ["Easy", "Medium", "Hard"]
        },
        "gymLeaders": [String],
        "eliteFour": [String]
    });

    return LeagueSchema;
};