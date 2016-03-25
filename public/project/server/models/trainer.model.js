module.exports = function(){

    var users = require("./trainers.mock.json");

    var api = {
        findTrainerByCredentials: findTrainerByCredentials,
        findTrainerByUsername: findTrainerByUsername,
        findTrainerById: findTrainerById,
        findAll: findAll,
        create: createTrainer,
        update: updateTrainer,
        delete: deleteTrainerById,
        addPokemon: addPokemon,
        getTeam: getTeam,
        getPokemonById: getPokemonById,
        updatePokemonById: updatePokemonById,
        deletePokemonById: deletePokemonById
    };

    return api;

    function findTrainerByCredentials(username, password){
        for(var u in users){
            if((username == users[u].username) || (password == users[u].password)){
                return users[u];
            }
        }
        return null;
    }

    function findTrainerByUsername(username){
        for(var u in users){
            if(username == users[u].username){
                return users[u];
            }
        }
    }

    function findTrainerById(id){
        for(var u in users){
            if(id == users[u]._id){
                return users[u];
            }
        }
        return null;
    }

    function findAll(){
        return users;
    }

    function createTrainer(user){
        users.push(user);
        return user;
    }

    function updateTrainer(id, user){
        for(var u in users){
            if(id == users[u]._id){
                users[u] = user;
                return user;
            }
        }
        return null;
    }

    function deleteTrainerById(id){
        for(var u in users){
            if(id == users[u]._id){
                users.pop(users[u]);
            }
        }
        return null;
    }

    function getTeam(trainerId){
        for(var u in users){
            if(trainerId == users[u]._id){
                return users[u].team;
            }
        }
    }

    function getPokemonById(trainerId, pokemonId){
        for(var u in users){
            if(trainerId == users[u]._id){
                for(p in users[u].team){
                    if(users[u].team[p]._id == pokemonId){
                        return users[u].team[p];
                    }
                }
            }
        }
    }

    function addPokemon(trainerId, pokemon){
        for(var u in users){
            if(trainerId == users[u]._id){
                if(users[u].team.size < 6){
                    users[u].team.push(pokemon);
                }
            }
        }
    }

    function updatePokemonById(trainerId, pokemonId, pokemon){
        for(var u in users){
            if(trainerId == users[u]._id){
                var trainer = users[u];
                for(var p in trainer.team){
                    if(trainer.team[p]._id == pokemonId){
                        trainer.team[p] = pokemon;
                    }
                }
            }
        }
    }

    function deletePokemonById(trainerId, pokemonId){
        for(var u in users){
            if(trainerId == users[u]._id){
                var trainer = users[u];
                for(var p in trainer.team){
                    if(pokemonId == trainer.team[p]){
                        trainer.team.pop(trainer.team[p]);
                    }
                }
            }
        }
    }

};