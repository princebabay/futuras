(function(){
    'use strict';

    angular
        .module('portal')
        .service('LoginService', Service)

    /** @ngInject */
    function Service($http){
        var url="http://localhost:6001/login";

        this.auth = auth;
        
        function auth(user){
            return $http.post(url, {user: user});
        }
    }

}());