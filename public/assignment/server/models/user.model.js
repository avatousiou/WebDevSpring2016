module.exports = function(){

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
                return users[u];
            }
        }
        return null;
    }

    function findUserById(id){
        for(var u in users){
            if(id == users[u]._id){
                return users[u];
            }
        }
        return null;
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
                users[u] = user;
                return user;
            }
        }
        return null;
    }

    function deleteUserById(id){
        for(var u in users){
            if(id == users[u]._id){
                users.pop(users[u]);
            }
        }
        return null;
    }

};