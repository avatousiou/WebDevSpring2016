(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, UserService, $location){
        var model = this;

        model.register = function(){
            if(model.password != model.verifyPassword || !model.password || !model.verifyPassword){

            } else {
                var user = {
                    username: model.username,
                    password: model.password,
                    email: model.email
                };
                UserService
                    .createUser(user)
                    .then(function(response){
                        $rootScope.user = response.data;
                        $location.path("/profile");
                    }, function(err){
                        console.log(err);
                    });
            }
        }
    }
})();