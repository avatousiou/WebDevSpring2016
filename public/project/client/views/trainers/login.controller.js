(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, TrainerService, $location){
        $scope.form = {
            username: "",
            password: ""
        };

        $scope.login = function(){
            TrainerService
                .findTrainerByCredentials($scope.form.username, $scope.form.password)
                .then(function(response){
                    if(response.data){
                        $rootScope.user = response.data;
                        $location.path("/profile/123");
                    }
                })
        }
    }
})();