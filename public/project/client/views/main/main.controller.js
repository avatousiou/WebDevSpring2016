(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("MainController", MainController)

    function MainController($scope, $rootScope, $location){
        $scope.$location = $location;

        $scope.logout = function(){
            $rootScope.user = null;
            $location.path("/home");
        }
    }
})();