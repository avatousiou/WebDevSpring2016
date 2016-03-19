module.exports = function(app, model, db){
    app.post("/api/assignment/user", function(request, response){
        var newUser = request.body;
        var updatedUser = model.create(newUser);
        response.json(updatedUser);
    });

    app.get("/api/assignment/user", function(request, response){
        var username = request.query.username;
        var password = request.query.password;
        if(username || password){
            var user = model.findUserByCredentials(username, password);
            return response.json(user);
        }
        var users = model.findAll();
        return response.json(user);
    });

    app.get("/api/assignment/user/:id", function(request, response){
        var id = request.params.id;
        var user = model.findById(id);
        return response.json(user);
    });

    app.put("/api/assignment/user/:id", function(request, response){
        var id = request.params.id;
        var updatedUser = request.body;
        var updatedUser = model.update(id, updatedUser);
        return response.json(updatedUser);
    });
};