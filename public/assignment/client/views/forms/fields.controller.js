(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope, FieldService, $routeParams){
        var formId = $routeParams.formId;

        FieldService
            .getFieldsForForm(formId)
            .then(function(response){
                $scope.fields = response.data;
            });

        $scope.fieldType = "TEXT";

        $scope.removeField = function(field){
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(function(){
                    FieldService
                        .getFieldsForForm(formId)
                        .then(function(response){
                            $scope.fields = response.data;
                        });
                });
        }

        $scope.addField = function(){
            if($scope.fieldType == "TEXT"){
                var form = {
                    _id: null,
                    label: "New Text Field",
                    type: "TEXT",
                    placeholder: "New Field"
                }
            }
            if($scope.fieldType == "TEXTAREA"){
                var form = {
                    _id: null,
                    label: "New Text Field",
                    type: "TEXTAREA",
                    placeholder: "New Field"
                }
            }
            if($scope.fieldType == "DATE"){
                var form = {
                    _id: null,
                    label: "New Date Field",
                    type: "DATE"
                }
            }
            if($scope.fieldType == "OPTIONS"){
                var form = {
                    _id: null,
                    label: "New Dropdown",
                    type: "OPTIONS",
                    options: [
                        {label: "Option 1", value: "OPTION_1"},
                        {label: "Option 2", value: "OPTION_2"},
                        {label: "Option 3", value: "OPTION_3"}
                    ]
                }
            }
            if($scope.fieldType == "CHECKBOXES"){
                var form = {
                    _id: null,
                    label: "New Checkboxes",
                    type: "CHECKBOXES",
                    options: [
                        {label: "Option A", value: "OPTION_A"},
                        {label: "Option B", value: "OPTION_B"},
                        {label: "Option C", value: "OPTION_C"}
                    ]
                }
            }
            if($scope.fieldType == "RADIOS"){
                var form = {
                    _id: null,
                    label: "New Radio Buttons",
                    type: "RADIOS",
                    options: [
                        {label: "Option X", value: "OPTION_X"},
                        {label: "Option Y", value: "OPTION_Y"},
                        {label: "Option Z", value: "OPTION_Z"}
                    ]
                }
            }

            FieldService
                .createFieldForForm(formId, form)
                .then(function(){
                    FieldService
                        .getFieldsForForm(formId)
                        .then(function(response){
                            $scope.fields = response.data;
                        });
                });
        }
    }
})();