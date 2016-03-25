module.exports = function(app, model){
    var guid = require("guid");

    app.post("/api/project/trainer/:trainerId/team", function(request, response){
        var trainerId = request.params.trainerId;
        var newPokemon = request.body;
        newPokemon._id = guid.raw();
        model.addPokemon(trainerId, newPokemon);
        response.status(200).send();
    });

    app.get("/api/project/trainer/:trainerId/team", function(request, response){
        var trainerId = request.params.trainerId;
        var team = model.getTeam(trainerId);
        response.send(team);
    });

    app.get("/api/project/trainer/:trainerId/team/:pokemonId", function(request, response){
        var trainerId = request.params.trainerId;
        var pokemonId = request.params.pokemonId;
        var pokemon = model.getPokemonById(trainerId, pokemonId);
        response.send(pokemon);
    });

    app.put("/api/project/trainer/:trainerId/team/:pokemonId", function(request, response){
        var trainerId = request.params.trainerId;
        var pokemonId = request.params.pokemonId;
        var updatedPokemon = request.body;
        var team = model.updatePokemonById(trainerId, pokemonId, updatedPokemon);
        response.send(team);
    });

    app.delete("/api/project/trainer/:trainerId/team/:pokemonId", function(request, response){
        var trainerId = request.params.trainerId;
        var pokemonId = request.params.pokemonId;
        model.deletePokemonById(trainerId, pokemonId);
        response.status(200).send();
    })
};