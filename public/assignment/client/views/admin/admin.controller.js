(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, $location){
        $rootScope.state = "admin";
        if(!$rootScope.user){
            $location.path("/login");
        }
    }
})();