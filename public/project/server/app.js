module.exports = function(app, db){
    var trainerModel = require("./models/trainer.model.js")(app, db);
    var leagueModel  = require("./models/league.model.js")(app, db);

    var trainerService  = require("./services/trainer.service.server.js")(app,trainerModel);
    var leagueService   = require("./services/league.service.server.js")(app, leagueModel);
};