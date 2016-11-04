(function(){
    'use strict';

    angular
        .module('portal')
        .controller('PropositionCtrl', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl(PropositionService){
        var vm = this;
        
        init();

        function init(){
        }

    }

}());