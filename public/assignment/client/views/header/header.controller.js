(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location){
        function logout(){
            $rootScope.currentUser = null;
            $location.url("/home");
        }

        $scope.logout = logout;

        $scope.loggedIn = function(){
            return $rootScope.user != null;
        };

        $scope.admin = function(){
            if($rootScope.user == null){
                return false;
            }
            if($rootScope.user.roles == null){
                return false;
            }
            for(var i = 0; i < $rootScope.user.roles.length; i++){
                if($rootScope.user.roles[i] == "admin"){
                    return true;
                }
            }
            return false;
        };
    }
})();