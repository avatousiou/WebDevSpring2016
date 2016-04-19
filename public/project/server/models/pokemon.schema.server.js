module.exports = function(mongoose) {

    var PokemonSchema = mongoose.Schema({
        "pokemonName": String,
        "moveset": [String],
        "item": String,
        "ability": String,
        "nature": {
            type: String,
            enum: ["Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle", "Hardy", "Hasty",
            "Impish", "Jolly", "Lax", "Lonely", "Mild", "Modest", "Naive", "Naughty", "Quiet", "Quirky", "Rash",
            "Relaxed", "Sassy", "Serious", "Timid"]
        },
        "EVs": [Number]
    });

    return PokemonSchema;
};