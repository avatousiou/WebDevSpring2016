module.exports = function(mongoose) {

    var PokemonSchema = require('./pokemon.schema.server.js')(mongoose);
    var CommentSchema = require('./comment.schema.server.js')(mongoose);

    var TrainerSchema = mongoose.Schema({
        "username": String,
        "password": String,
        "firstName": String,
        "lastName": String,
        "email": String,
        "friendCode": String,
        "trainerType": {
            type: String,
            enum: ["Trainer", "GymLeader", "EliteFour"]
        },
        "leagues": [String],
        "pokemon": [PokemonSchema],
        "comments": [CommentSchema]
    });

    return TrainerSchema;
};