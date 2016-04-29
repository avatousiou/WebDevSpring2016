(function(){
    angular
        .module("PokemonLeagueApp")
        .config(Configuration);

    function Configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/register",{
                templateUrl:"views/trainers/register.view.html",
                controller: "RegisterController"
            })
            .when("/login",{
                templateUrl: "views/trainers/login.view.html",
                controller: "LoginController"
            })
            .when("/profile/:trainerId",{
                templateUrl: "views/trainers/profile.view.html",
                controller: "ProfileController",
                controllerAs: 'model'
            })
            .when("/profile/:trainerId/badges", {
                templateUrl: "views/trainers/badges.view.html",
                controller: "BadgesController"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();