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
            deleteTrainerById: deleteTrainerById
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
    }
})();