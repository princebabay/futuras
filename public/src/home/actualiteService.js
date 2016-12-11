(function(){
    'use strict';

    angular
        .module('portal')
        .service('listeActService', listeActService)

    /** @ngInject */
    function listeActService($firebaseObject, $firebaseArray, config){
        var urlBase = config.url;

        this.listeJobs = listeJobs;
        this.searchJob = searchJob;

        function listeJobs() {
            var ref = firebase.database().ref().child("offres");
            return $firebaseArray(ref);
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