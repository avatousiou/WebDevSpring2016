(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope){
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