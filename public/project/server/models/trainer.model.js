var Q = require('q');

module.exports = function(trainerModel, pokemonModel, commentModel, gymLeaderModel, eliteFourModel, leagueModel){

    var api = {
        findTrainerByCredentials: findTrainerByCredentials,
        findTrainerByUsername: findTrainerByUsername,
        findTrainerById: findTrainerById,
        findAll: findAll,
        createTrainer: createTrainer,
        updateTrainer: updateTrainer,
        deleteTrainer: deleteTrainerById,
        addPokemon: addPokemon,
        getTeam: getTeam,
        getPokemonById: getPokemonById,
        updatePokemonById: updatePokemonById,
        deletePokemonById: deletePokemonById,
        addCommentForTeam: addCommentForTeam,
        getAllComments: getAllComments,
        updateGymLeaderById: updateGymLeaderById,
        updateEliteFourById: updateEliteFourById,
        getLeaguesForTrainer: getLeaguesForTrainer,
        joinLeague: joinLeague,
        getChallengers: getChallengers,
        awardBadgeToChallenger: awardBadgeToChallenger
    };

    return api;

    function findTrainerByCredentials(credentials){
        return trainerModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        )
    }

    function findTrainerByUsername(username){
        var deferred = Q.defer();

        trainerModel.findOne({username: username}, function(err, trainer){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(trainer);
            }
        });
        return deferred.promise;
    }

    function findTrainerById(trainerId){
        var deferred = Q.defer();

        trainerModel.findById(trainerId, function(err, trainer){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(trainer);
            }
        });
        return deferred.promise;
    }

    function findAll(){
        var deferred = Q.defer();

        trainerModel.find(function(err, trainers){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(trainers);
            }
        });
        return deferred.promise;
    }

    function createTrainer(user){
        var deferred = Q.defer();

        trainerModel.create(user, function(err, trainer){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(trainer);
            }
        });
        return deferred.promise;
    }

    function updateTrainer(id, user){
        var deferred = Q.defer();

        trainerModel.findByIdAndUpdate(id, user, {new: true}, function(err, trainer){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(trainer);
            }
        });
        return deferred.promise;
    }

    function deleteTrainerById(trainerId){
        var deferred = Q.defer();

        trainerModel.findOneAndRemove({id: trainerId}, function(err, trainer){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(trainer);
            }
        });
        return deferred.promise;
    }

    function getTeam(trainerId){
        var deferred = Q.defer();

        trainerModel.findById(trainerId, function(err, trainer){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(trainer.pokemon);
            }
        });
        return deferred.promise;
    }

    function getPokemonById(trainerId, pokemonId){
        var deferred = Q.defer();

        pokemonModel.findOne({id: pokemonId}, function(err, poke){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(poke);
            }
        });
        return deferred.promise;
    }

    function addPokemon(trainerId, pokemon){
        var deferred = Q.defer();

        pokemonModel.create(pokemon, function(err, createdPokemon){
            if (err) {
                deferred.reject(err);
            } else {
                trainerModel.findByIdAndUpdate(trainerId, {$push: {"pokemon": createdPokemon}}, {new: true}, function(err, updatedTrainer){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedTrainer);
                    }
                })
            }
        });
        return deferred.promise;
    }

    function updatePokemonById(trainerId, pokemonId, pokemon){
        var deferred = Q.defer();

        trainerModel.findById(trainerId, function(err, trainer){
            if (err) {
                deferred.reject(err);
            } else {
                for(var poke in trainer.pokemon){
                    if (trainer.pokemon[poke]._id == pokemonId) {
                        trainer.pokemon[poke] = pokemon;
                    }
                }
                trainerModel.findByIdAndUpdate(trainerId, {pokemon: trainer.pokemon}, {new: true}, function(err, updatedTrainer){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(trainer.pokemon);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deletePokemonById(trainerId, pokemonId){
        var deferred = Q.defer();

        pokemonModel.findById(pokemonId, function(err, poke){
            if (err) {
                deferred.reject(err);
            } else {
                trainerModel.findByIdAndUpdate(trainerId, {$pull: {"pokemon": {_id: pokemonId}}}, {new: true}, function(err, updatedTrainer){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedTrainer);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function addCommentForTeam(trainerId, comment){
        var deferred = Q.defer();

        commentModel.create(comment, function(err, createdComment){
            if (err) {
                deferred.reject(err);
            } else {
                trainerModel.findByIdAndUpdate(trainerId, {$push: {"comments": createdComment}}, {new: true}, function(err, updatedTrainer){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedTrainer);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function getAllComments(trainerId){
        var deferred = Q.defer();

        trainerModel.findById(trainerId, function(err, trainer){
            console.log(trainer);
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(trainer.comments);
            }
        });
        return deferred.promise;
    }

    function updateGymLeaderById(trainerId, defeatedBy){
        var deferred = Q.defer();

        gymLeaderModel.findOneAndUpdate({trainer: trainerId}, {$push: {beatenBy: defeatedBy}}, {new: true}, function(err, leader){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(leader);
            }
        });
        return deferred.promise;
    }

    function updateEliteFourById(trainerId, defeatedBy){
        var deferred = Q.defer();

        eliteFourModel.findOneAndUpdate({trainer: trainerId}, {$push: {beatenBy: defeatedBy}}, {new: true}, function(err, eliteFour){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(eliteFour);
            }
        });
        return deferred.promise;
    }

    function getLeaguesForTrainer(trainerId){
        var deferred = Q.defer();

        trainerModel.findById(trainerId, function(err, trainer){
            if (err) {
                deferred.reject(err);
            } else {
                var trainerLeagues = [];
                trainer.leagues.forEach(function(leagueId, index){
                    leagueModel.findById(leagueId, function(err, league){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            trainerLeagues[index] = league;
                            deferred.resolve(trainerLeagues);
                        }
                    })
                });
            }
        });
        return deferred.promise;
    }

    function joinLeague(trainerId, leagueId){
        var deferred = Q.defer();

        trainerModel.findByIdAndUpdate(trainerId,{$push: {"leagues": leagueId}},{new: true}, function(err, trainer){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(trainer);
            }
        });
        return deferred.promise;
    }

    function getChallengers(trainerId){
        var deferred = Q.defer();

        gymLeaderModel.findOne({trainer: trainerId}, function(err, gymLeader){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(gymLeader.battleRequests);
            }
        });
        return deferred.promise;
    }

    function awardBadgeToChallenger(trainerId, challengerId){
        var deferred = Q.defer();

        gymLeaderModel.findByIdAndUpdate(trainerId, {$push: {"beatenBy": challengerId}, $pull: {"battleRequests": challengerId}}, {new: true}, function(err, leader){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(leader.battleRequests);
            }
        });
        return deferred.promise;
    }
};