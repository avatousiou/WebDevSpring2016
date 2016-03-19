module.exports = function(app, model, db){
    var guid = require("guid");

    app.post("/api/assignment/form/:formId/field", function(request, response){
        var formId = request.params.formId;
        var newField = request.body;
        newField._id = guid.raw();
        model.createFormField(formId, newField);
        return response.send(200);
    });

    app.get("/api/assignment/form/:formId/field", function(request, response){
        var formId = request.params.formId;
        var fields = model.getFormFields(formId);
        return response.json(fields);
    });

    app.get("/api/assignment/form/:formId/field/:fieldId", function(request, response){
        var formId = request.params.formId;
        var fieldId = request.params.fieldId;
        var field = model.getFormFieldsById(formId, fieldId);
        return response.json(field);
    });

    app.put("/api/assignment/form/:formId/field/:fieldId", function(request, response){
        var formId = request.params.formId;
        var fieldId = request.params.fieldId;
        var updatedField = request.body;
        var fields = model.updateFormFieldById(formId, fieldId, updatedField);
        return response.json(fields);
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId", function(request, response){
        var formId = request.params.formId;
        var fieldId = request.params.fieldId;
        model.deleteFormFieldById(formId, fieldId);
        return response.json.send(200);
    })
};