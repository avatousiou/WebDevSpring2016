(function(){
    angular
        .module("PokemonLeagueApp")
        .factory("TrainerService", TrainerService);

    function TrainerService($http){
        var service =  {
            login: login,
            logout: logout,
            register: register,
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
            getComments: getComments,
            updateGymLeaderLosses: updateGymLeaderLosses,
            updateEliteFourLosses: updateEliteFourLosses,
            getLeaguesForTrainer: getLeaguesForTrainer,
            joinLeague: joinLeague
        };

        return service;

        function login(user){
            return $http.post("/api/project/login", user);
        }

        function logout(){
            return $http.post("/api/project/logout");
        }

        function register(user){
            return $http.post("/api/project/register", user);
        }

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
            return $http.post("/api/project/trainer/" + trainerId + "/team/comments", comment);
        }

        function getComments(trainerId){
            console.log(trainerId);
            return $http.get("/api/project/trainer/" + trainerId + "/team/comments");
        }

        function updateGymLeaderLosses(gymLeaderId, trainerId){
            return $http.put("/api/project/gymleader" + gymLeaderId, trainerId);
        }

        function updateEliteFourLosses(eliteFourId, trainerId){
            return $http.put("/api/project/elitefour/" + eliteFourId, trainerId);
        }

        function getLeaguesForTrainer(trainerId){
            return $http.get("/api/project/trainer/" + trainerId + "/leagues");
        }

        function joinLeague(trainerId, league){
            return $http.put("/api/project/trainer/" + trainerId + "/leagues", league);
        }
    }
})();