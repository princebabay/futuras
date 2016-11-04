(function(){
    'use strict';

    angular
        .module('portal')
        .controller('DeveloppeurCtrl', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($rootScope, DeveloppeurService){
        var vm = this;
        var developpeurs = [];
        vm.createDisc = createDisc;

        DeveloppeurService.liste().success(function(users){
            vm.developpeurs = users;
        });
        function createDisc(user){
            if(!$rootScope.userDiscr){
                $rootScope.userDiscr = [];
            }
            $rootScope.userDiscr.push(user);
        }

        vm.pathAvatar = "assets/img";

    }

}());