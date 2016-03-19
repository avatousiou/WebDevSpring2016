(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, UserService, $location){
        $scope.form = {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            verifyPassword: "",
            roles: []
        };

        $scope.register = function(){
            UserService
                .createUser($scope.form)
                .then(function(response){
                    $rootScope.user = response.data;
                    $location.path("/profile");
                })
        }
    }
})();