module.exports = function(app, model, db){
    var guid = require("guid");

    app.post("/api/assignment/form/:formId/field", function(request, response){
        var formId = request.params.formId;
        var newField = request.body;
        newField._id = guid.raw();
        model.createFormField(formId, newField);
        response.status(200);
    });

    app.get("/api/assignment/form/:formId/field", function(request, response){
        var formId = request.params.formId;
        var fields = model.getFormFields(formId);
        response.send(fields);
    });

    app.get("/api/assignment/form/:formId/field/:fieldId", function(request, response){
        var formId = request.params.formId;
        var fieldId = request.params.fieldId;
        var field = model.getFormFieldsById(formId, fieldId);
        response.send(field);
    });

    app.put("/api/assignment/form/:formId/field/:fieldId", function(request, response){
        var formId = request.params.formId;
        var fieldId = request.params.fieldId;
        var updatedField = request.body;
        var fields = model.updateFormFieldById(formId, fieldId, updatedField);
        response.send(fields);
    });

    app.delete("/api/assignment/form/:formId/field/:fieldId", function(request, response){
        var formId = request.params.formId;
        var fieldId = request.params.fieldId;
        model.deleteFormFieldById(formId, fieldId);
        response.json.status(200);
    })
};