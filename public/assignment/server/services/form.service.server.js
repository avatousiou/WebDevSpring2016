module.exports = function(app, model){
    var guid = require("guid");

    app.post("/api/assignment/user/:userId/form", function(request, response){
        var userId = request.params.userId;
        var newForm = request.body;
        newForm.userId = userId;
        newForm._id = guid.raw();
        var forms = model.create(newForm);
        response.status(200).send();
    });

    app.get("/api/assignment/user/:userId/form", function(request, response){
        var userId = request.params.userId;
        var forms = model.findFormsByUser(userId);
        response.send(forms);
    });

    app.get("/api/assignment/form/:formId", function(request, response){
        var formId = request.params.formId;
        var form = model.findFormById(formId);
        response.send(form);
    });

    app.put("/api/assignment/form/:formId", function(request, response){
        var formId = request.params.formId;
        var updatedForm = request.body;
        var updatedForms = model.update(formId, updatedForm);
        response.status(200).send();
    });

    app.delete("/api/assignment/form/:formId", function(request, response){
        var formId = request.params.formId;
        var forms = model.delete(formId);
        response.status(200).send();
    });
};
