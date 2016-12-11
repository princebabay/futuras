(function () {
    'use strict';

    angular
        .module('portal')
        .controller('actualiteCtrl', actualiteCtrl)

    function actualiteCtrl(listeActService, $scope, $mdDialog) {
        var vm = this;

        vm.onSearchJob = onSearchJob;

        init();

        vm.actualites = listeActService.listeJobs();
        vm.actualites.$loaded(function () {
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

        vm.selectDocument = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'src/documents/view/selector-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }

    }

} ());