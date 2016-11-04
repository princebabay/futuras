//urlBase="https://futuras.mybluemix.net";
(function(){
    'use strict';

    angular
        .module('portal')
        .service('listeActService', listeActService)

    /** @ngInject */
    function listeActService($http){
        var urlBase="http://localhost:6001";

        this.listeJobs = listeJobs;
        this.searchJob = searchJob;

        function listeJobs() {
            return $http({
                method: 'GET',
                url: urlBase+'/posts'
            }).then(function successCallback(response) {
                return response;
            }, function errorCallback(error) {
                console.log(error);
            });
        }
        function searchJob(key){
            var urlbase = urlBase+"/search/post";
            return $http({
                method: 'POST',
                url: urlbase,
                data: {key: key}
            }).then(function successCallback(response) {
                return response;
            }, function errorCallback(error) {
                alert(JSON.stringify(error));
            });
        }
    }
}());