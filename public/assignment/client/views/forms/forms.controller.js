(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, FormService, $location){
        $rootScope.state = "forms";

        $scope.forms = [];

        FormService
            .findAllFormsForUser($rootScope.user._id)
            .then(function(response){
                $scope.forms = response.data;
            });

        $scope.form = {};

        $scope.addForm = function(){
            FormService
                .createFormForUser($rootScope.user._id, $scope.form)
                .then(function(){
                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(response){
                            $scope.forms = response.data;
                        });
                });
        };

        $scope.updateForm = function(){
            FormService
                .updateFormById($scope.form._id, $scope.form)
                .then(function(){
                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(response){
                            $scope.forms = response.data;
                        });
                });
        };

        $scope.deleteForm = function(){
            FormService
                .deleteFormById(form._id)
                .then(function(){
                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(response){
                            $scope.forms = response.data;
                        });
                });
        };

        $scope.selectForm = function(form){
            $location.path("/form-fields/" + form._id);
        }

    }
})();