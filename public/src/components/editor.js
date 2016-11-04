(function(){
    'use strict';

    angular
        .module('portal')
        .filter('keyboardShortcut', Filter)

    function Filter(){
        return function(str) {
            if (!str) return;
            var keys = str.split('-');
            var isOSX = /Mac OS X/.test(window.navigator.userAgent);

            var seperator = (!isOSX || keys.length > 2) ? '+' : '';

            var abbreviations = {
                M: isOSX ? '⌘' : 'Ctrl',
                A: isOSX ? 'Option' : 'Alt',
                S: 'Shift'
            };

            return keys.map(function(key, index) {
                var last = index == keys.length - 1;
                return last ? key : abbreviations[key];
            }).join(seperator);
        };
    }

}());

(function () {
    'use strict';

    angular
        .module ('portal')
        .component ('editor', component());

    
    function component() {

        function componentController($mdDialog, OffreService){
            init();

            function init(){

            }

            this.settings = {
                printLayout: true,
                showRuler: true,
                showSpellingSuggestions: true,
                presentationMode: 'edit'
            };

            this.sampleAction = function(name, ev) {
                $mdDialog.show($mdDialog.alert()
                    .title(name)
                    .textContent('You triggered the "' + name + '" action')
                    .ok('Great')
                    .targetEvent(ev)
                );
            };
            
        }

        return {
            bindings: {},
            controller: componentController,
            templateUrl: "src/components/editor.html",
            controllerAs: 'ctrl'
        }
    }

} ());