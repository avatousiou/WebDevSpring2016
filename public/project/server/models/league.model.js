var Q = require('q');

module.exports = function(leagueModel){

    var api = {
        getLeagues: getLeagues
    };

    return api;

    function getLeagues(){
        var deferred = Q.defer();

        leagueModel.find(function(err, leagues){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(leagues);
            }
        });
        return deferred.promise;
    }
};