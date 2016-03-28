module.exports = function(app){
    var trainerModel    = require("./models/trainer.model.js")();
    var trainerService  = require("./services/trainer.service.server.js")(app,trainerModel);

}