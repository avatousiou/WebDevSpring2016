var Q = require('q');

module.exports = function(formModel){

    var api = {
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
    };
    return api;


    function findFormsByUser(userId){
        var deferred = Q.defer();
        formModel.find({userId: userId}, function(err, forms){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function findFormById(formId){
        var deferred = Q.defer();
        formModel.findById(formId, function(err, form){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function findAllForms(){
        var deferred = Q.defer();
        formModel.find(function(err, forms){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function createFormForUser(form){
        var deferred = Q.defer();
        form.fields = [];
        formModel.create(form, function(err, form){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, updatedForm){
        var deferred = Q.defer();
        formModel.findByIdAndUpdate(formId, {$set: updatedForm}, {new: true}, function(err, form){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId){
        var deferred = Q.defer();
        formModel.remove({_id: formId}, function(err, forms){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function getFormFields(formId){
        var deferred = Q.defer();
        formModel.findById(formId, {fields: 1, _id: 0}, function(err, form){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(form.fields);
            }
        });
        return deferred.promise;
    }

    function getFormFieldsById(formId, fieldId){
        var deferred = Q.defer();
        formModel.find({"_id": formId}, function(err, form){
            if(err){
                deferred.reject(err);
            } else {
                form.fields.splice(fieldId, 1);
                form.save(function(err, form){
                    deferred.resolve(form);
                });
            }
        });
        return deferred.promise;
    }

    function createFormField(formId, field){
        var deferred = Q.defer();
        formModel.findById(formId, function(err, form){
            if(err){
                deferred.reject(err);
            } else {
                form.fields.push(field);
                form.save(function(err, form){
                    deferred.resolve(form);
                });
            }
        });
        return deferred.promise;
    }

    function updateFormFieldById(formId, fieldId, field){
        var deferred = Q.defer();
        formModel.findById(formId, function(err, form){
            if(err){
                deferred.reject(err);
            } else {
                form.fields.splice(fieldId, 1);
                form.fields.push(field);
                form.save(function(err, form){
                    deferred.resolve(form);
                });
            }
        });
        return deferred.promise;
    }

    function deleteFormFieldById(formId, fieldInd){
        var deferred = Q.defer();
        formModel.findById(formId, function(err, form){
            if(err){
                deferred.reject(err);
            } else {
                form.fields.splice(fieldInd, 1);
                form.save(function(err, form){
                    deferred.resolve(form);
                });
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }
};