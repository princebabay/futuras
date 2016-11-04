(function(){
    'use strict';

    angular
        .module('portal')
        .config(ConfigConfig)

    function ConfigConfig($mdThemingProvider, $mdIconProvider, $stateProvider){
        $mdIconProvider.defaultIconSet("./assets/svg/avatars.svg", 128)
                        .icon("menu", "./assets/svg/menu.svg", 24)
                        .icon("share", "./assets/svg/share.svg", 24)
                        .icon("google_plus", "./assets/svg/google_plus.svg", 512)
                        .icon("hangouts", "./assets/svg/hangouts.svg", 512)
                        .icon("twitter", "./assets/svg/twitter.svg", 512)
                        .icon("phone", "./assets/svg/phone.svg", 512);
                $mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('orange');
                $stateProvider.state('home', {
                    url: "/home",
                    templateUrl: "src/home/view/actualite.html",
                    controller: "actualiteCtrl",
                    controllerAs: "$ctrl"
                }).state("profile",{
                    url: "/profile",
                    templateUrl: "src/profile/view/profile.html",
                    controller: "ProfileCtrl",
                    controllerAs: "$ctrl"
                }).state("offre-add",{
                    url: "/offre-add",
                    templateUrl: "src/offre/ajouter.html",
                    controller: "OffreCtrl",
                    controllerAs: "$ctrl"
                }).state("propositions",{
                    url: "/propositions",
                    templateUrl: "src/offre/proposition.html",
                    controller: "PropositionCtrl",
                    controllerAs: "$ctrl"
                });
    }

}());