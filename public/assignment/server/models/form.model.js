module.exports = function(){

    var forms = require("./forms.mock.json");

    var api = {
        findFormByTitle: findFormByTitle,
        findFormsByUser: findFormsByUser,
        findFormById: findFormById,
        findAllForms: findAllForms,
        create: createFormForUser,
        update: updateFormById,
        delete: deleteFormById,
        getFormFields: getFormFields,
        getFormFieldsById: getFormFieldsById,
        createFormField: createFormField,
        updateFormFieldById: updateFormFieldById,
        deleteFormFieldById: deleteFormFieldById
    }
    return api;

    function findFormByTitle(title){
        for(var f in forms){
            if(forms[f].title == title){
                return forms[f].fields;
            }
        }
    }

    function findFormsByUser(userId){
        var userForms = [];

        for(var f in forms){
            if(forms[f].userId == userId){
                userForms.push(forms[f]);
            }
        }
        return userForms;
    }

    function findFormById(formId){
        for(var f in forms){
            if(forms[f]._id == formId){
                return forms[f];
            }
        }
    }

    function findAllForms(){
        return forms;
    }

    function createFormForUser(form){
        forms.push(form);
        return form;
    }

    function updateFormById(formId, updatedForm){
        for(var f in forms){
            if(forms[f]._id == formId){
                forms[f] = updatedForm;
                return updatedForm;
            }
        }
    }

    function deleteFormById(formId){
        for(var f in forms){
            if(forms[f]._id == formId){
                forms.pop(forms[f]);
            }
        }
    }

    function getFormFields(formId){
        for(var f in forms){
            if(forms[f]._id == formId){
                return forms[f].fields;
            }
        }
    }

    function getFormFieldsById(formId, fieldId){
        for(var f in forms){
            if(forms[f]._id == formId){
                var form = forms[f];
                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        return form.fields[j];
                    }
                }
            }
        }
    }

    function createFormField(formId, field){
        for(var f in forms){
            if(forms[f]._id == formId){
                forms[f].fields.push(field);
                return forms[f].fields;
            }
        }
    }

    function updateFormFieldById(formId, fieldId, field){
        for(var f in forms){
            if(forms[f]._id == formId){
                var form = forms[f];
                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields[i] = field;
                    }
                }
            }
        }
    }

    function deleteFormFieldById(formId, fieldId){
        for(var f in forms){
            if(forms[f]._id == formId){
                var form = forms[f];
                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields.pop(form.fields[i]);
                    }
                }
            }
        }
    }
}