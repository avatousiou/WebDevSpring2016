(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($rootScope, $routeParams, FieldService, FormService){
        
        var model = this;
        var formId = $routeParams.formId;

        FieldService
            .getFieldsForForm(formId)
            .then(function(response){
                model.fields = response.data;
            });

        model.fieldType = "TEXT";

        model.addField = function(){
            if(model.fieldType == "TEXT"){
                var form = {
                    _id: null,
                    label: "New Text Field",
                    type: "TEXT",
                    placeholder: "New Field"
                }
            }
            if(model.fieldType == "TEXTAREA"){
                var form = {
                    _id: null,
                    label: "New Text Field",
                    type: "TEXTAREA",
                    placeholder: "New Field"
                }
            }
            if(model.fieldType == "DATE"){
                var form = {
                    _id: null,
                    label: "New Date Field",
                    type: "DATE"
                }
            }
            if(model.fieldType == "OPTIONS"){
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
            if(model.fieldType == "CHECKBOXES"){
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
            if(model.fieldType == "RADIOS"){
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
                            model.fields = response.data;
                        });
                });
        };

        model.editField = function(field){
            model.field = field;
            var options = [];
            if(model.field.type == ("OPTIONS" || "CHECKBOXES" || "RADIOS")){
                for(var i in field.options){
                    var opt = field.options[i].label + ":" + field.options[i].value;
                    options.push(opt);
                }
            }
            model.field.optText = options.join("\n");
        };

        model.updateField = function(field){
            var options = [];
            if(model.field.type == ("OPTIONS" || "CHECKBOXES" || "RADIOS")){
                var text = model.field.optText.split("\n");
                for(var i in text){
                    var j = text[i].split(":");
                    options.push({label: a[0], value: a[1]})
                }
                field.options = options;
            }
            FieldService.updateFieldForForm(formId, field._id, field).then(function(){
                FieldService.getFieldsForForm(formId).then(function(response) {
                    model.fields = response.data;
                });
            })
        };

        model.removeField = function(field){
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(function(){
                    FieldService
                        .getFieldsForForm(formId)
                        .then(function(response){
                            model.fields = response.data;
                        });
                });
        };

        model.copyField = function(index){
            var newField = {
                label: model.fields[index].label,
                type: model.fields[index].type,
                placeholder: model.fields[index].type,
                options: model.fields[index].options
            };
            FieldService.createFieldForForm(formId, newField).then(function(){
                FieldService.getFieldsForForm(formId).then(function(response){model.fields = response.data})
            })
        };


    }
})();