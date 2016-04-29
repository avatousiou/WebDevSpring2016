module.exports = function(mongoose) {

    var GymLeaderSchema = mongoose.Schema({
        "trainer": String,
        "beatenBy": [String],
        "battleRequests": [String],
        "badgeName": String,
        "badgeImage": String
    });

    return GymLeaderSchema;
};