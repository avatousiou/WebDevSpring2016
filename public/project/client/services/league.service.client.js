(function(){
    angular
        .module("PokemonLeagueApp")
        .factory("LeagueService", LeagueService);

    function LeagueService($http){
        var service = {
            getAllLeagues: getAllLeagues,
            getLeagues: getLeagues
        };

        return service;

        function getAllLeagues(){
            return $http.get("/api/project/leagues");
        }

        function getLeagues(trainerId){
            return $http.get("/api/project/trainer/" + trainerId + "/leagues");
        }
    }
})();