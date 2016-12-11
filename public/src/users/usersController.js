(function(){
    'use strict';

    angular
        .module('portal')
        .controller('DeveloppeurCtrl', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($rootScope){
        var vm = this;
        var developpeurs = [];
        vm.createDisc = createDisc;

        function createDisc(user){
            if(!$rootScope.userDiscr){
                $rootScope.userDiscr = [];
            }
            $rootScope.userDiscr.push(user);
        }

        vm.pathAvatar = "assets/img";

    }

}());