(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("MainController", MainController)

    function MainController($scope, $location){
        $scope.$location = $location;
    }
})();