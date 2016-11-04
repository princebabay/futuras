angular.module('portal', ['ngMaterial', 'ui.router']);

(function(){
    'use strict';

    angular
        .module('portal')
        .run(RunRun)

    /** @ngInject */
    function RunRun($rootScope){
        $rootScope.socket = io();
        $rootScope.sessionStorage = window.sessionStorage;
        $rootScope.socket.on('connect',function(){
            if($rootScope.sessionStorage.getItem("user")){
                var user  = JSON.parse($rootScope.sessionStorage.getItem("user"));
                user.idSocket = $rootScope.socket.id;
                $rootScope.sessionStorage.setItem("user", JSON.stringify(user));
                $rootScope.user = user;
                $rootScope.socket.emit('updatesocketuser', user);
            }
        });
        $rootScope.socket.on('message', function(msg){
            //alert(msg);
        });
        /*$rootScope.socket.emit('discussion', "hello");
        $rootScope.socket.emit('private message',"prince", "hello");
        $rootScope.socket.on('discussion', function(msg){
            //alert(msg);
        });*/
    }

}());