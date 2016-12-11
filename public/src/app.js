angular.module('portal', ['ngMaterial', 'ui.router', 'firebase']);

(function () {
    'use strict';

    angular
        .module('portal')
        .run(RunRun)

    /** @ngInject */
    function RunRun($rootScope) {

    }

} ());

(function () {
    'use strict';

    angular
        .module('portal')
        .constant('config', { url: "http://localhost:3001" });

} ());