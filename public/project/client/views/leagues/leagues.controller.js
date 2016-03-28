(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("LeaguesController", LeaguesController);

    function LeaguesController($scope, LeagueService){
        $scope.leagues = [];
        LeagueService.getAllLeagues().then(function(response){$scope.leagues = response.data});

    }
})();