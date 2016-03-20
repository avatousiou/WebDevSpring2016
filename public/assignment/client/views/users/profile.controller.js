(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService, $location){
        $rootScope.state = "profile";

        if(!$rootScope.user){
            $location.path("/login");
            return;
        }

        $scope.form = {
            firstName: $rootScope.user.firstName,
            lastName: $rootScope.user.lastName,
            username: $rootScope.user.username,
            password: $rootScope.user.password
        };

        $scope.update = function(){
            UserService
                .updateUserById($rootScope.user._id, $scope.form)
                .then(function(response){
                    $rootScope.user = response.data;
                    $scope.form.firstName = $rootScope.user.firstName;
                    $scope.form.lastName = $rootScope.user.lastName;
                    $scope.form.username = $rootScope.user.username;
                    $scope.form.password = $rootScope.user.password;
                })
        }
    }
})();