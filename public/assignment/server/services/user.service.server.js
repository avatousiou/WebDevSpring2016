module.exports = function(app, model){
    app.post("/api/assignment/user", function(request, response){
        console.log(model);
        var newUser = request.body;
        var updatedUser = model.create(newUser);
        response.send(updatedUser);
    });

    app.get("/api/assignment/user", function(request, response){
        var username = request.query.username;
        var password = request.query.password;
        if(username && password){
            console.log(username);
            var user = model.findUserByCredentials(username, password);
            response.send(user);
        } else if(username) {
            var user = model.findUserByUsername(username);
            response.send(user);
        } else {
            var users = model.findAll();
            response.send(users);
        }
    });

    app.get("/api/assignment/user/:id", function(request, response){
        var id = request.params.id;
        var user = model.findById(id);
        response.send(user);
    });

    app.put("/api/assignment/user/:id", function(request, response){
        var id = request.params.id;
        var updatedUser = request.body;
        var updatedUser = model.update(id, updatedUser);
        response.send(updatedUser);
    });
};