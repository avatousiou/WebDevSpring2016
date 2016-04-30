(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, UserService, $location){
        var model = this;

        model.login = function(user){
            if(user){
                UserService.login(user).then(function(response){
                    $rootScope.user = response.data;
                    $location.url('/profile');
                }, function(err){
                    console.log(err);
                })
            }
        }
    }
})();