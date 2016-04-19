module.exports = function(app, model){
    app.post("/api/project/trainer", function(request, response){
        console.log(model);
        var newTrainer = request.body;
        model.create(newTrainer).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.get("/api/project/trainer", function(request, response){
        var username = request.query.username;
        var password = request.query.password;
        if(username && password){
            model.findTrainerByCredentials(username, password).then(function(resp){
                response.status(200).send(resp);
            }, function(err){
                console.log(err);
                response.status(400).send(err);
            });
        } else if(username) {
            model.findTrainerByUsername(username).then(function(resp){
                response.status(200).send(resp);
            }, function(err){
                console.log(err);
                response.status(400).send(err);
            });
        } else {
            model.findAll().then(function(resp){
                response.status(200).send(resp);
            }, function(err){
                console.log(err);
                response.status(400).send(err);
            });
        }
    });

    app.get("/api/project/trainer/:id", function(request, response){
        var id = request.params.id;
        model.findTrainerById(id).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        })
    });

    app.put("/api/project/trainer/:id", function(request, response){
        var id = request.params.id
        var newTrainer = request.body;
        model.updateTrainer(id, newTrainer).then(function(resp){
            response.send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.post("/api/project/trainer/:trainerId/team/comments", function(request, response){
        var trainerId = request.params.trainerId;
        var newPokemon = request.body;
        model.addPokemon(trainerId, newPokemon).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.get("/api/project/trainer/:trainerId/team", function(request, response){
        var trainerId = request.params.trainerId;
        model.getTeam(trainerId).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.get("/api/project/trainer/:trainerId/team/:pokemonId", function(request, response){
        var trainerId = request.params.trainerId;
        var pokemonId = request.params.pokemonId;
        model.getPokemonById(trainerId, pokemonId).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.put("/api/project/trainer/:trainerId/team/:pokemonId", function(request, response){
        var trainerId = request.params.trainerId;
        var pokemonId = request.params.pokemonId;
        var updatedPokemon = request.body;
        model.updatePokemonById(trainerId, pokemonId, updatedPokemon).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.delete("/api/project/trainer/:trainerId/team/:pokemonId", function(request, response){
        var trainerId = request.params.trainerId;
        var pokemonId = request.params.pokemonId;
        model.deletePokemonById(trainerId, pokemonId).then(function(){
            response.status(200).send();
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.post("/api/project/trainer/:trainerId/team/comments", function(request, response){
        var trainerId = request.params.trainerId;
        var newComment = request.body;
        model.addCommentForTeam(trainerId, newComment).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.put("/api/project/gymleader/:gymLeaderId", function(request, response){
        var gymLeaderId = request.params.gymLeaderId;
        var defeatedBy = request.body;
        model.updateGymLeaderById(gymLeaderId, defeatedBy).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.put("/api/project/elitefour/:eliteFourId", function(request, response){
        var eliteFourId = request.params.eliteFourId;
        var defeatedBy = request.body;
        model.updateEliteFourById(eliteFourId, defeatedBy).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });
};