(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, FormService, $location){

        var model = this;

        model.user = $rootScope.user;

        model.forms = [];

        FormService
            .findAllFormsForUser($rootScope.user._id)
            .then(function(response){
                model.forms = response.data;
            });

        model.form = {};

        model.addForm = function(){
            FormService
                .createFormForUser($rootScope.user._id, model.form)
                .then(function(){
                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(response){
                            model.forms = response.data;
                            model.form = {};
                        });
                });
        };

        model.updateForm = function(){
            FormService
                .updateFormById(model.form._id, model.form)
                .then(function(){
                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(response){
                            model.forms = response.data;
                            model.form = {};
                        });
                });
        };

        model.deleteForm = function(form){
            FormService
                .deleteFormById(form._id)
                .then(function(){
                    FormService
                        .findAllFormsForUser($rootScope.user._id)
                        .then(function(response){
                            model.forms = response.data;
                        });
                });
        };

        model.selectForm = function(form){
            model.form = form;
        }

    }
})();