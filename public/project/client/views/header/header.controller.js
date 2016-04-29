(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, TrainerService, $rootScope, $location){
        
        $scope.user = $rootScope.user;

        $scope.logout = function(){
            TrainerService.logout().then(function(response){
                $rootScope.currentUser = null;
                $location.url("/login");
            }, function(err){
                model.error = err;
            });
        };

        
    }
})();