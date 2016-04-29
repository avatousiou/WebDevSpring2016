(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $routeParams, TrainerService, $location){

        var model = this;

        model.user = $rootScope.user;

        if(!model.user){
            $location.url("/login");
        }

        model.selectedTab = 'team';

        var trainerId = $routeParams.trainerId;

        model.userProfile = {};
        TrainerService.getUserProfile(trainerId).then(function(response){model.userProfile = response.data});

        // For Team Tab
        model.pokemon = {
            pokemonName: "",
            moveset: ["", "", "", ""],
            item: "",
            ability: "",
            nature: "",
            EVs: [0, 0, 0, 0, 0, 0]
        };

        model.team = [];
        TrainerService.getTeam(trainerId).then(function(response){model.team = response.data});

        model.newComment = {
            user_id: model.user._id,
            user: model.user.firstName + model.user.lastName,
            comment: ""
        };

        model.comments = [];
        TrainerService.getComments(trainerId).then(function(response){model.comments = response.data});

        model.addComment = function(){
            TrainerService.addCommentToTeam(trainerId, model.newComment).then(function(){
                TrainerService.getComments(trainerId).then(function(response){
                    model.comments = response.data;
                    model.newComment = {
                        user_id: model.user._id,
                        user: model.user.firstName + model.user.lastName,
                        comment: ""
                    };
                });
            });
        };

        model.addPokemon = function(){
            TrainerService
                .createPokemonForTrainer(trainerId, model.pokemon)
                .then(function(){
                    TrainerService
                        .getTeam(trainerId)
                        .then(function(response){
                            model.team = response.data;
                            model.pokemon = {
                                pokemonName: "",
                                moveset: ["", "", "", ""],
                                item: "",
                                ability: "",
                                nature: "",
                                EVs: [0, 0, 0, 0, 0, 0]
                            };
                        })
                })
        };

        model.updatePokemon = function(){
            TrainerService
                .updatePokemonForTrainer(trainerId, model.pokemon._id, model.pokemon)
                .then(function(response){
                    model.team = response.data;
                    model.pokemon = {};
                })
        };

        model.editPokemon = function(pokemon){
            model.pokemon = pokemon;
        };

        model.removePokemon = function(pokemon){
            TrainerService
                .deletePokemonFromTeam(trainerId, pokemon._id)
                .then(function(){
                    TrainerService
                        .getTeam(trainerId)
                        .then(function(response){
                            model.team = response.data;
                        });
                });
        };

        // For Badges Tab
        model.leagues = [];
        TrainerService.getLeaguesForTrainer(trainerId).then(function(response){
            model.leagues = response.data;
        });

        // For Requests Tab
        if(model.userProfile.trainerType == ("GymLeader" || "EliteFour")){
            model.requests = [];
            TrainerService.getRequestsForTrainer(trainerId).then(function(response){
                model.requests = response.data;
            });

            model.awardBadge = function(challengerId){
                TrainerService.awardBadge(trainerId, challengerId).then(function(){
                    model.requests = response.data;
                })
            }
        }


    }
})();