(function(){
    angular
        .module("PokemonLeagueApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(TrainerService, $rootScope, $location){
        
        var model = this;
        
        model.user = $rootScope.user;
        
        model.logout = function(){
            TrainerService.logout().then(function(response){
                $rootScope.currentUser = null;
                $location.url("/login");
            }, function(err){
                model.error = err;
            });
        };

        
    }
})();