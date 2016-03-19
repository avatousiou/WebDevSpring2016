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
    }
})();