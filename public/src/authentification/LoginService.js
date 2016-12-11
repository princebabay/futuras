(function(){
    'use strict';

    angular
        .module('portal')
        .service('LoginService', Service)

    /** @ngInject */
    function Service($http, config){
        var url=config.url+"/login";

        this.auth = auth;
        
        function auth(user){
            return $http.post(url, {user: user});
        }
    }

}());