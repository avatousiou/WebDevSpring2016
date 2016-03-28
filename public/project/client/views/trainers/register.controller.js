(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, TrainerService, $location){
        $scope.form = {
            username: "",
            password: "",
            verifyPassword: "",
            firstName: "",
            lastName: "",
            email: "",
            friendCode: ""
        };

        $scope.register = function(){
            TrainerService
                .createTrainer($scope.form)
                .then(function(response){
                    $rootScope.user = response.data;
                    $location.path("/profile");
                })
        }
    }
})();