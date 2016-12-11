(function () {
    'use strict';

    angular
        .module('portal')
        .controller('actualiteCtrl', actualiteCtrl)

    function actualiteCtrl(listeActService, $scope) {
        var vm = this;
        
        vm.onSearchJob = onSearchJob;

        init();

        vm.actualites = listeActService.listeJobs();
        vm.actualites.$loaded(function() {
            vm.onLoad = false;
        });

        vm.hideAll = hideAll;
        vm.idexActive = null;
        function hideAll(entreprise, idxActive) {
            if (vm.indexActive != null) {
                vm.actualites[vm.indexActive].onDetail = false;
            }
            vm.indexActive = idxActive;
            entreprise.onDetail = true;
        };
        function onSearchJob() {
            vm.searchJob = true;
            listeActService.searchJob(vm.keySearch).then(function (value) {
                vm.actualites = value.data.hits;
                vm.searchJob = false;
            });
        }

        function init() {
            vm.onLoad = true;
            vm.searchJob = false;
        }

    }

} ());