(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($rootScope, $location){
        var model = this;

        model.user = $rootScope.user;
    }
})();