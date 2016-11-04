(function () {
    'use strict';

    angular
        .module ('portal')
        .component ('messagerie', component());


    function component() {

        function componentController($rootScope, $scope){
            var vm = this;
            vm.fil = [];
            vm.sendMessage = sendMessage;
            vm.pathAvatar = "assets/img";

            init();

            function init(){

            }

            function sendMessage(){
                vm.user.msg = vm.msg;
                vm.fil.push(vm.msg);
                vm.msg = "";
                $rootScope.socket.emit('sendmsg',$rootScope.user, vm.user);
            }

            $rootScope.socket.on('message', function(msg){
                $scope.$apply(function(){
                    vm.fil.push({txt: msg, from:true});
                });
            });
        }

        return {
            bindings: {
                user : "="
            },
            controller: componentController,
            templateUrl: "src/components/messagerie.html"
        }
    }

} ());