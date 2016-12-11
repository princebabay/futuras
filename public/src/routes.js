(function () {
    'use strict';

    angular
        .module('portal')
        .config(ConfigConfig)

    function ConfigConfig($mdThemingProvider, $mdIconProvider, $stateProvider) {
        $mdIconProvider.defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("share", "./assets/svg/share.svg", 24)
            .icon("google_plus", "./assets/svg/google_plus.svg", 512)
            .icon("hangouts", "./assets/svg/hangouts.svg", 512)
            .icon("twitter", "./assets/svg/twitter.svg", 512)
            .icon("phone", "./assets/svg/phone.svg", 512);
        $mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('orange');
        $stateProvider.state('futuras', {
            url: "",
            templateUrl: "src/layout.html",
            abstract: true
        }).state('futuras.home', {
            url: "/home",
            templateUrl: "src/home/view/actualite.html",
            controller: "actualiteCtrl",
            controllerAs: "$ctrl"
        }).state("futuras.profile", {
            url: "/profile",
            templateUrl: "src/profile/view/profile.html",
            controller: "ProfileCtrl",
            controllerAs: "$ctrl"
        }).state("futuras.offre-add", {
            url: "/offre-add",
            templateUrl: "src/offre/ajouter.html",
            controller: "OffreCtrl",
            controllerAs: "$ctrl"
        }).state("futuras.propositions", {
            url: "/propositions",
            templateUrl: "src/offre/proposition.html",
            controller: "PropositionCtrl",
            controllerAs: "$ctrl"
        }).state("login", {
            url: "/login",
            templateUrl: "src/authentification/view/login.html",
            controller: function(UserService, $state){
                vm = this;
                vm.login = login;

                function login(){
                    UserService.login(vm.user).then(function(){
                        $state.go("futuras.login");
                    });
                }
            },
            controllerAs: '$ctrl'
        }).state("inscription", {
            url: "/inscription",
            templateUrl: "src/authentification/view/inscription.html",
            controller: "inscriptionCtrl",
            controllerAs: '$ctrl'
        });
    }

} ());