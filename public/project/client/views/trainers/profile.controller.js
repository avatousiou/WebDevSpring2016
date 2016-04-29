(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $routeParams, LeagueService, TrainerService, $location){


        $scope.user = TrainerService.getCurrentUser();
        TrainerService.getCurrentUser().then(function(user){
            $scope.user = user.data;
        }, function(err){
            console.log(err);
        });

        if(!$scope.user){
            $location.url("/login");
        }

        $scope.selectedTab = 'team';

        var trainerId = $routeParams.trainerId;

        $scope.userProfile = {};
        TrainerService.getUserProfile(trainerId).then(function(response){$scope.userProfile = response.data});

        // For Team Tab
        $scope.pokemon = {};

        $scope.team = [];
        TrainerService.getTeam(trainerId).then(function(response){$scope.team = response.data});

        $scope.newComment = {
            user_id: $scope.user._id,
            user: $scope.user.firstName + $scope.user.lastName,
            comment: ""
        };

        $scope.comments = [];
        TrainerService.getComments(trainerId).then(function(response){$scope.comments = response.data});

        $scope.addComment = function(newComment){
            TrainerService.addCommentToTeam(trainerId, newComment).then(function(){
                TrainerService.getComments(trainerId).then(function(response){
                    $scope.comments = response.data;
                    $scope.newComment = {
                        user_id: $scope.user._id,
                        user: $scope.user.firstName + $scope.user.lastName,
                        comment: ""
                    };
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
                .then(function(response){
                    $scope.team = response.data;
                    $scope.pokemon = {};
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