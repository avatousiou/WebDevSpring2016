module.exports = function(app, model){
    app.post("/api/project/trainer", function(request, response){
        console.log(model);
        var newTrainer = request.body;
        var updatedTrainer = model.create(newTrainer);
        response.send(updatedTrainer);
    });

    app.get("/api/project/trainer", function(request, response){
        var username = request.query.username;
        var password = request.query.password;
        if(username && password){
            console.log(username);
            var trainer = model.findTrainerByCredentials(username, password);
            response.send(trainer);
        } else if(username) {
            var trainer = model.findTrainerByUsername(username);
            response.send(trainer);
        } else {
            var trainers = model.findAll();
            response.send(trainers);
        }
    });

    app.get("/api/assignment/trainer/:id", function(request, response){
        var id = request.params.id;
        var trainer = model.findById(id);
        response.send(trainer);
    });

    app.put("/api/assignment/trainer/:id", function(request, response){
        var id = request.params.id;
        var updatedTrainer = request.body;
        var updatedTrainer = model.update(id, updatedTrainer);
        response.send(updatedTrainer);
    });
};