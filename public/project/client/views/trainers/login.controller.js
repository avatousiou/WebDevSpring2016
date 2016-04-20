(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, TrainerService, $location){
        $scope.user = {
            username: "",
            password: ""
        };

        $scope.login = function(user){
            TrainerService.login(user).then(function(response){
                $rootScope.user = response.data;
                $location.url("/profile/" + response.data._id);
            }, function(err){
                $scope.error = err;
            });
        }
    }
})();