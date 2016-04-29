module.exports = function(mongoose) {
    var RequestSchema = mongoose.Schema({
        "trainerId": String,
        "trainerName": String
    });

    return RequestSchema;
};