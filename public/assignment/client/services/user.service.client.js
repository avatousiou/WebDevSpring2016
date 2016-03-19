(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http){
        var service =  {
            findallUsers: findAllUsers,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            createUser: createUser,
            updateUserById: updateUserById,
            deleteUserById: deleteUserById
        };

        return service;

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function findUserByCredentials(username, password){
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username=" + username);
        }

        function createUser(user){
            user._id = (new Date).getTime();
            return $http.post("/api/assignment/user", user);
        }

        function updateUserById(id, updatedUser){
            return $http.put("/api/assignment/user/" + id, updatedUser);
        }

        function deleteUserById(id){
            return $http.delete("api/assignment/user/" + id);
        }
    }
})();