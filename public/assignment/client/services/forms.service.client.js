(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){
        var service = {
            findAllFormsForUser: findAllFormsForUser,
            createFormForUser: createFormForUser,
            updateFormById: updateFormById,
            deleteFormById: deleteFormById
        };

        return service;

        function findAllFormsForUser(userId){
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function createFormForUser(userId, form){
            form._id = (new Date).getTime();
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function updateFormById(formId, updatedForm){
            return $http.put("/api/assignment/form/" + formId, updatedForm);
        }

        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/" + formId);
        }
    }
})();