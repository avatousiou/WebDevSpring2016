(function(){
    angular
        .module("FormBuilderApp")
        .controller("EditFieldModalController", EditFieldModalController);

    function EditFieldModalController($scope, $uibModalInstance, field){
        $scope.field = field;

        $scope.ok = function(){
            $uibModalInstance.close($scope.field);
        };

        $scope.cancel = function(){
            $uibModalInstance.dismiss('cancel');
        };
    }
})();