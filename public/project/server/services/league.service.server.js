module.exports = function(app, model){
    app.get("/api/project/leagues", function(request, response){
        model.getLeagues().then(function(resp){
            response.status(200).send(resp);
        }, function(err){
            console.log(err);
            response.status(400).send(err);
        });
    });

    app.get("/api/project/trainer/:trainerId/leagues", function(request, response){
        var trainerId = request.params.trainerId;
        var leagues = model.getLeaguesForTrainer(trainerId);
        response.send(leagues);
    });
};