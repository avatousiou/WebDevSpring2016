(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService, $location){
        var model = this;

        var userId = $rootScope.user._id;

        model.firstName = $rootScope.user.firstName;
        model.lastName = $rootScope.user.lastName;
        model.username = $rootScope.user.username;
        model.password = $rootScope.user.password;

        model.update = function(){
            var updatedUser = {
                _id: userId,
                username: model.username,
                password: model.password,
                firstName: model.firstName,
                lastName: model.lastName
            };
            UserService.updateUserById(userId, updatedUser).then(function(user){
                $rootScope.user = user;
            })
        }
    }
})();