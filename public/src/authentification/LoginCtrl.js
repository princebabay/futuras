(function(){
    'use strict';

    angular
        .module('portal')
        .controller('LoginCtrl', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl(LoginService, $rootScope, config){
        var vm = this;
        init();

        function init(){
        }
        vm.login = login;
        
        function login(){
            LoginService.auth(vm.user).success(function(data){
                if(data.status){
                    $rootScope.sessionStorage.setItem("user", JSON.stringify(data.user));
                    window.location.href = config.url+"/#/home";
                }
            });
        }

    }

}());