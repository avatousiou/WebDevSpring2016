(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location, LeagueService, TrainerService){

        var model = this;

        model.user = $rootScope.user;
        var trainerId = model.user._id;
        model.leagues = [];
        LeagueService.getAllLeagues().then(function(response){model.leagues = response.data});

        model.joinLeague = function(league){
            if (!model.user){
                $location.url("/login");
            } else {
                TrainerService.joinLeague(trainerId, league).then(function(response){
                    var user = response.data;
                    $rootScope.user = user;
                    $location.url("/profile/" + user._id);
                }, function(err){
                    model.error = err;
                });
            }
        }
    }
})();