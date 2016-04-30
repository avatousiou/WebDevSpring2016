(function(){
    angular
        .module("FormBuilderApp")
        .config(Configuration);

    function Configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/register",{
                templateUrl:"views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {loggedin: checkAdmin}
            })
            .when("/forms",{
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/forms/:formId/fields",{
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user){
            if(user !== '0'){
                $rootScope.user = user;
                deferred.resolve(user);
            } else {
                deferred.reject();
                $location.url('/login');
            }
        });
        return deferred.promise;
    };

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope){
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user){
            if(user !== '0' && user.roles.indexOf('admin') != -1){
                $rootScope.user = user;
                deferred.resolve(user);
            } else {
                deferred.reject();
            }
        });
        return deferred.promise;
    };

})();