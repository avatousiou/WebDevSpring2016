(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $routeParams, LeagueService, TrainerService, $location){
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
        TrainerService.getTeam(trainerId).then(function(response){$scope.team = response.data});

        $scope.newComment = {
            user: $scope.user._id,
            comment: ""
        };

        $scope.comments = [];
        TrainerService.getComments(trainerId).then(function(response){$scope.comments = response.data});

        $scope.addComment = function(newComment){
            TrainerService.addCommentToTeam(trainerId, newComment).then(function(){
                TrainerService.getComments(trainerId).then(function(response){
                    $scope.comments = response.data;
                    $scope.newComment = {user: $scope.user._id, comment: ""};
                });
            });
        };

        $scope.addPokemon = function(){
            TrainerService
                .createPokemonForTrainer(trainerId, $scope.pokemon)
                .then(function(){
                    TrainerService
                        .getTeam(trainerId)
                        .then(function(response){
                            $scope.team = response.data;
                            $scope.pokemon = {};
                        })
                })
        };

        $scope.updatePokemon = function(){
            TrainerService
                .updatePokemonForTrainer(trainerId, $scope.pokemon._id, $scope.pokemon)
                .then(function(){
                    TrainerService
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
            TrainerService
                .deletePokemonFromTeam(trainerId, pokemon._id)
                .then(function(){
                    TrainerService
                        .getTeam(trainerId)
                        .then(function(response){
                            $scope.team = response.data;
                        });
                });
        };

        // For Badges Tab
        $scope.leagues = [];
        TrainerService.getLeaguesForTrainer(trainerId).then(function(response){
            $scope.leagues = response.data;
        });
    }
})();