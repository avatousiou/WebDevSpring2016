(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http){
        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            updateFieldForForm: updateFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm
        };

        return service;

        function createFieldForForm(formId, field){
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId){
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId){
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateFieldForForm(formId, fieldId, field){
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

        function deleteFieldFromForm(formId, fieldId){
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }
    }
})();