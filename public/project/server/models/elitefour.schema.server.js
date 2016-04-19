module.exports = function(mongoose) {

    var EliteFourSchema = mongoose.Schema({
        "trainer": String,
        "beatenBy": [String]
    });

    return EliteFourSchema;
};