(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $routeParams, LeagueService, PokemonService, $location){
        $rootScope.state = "profile";

        if(!$rootScope.user){
            $location.path("/login");
            return;
        }

        $scope.selectedTab = 'team';

        var trainerId = $routeParams.trainerId;

        // For Team Tab
        $scope.pokemon = {};

        $scope.team = [];
        PokemonService.getTeam(trainerId).then(function(response){$scope.team = response.data});

        $scope.addPokemon = function(){
            PokemonService
                .createPokemonForTrainer(trainerId, $scope.pokemon)
                .then(function(){
                    PokemonService
                        .getTeam(trainerId)
                        .then(function(response){
                            $scope.team = response.data;
                            $scope.pokemon = {};
                        })
                })
        };

        $scope.updatePokemon = function(){
            PokemonService
                .updatePokemonForTrainer(trainerId, $scope.pokemon._id, $scope.pokemon)
                .then(function(){
                    PokemonService
                        .getTeam(trainerId)
                        .then(function(response){
                            $scope.team = response.data;
                            $scope.pokemon = {};
                        })
                })
        };

        $scope.editPokemon = function(pokemon){
            $scope.pokemon = pokemon;
        };

        $scope.removePokemon = function(pokemon){
            PokemonService
                .deletePokemonFromTeam(trainerId, pokemon._id)
                .then(function(){
                    PokemonService
                        .getTeam(trainerId)
                        .then(function(response){
                            $scope.team = response.data;
                        });
                });
        };

        // For Badges Tab
        $scope.leagues = [];
        LeagueService.getLeagues(trainerId).then(function(response){$scope.leagues = response.data});
    }
})();