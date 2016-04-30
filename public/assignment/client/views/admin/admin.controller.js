(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, UserService){

        var model = this;

        model.sortOption = "username";
        model.reverse = false;

        getUsers();

        function getUsers(){
            UserService.findAllUsers().then(function(response){model.users = response.data;})
        }

        model.addUser = function(){
            if(model.username && model.password){
                if(!model.roles){
                    model.roles = "Student";
                } else {
                    model.roles = "Student," + model.roles;
                }
                var allRoles = model.roles.split(",");
                var newUser = {
                    username: model.username,
                    password: model.password,
                    firstName: model.firstName,
                    lastName: model.lastName,
                    roles: allRoles
                };
                UserService.createUser(newUser).then(function(){
                    getUsers();
                    model.username = "";
                    model.password = "";
                    model.firstName = "";
                    model.lastName = "";
                    model.roles = "";
                });
            }
        };

        model.updateUser = function(){
            var roles = model.roles;
            var updateRoles = roles.split(",");
            var updatedUser = {
                username: model.username,
                password: model.password,
                firstName: model.firstName,
                lastName: model.lastName,
                roles: updateRoles
            };
            UserService.updateUser(model.user._id, updatedUser).then(function(){
                getUsers();
                model.user = null;
                model.username = "";
                model.password = "";
                model.firstName = "";
                model.lastName = "";
                model.roles = "";
            });
        };

        model.deleteUser = function(user){
            if(user._id !== $rootScope.user._id){
                UserService.deleteUserById(user._id).then(function(){
                    getUsers();
                })
            } else {
                alert("You can't delete yourself");
            }
        };

        model.editUser = function(user){
            model.user = user;
            model.username = user.username;
            model.password = user.password;
            model.firstName = user.firstName;
            model.lastName = user.lastName;
            model.roles = user.roles;
        };

        model.sortBy = function(option){
            model.reverse = (model.sortOption === option ? !model.reverse : false);
            model.sortOption = option;
        }
    }
})();