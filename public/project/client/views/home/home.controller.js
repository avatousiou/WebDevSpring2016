(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $location, LeagueService, TrainerService){

        var currentUser = TrainerService.getCurrentUser();
        TrainerService.getCurrentUser().then(function(user){
            currentUser = user.data;
            console.log(user.data);
        }, function(err){
            console.log(err);
        });
        $scope.user = currentUser;
        console.log(currentUser);
        var trainerId = currentUser._id;
        console.log(trainerId);
        $scope.leagues = [];

        LeagueService.getAllLeagues().then(function(response){$scope.leagues = response.data});

        $scope.joinLeague = function(league){
            if (!$scope.user){
                $location.url("/login");
            } else {
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