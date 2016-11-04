(function(){
    'use strict';

    angular
        .module('portal')
        .controller('actualiteCtrl', actualiteCtrl)

    function actualiteCtrl(listeActService){
        var vm = this;
        init();

        listeActService.listeJobs().then(function(value){
            vm.onLoad = false;
            vm.actualites = value.data;
        });
        vm.hideAll = hideAll;
        vm.idexActive =null;
        function hideAll(entreprise, idxActive){
            if(vm.indexActive != null){
                vm.actualites[vm.indexActive].onDetail = false;
            }
            vm.indexActive = idxActive;
            entreprise.onDetail = true;
        };
         function onSearchJob(){
            vm.searchJob = true;
            listeActService.searchJob(vm.keySearch).then(function(value){
                console.log(value);
                vm.actualites = value.data.hits;
                vm.searchJob = false;
            });
        }
        
        function init(){
            vm.onLoad = true;
            vm.searchJob = false;
            vm.onSearchJob = onSearchJob;
        }

    }

}());