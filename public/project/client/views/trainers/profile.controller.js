(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $routeParams, TrainerService, PokemonService, $location){
        $rootScope.state = "profile";

        if(!$rootScope.user){
            $location.path("/login");
            return;
        }

        var trainerId = $routeParams.trainerId;

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
    }
})();