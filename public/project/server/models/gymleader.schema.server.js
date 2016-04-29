module.exports = function(mongoose) {

    var RequestSchema = require('./request.schema.server.js')(mongoose);

    var GymLeaderSchema = mongoose.Schema({
        "trainer": String,
        "beatenBy": [String],
        "battleRequests": [RequestSchema],
        "badgeName": String,
        "badgeImage": String
    });

    return GymLeaderSchema;
};