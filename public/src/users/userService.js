(function(){
    'use strict';

    angular
        .module('portal')
        .service('DeveloppeurService', Service)

    /** @ngInject */
    function Service($http){

        this.liste = getListeDeveloppeur;
        
        function getListeDeveloppeur(){
            return $http.get("https://futuras.mybluemix.net/developpeurs");
        }
    }

}());