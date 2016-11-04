(function () {
    'use strict';

    angular
        .module ('portal')
        .component ('messagerie', component());


    function component() {

        function componentController($rootScope){
            var vm = this;
            vm.fil = [];
            vm.sendMessage = sendMessage;
            vm.pathAvatar = "assets/img";
            function sendMessage(){
                vm.user.msg = vm.msg;
                vm.fil.push(vm.msg);
                vm.msg = "";
                $rootScope.socket.emit('sendmsg',$rootScope.user, vm.user);
            }

            $rootScope.socket.on('message', function(msg){
                vm.fil.push({txt: msg, from:true});
                console.log(vm.fil);
            });

            init();

            function init(){

            }
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