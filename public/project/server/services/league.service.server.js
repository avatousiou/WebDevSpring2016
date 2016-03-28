module.exports = function(app, model){
    var guid = require("guid");

    app.get("/api/project/leagues", function(request, response){
        var leagues = model.getLeagues();
        response.send(leagues);
    });

    app.get("/api/project/trainer/:trainerId/leagues", function(request, response){
        var trainerId = request.params.trainerId;
        var leagues = model.getLeaguesForTrainer(trainerId);
        response.send(leagues);
    });
};