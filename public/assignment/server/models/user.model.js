module.exports = function(db){

    var users = require("./user.mock.json");

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findAll: findAll,
        create: createUser,
        update: updateUser,
        delete: deleteUserById
    };

    return api;

    function findUserByCredentials(username, password){
        for(var u in users){
            if((username == users[u].username) || (password == users[u].password)){
                return users[i];
            }
        }
    }

    function findUserById(id){
        for(var u in users){
            if(id == users[u]._id){
                return users[i];
            }
        }
    }

    function findAll(){
        return users;
    }

    function createUser(user){
        users.push(user);
        return user;
    }

    function updateUser(id, user){
        for(var u in users){
            if(id == users[u]._id){
                users[i] = user;
                return user;
            }
        }
    }

    function deleteUserById(id){
        for(var u in users){
            if(id == users[u]._id){
                users.pop(users[u]);
            }
        }
    }

};