(function(){
    angular
        .module("PokemonLeagueApp")
        .factory("TrainerService", TrainerService);

    function TrainerService($http){
        var service =  {
            findAllTrainers: findAllTrainers,
            findTrainerByCredentials: findTrainerByCredentials,
            findTrainerByTrainername: findTrainerByTrainername,
            createTrainer: createTrainer,
            updateTrainerById: updateTrainerById,
            deleteTrainerById: deleteTrainerById,
            createPokemonForTrainer: createPokemonForTrainer,
            getTeam: getTeam,
            getPokemonForTrainer: getPokemonForTrainer,
            updatePokemonForTrainer: updatePokemonForTrainer,
            deletePokemonFromTeam: deletePokemonFromTeam,
            addCommentToTeam: addCommentToTeam,
            updateGymLeaderLosses: updateGymLeaderLosses,
            updateEliteFourLosses: updateEliteFourLosses
        };

        return service;

        function findAllTrainers(){
            return $http.get("/api/project/trainer");
        }

        function findTrainerByCredentials(username, password){
            return $http.get("/api/project/trainer?username=" + username + "&password=" + password);
        }

        function findTrainerByTrainername(username){
            return $http.get("/api/project/trainer?username=" + username);
        }

        function createTrainer(user){
            user._id = (new Date).getTime();
            return $http.post("/api/project/trainer", user);
        }

        function updateTrainerById(id, updatedTrainer){
            return $http.put("/api/project/trainer/" + id, updatedTrainer);
        }

        function deleteTrainerById(id){
            return $http.delete("api/project/trainer/" + id);
        }

        function createPokemonForTrainer(trainerId, pokemon){
            return $http.post("/api/project/trainer/" + trainerId + "/team", pokemon);
        }

        function getTeam(trainerId){
            return $http.get("/api/project/trainer/" + trainerId + "/team");
        }

        function getPokemonForTrainer(trainerId, pokemonId){
            return $http.get("/api/project/trainer/" + trainerId + "/team/" + pokemonId);
        }

        function updatePokemonForTrainer(trainerId, pokemonId, pokemon){
            return $http.put("/api/project/trainer/" + trainerId + "/team/" + pokemonId, pokemon);
        }

        function deletePokemonFromTeam(trainerId, pokemonId){
            return $http.delete("/api/project/trainer/" + trainerId + "/team/" + pokemonId);
        }

        function addCommentToTeam(trainerId, comment){
            return $http.post("/api/project/trainer/" + trainerId + "/team/comments/", comment);
        }

        function updateGymLeaderLosses(gymLeaderId, trainerId){
            return $http.put("/api/project/gymleader" + gymLeaderId, trainerId);
        }

        function updateEliteFourLosses(eliteFourId, trainerId){
            return $http.put("/api/project/elitefour/" + eliteFourId, trainerId);
        }
    }
})();