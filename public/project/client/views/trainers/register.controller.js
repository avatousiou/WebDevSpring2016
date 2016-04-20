(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, TrainerService, $location){
        $scope.user = {
            username: "",
            password: "",
            verifyPassword: "",
            firstName: "",
            lastName: "",
            email: "",
            friendCode: ""
        };

        $scope.register = function(user){
            if ((user.password != user.verifyPassword) || !user.password || !user.verifyPassword){
                $scope.error = "Your passwords don't match";
            } else {
                TrainerService.register(user).then(function(response){
                    var user = response.data;
                    if(user != null){
                        $rootScope.user = user;
                        $location.url("/profile/" + user._id);
                    }
                }, function(err){
                    $scope.error = err;
                });
            }
        }
    }
})();