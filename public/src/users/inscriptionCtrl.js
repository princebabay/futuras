(function () {
    'use strict';

    angular
        .module('portal')
        .controller('inscriptionCtrl', inscriptionCtrl)

    /** @ngInject */
    function inscriptionCtrl(UserService, $state) {
        var vm = this;

        vm.inscrir = inscrir;

        init();

        function init() {
        }

        function inscrir() {
            UserService.createUser(vm.user).then(function (firebaseUser) {
                UserService.saveUser(firebaseUser.uid, vm.user).then(function(){
                    $state.go('futuras.home');
                });
            }).catch(function (error) {
                console.error("Error: ", error);
            });
        }

    }

} ());