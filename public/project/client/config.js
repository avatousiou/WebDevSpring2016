(function(){
    angular
        .module("PokemonLeagueApp")
        .config(Configuration);

    function Configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/register",{
                templateUrl:"views/trainers/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login",{
                templateUrl: "views/trainers/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile/:trainerId",{
                templateUrl: "views/trainers/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/profile/:trainerId/badges", {
                templateUrl: "views/trainers/badges.view.html",
                controller: "BadgesController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
        var deferred = $q.defer();
        $http.get("/api/project/loggedin").success(function(user){
            if (user !== 0){
                $rootScope.user = user;
                deferred.resolve(user);
            } else {
                deferred.reject();
                $location.url("/login");
            }
        });
        return deferred.promise;
    }
})();