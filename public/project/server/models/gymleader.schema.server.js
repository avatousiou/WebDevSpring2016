module.exports = function(mongoose) {

    var GymLeaderSchema = mongoose.Schema({
        "trainer": String,
        "beatenBy": [String],
        "badgeName": String,
        "badgeImage": String
    });

    return GymLeaderSchema;
};