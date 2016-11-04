(function(){
    'use strict';

    angular
        .module('portal')
        .service('ServiceMeteo', ServiceMeteo)

    ServiceMeteo.$inject=["$http"];
    /** @ngInject */
    function ServiceMeteo($http){
        //var url="https://futuras.mybluemix.net/meteo/observation";
        var url="http://localhost:6001/meteo/observation";
        var latitude = "-18.87";
        var longitude = "47.55";
        var service = {
            observations : observations
        }
        
        return service;

        function observations(latitude, longitude){
            /*return $http.get(url+"/"+latitude+"/"+longitude, function(data){
                console.log(data);
            });*/
            return $http.get("src/data/weather.json");
        }
    }

}());