(function(){
    angular
        .module("PokemonLeagueApp")
        .factory("PokemonService", PokemonService);

    function PokemonService($http){
        var service = {
            createPokemonForTrainer: createPokemonForTrainer,
            getTeam: getTeam,
            getPokemonForTrainer: getPokemonForTrainer,
            updatePokemonForTrainer: updatePokemonForTrainer,
            deletePokemonFromTeam: deletePokemonFromTeam
        };

        return service;

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
    }
})();