(function () {
    'use strict';

    angular
        .module ('portal')
        .component ('weather', component());


    function component() {
        function componentController(ServiceMeteo){
            var vm = this;
            vm.getIcon = getIcon;
            ServiceMeteo.observations("10", "20").success(success);
            //navigator.geolocation.getCurrentPosition(successPosition, errorPosition);
            
            function success(data){
                vm.observations = data.observation;   
            }
            
            function getIcon(idIcon){
                return "/assets/weather_icons/"+idIcon+".svg";
            }

            function successPosition(position) {
                var latitude  = position.coords.latitude;
                var longitude = position.coords.longitude;
                ServiceMeteo.observations(latitude, longitude).success(success);
            };

            function errorPosition() {
                console.log("Unable to retrieve your location");
            };
        }

        return {
            bindings: {},
            controller: componentController,
            controllerAs: '$ctrl',
            templateUrl: "src/components/weather.html"
        }
    }

} ());