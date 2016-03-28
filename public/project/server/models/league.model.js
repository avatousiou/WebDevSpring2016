module.exports = function(){
    var leagues = require("./leagues.mock.json");
    var users = require("./trainers.mock.json");

    var api = {
        getLeagues: getLeagues,
        getLeaguesForTrainer: getLeaguesForTrainer
    };

    return api;

    function getLeagues(){
        return leagues;
    }

    function getLeaguesForTrainer(trainerId){
        return leagues;
    }
};