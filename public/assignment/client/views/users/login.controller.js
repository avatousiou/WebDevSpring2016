(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService, $location){
        $scope.form = {
            username: "",
            password: ""
        };

        $scope.login = function(){
            UserService
                .findUserByCredentials($scope.form.username, $scope.form.password)
                .then(function(response){
                    if(response.data){
                        $rootScope.user = response.data;
                        $location.path("/profile");
                    }
                })
        }
    }
})();