(function(){
    angular.module("FormBuilderApp", ["ngRoute"]);

    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope){
        $scope.hello = "Hello World";
    }
});

