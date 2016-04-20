var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, model){

    var auth = authorized;

    passport.use(new LocalStrategy(function(username, password, done){
        model.findTrainerByCredentials({"username": username, "password": password}).then(function(user){
            if (!user) { return done(null, false); }
            return done(null, user);
        }, function(err){
            if (err) { return done(err); }
        })
    }));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/project/login", passport.authenticate('local'), function(request, response){
        var user = request.user;
        response.json(user);
    });

    app.post("/api/project/logout", function(request, response){
        request.logOut();
        response.send(200);
    });

    app.post("/api/project/register", function(request, response){
        var newUser = request.body;
        newUser.trainerType = "Trainer";
        console.log(newUser);

        model.findTrainerByUsername(newUser.username).then(function(user){
            if (user) {
                response.json(null);
            } else {
                return model.createTrainer(newUser);
            }
        }, function(err){
            response.status(400).send(err);
        }).then(function(user){
            if(user){
                request.login(user, function(err){
                    if (err) {
                        response.status(400).send(err);
                    } else {
                        response.status(200).send(user);
                    }
                });
            }
        }, function(err){
            response.status(400).send(err);
        });
    });

    app.get("/api/project/loggedIn", function(request, response){
        response.send(request.isAuthenticated() ? request.user : '0');
    });

    app.post("/api/project/trainer", auth, function(request, response){
        var newTrainer = request.body;
        model.createTrainer(newTrainer).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.get("/api/project/trainer", auth, function(request, response){
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

    app.put("/api/project/trainer/:id", auth, function(request, response){
        var id = request.params.id
        var newTrainer = request.body;
        model.updateTrainer(id, newTrainer).then(function(resp){
            response.send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.post("/api/project/trainer/:trainerId/team", function(request, response){
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

    app.get("/api/project/trainer/:trainerId/team/comments", function(request, response){
        var trainerId = request.params.trainerId;
        model.getAllComments(trainerId).then(function(resp){
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

    app.get("/api/project/trainer/:trainerId/leagues", function(request, response){
        var trainerId = request.params.trainerId;
        model.getLeaguesForTrainer(trainerId).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.put("/api/project/trainer/:trainerId/leagues", function(request, response){
        var trainerId = request.params.trainerId;
        var leagueId = request.body._id;
        model.joinLeague(trainerId, leagueId).then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        model.findTrainerById(user._id).then(function(user){
            done(null, user);
        }, function(err){
            done(err, null);
        });
    }

    function authorized(request, response, next){
        if (!request.isAuthenticated()){
            response.send(401);
        } else {
            next();
        }
    }
};