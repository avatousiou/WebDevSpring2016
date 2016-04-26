(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $location, LeagueService, TrainerService){
        $scope.leagues = [];

        LeagueService.getAllLeagues().then(function(response){$scope.leagues = response.data});

        $scope.joinLeague = function(league){
            if (!$scope.user){
                $location.url("/login");
            } else {
                var trainerId = $scope.user._id;
                TrainerService.joinLeague(trainerId, league).then(function(response){
                    var user = response.data;
                    $rootScope.user = user;
                    $location.url("/profile/" + user._id);
                }, function(err){
                    $scope.error = err;
                });
            }
        }
    }
})();