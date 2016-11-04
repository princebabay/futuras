(function(){
    'use strict';

    angular
        .module('portal')
        .service('OffreService', Service)

    /** @ngInject */
    function Service($http){
        var urlBase="http://localhost:6001";

        this.save = save;

        function save(offre){
            var urlbase = urlBase+"/save/offre";
            return $http({
                method: 'POST',
                url: urlbase,
                data: {offre: offre}
            });
        }
    }

}());