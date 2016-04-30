var Q = require('q');

module.exports = function(userModel){
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAll: findAll,
        create: createUser,
        update: updateUser,
        delete: deleteUserById
    };

    return api;

    function findUserByCredentials(username, password){
        var deferred = Q.defer();
        userModel.findOne({username: username, password: password}, function(err, user){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = Q.defer();
        userModel.findOne({username: username}, function(err, user){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserById(id){
        var deferred = Q.defer();
        userModel.findById(id, function(err, user){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findAll(){
        var deferred = Q.defer();
        userModel.find(function(err, users){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function createUser(user){
        var deferred = Q.defer();
        userModel.create(user, function(err, user){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function updateUser(id, user){
        var deferred = Q.defer();
        delete user["_id"];
        userModel.findOneAndUpdate({_id: id}, user, {new: true}, function(err, updatedUser){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(updatedUser);
            }
        });
        return deferred.promise;
    }

    function deleteUserById(id){
        var deferred = Q.defer();
        userModel.remove({_id: id}, function(err, users){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

};