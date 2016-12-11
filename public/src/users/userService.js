(function () {
    'use strict';

    angular
        .module('portal')
        .service('UserService', Service)

    /** @ngInject */
    function Service($http, config, $firebaseAuth, $firebaseObject) {

        this.liste = getListeDeveloppeur;
        this.createUser = createUser;
        this.saveUser = saveUser;

        function getListeDeveloppeur() {
            return [];
        }

        function createUser(user) {
            return $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password);
        }

        function saveUser(id, user) {
            var ref = firebase.database().ref("users/" + id);
            var obj = $firebaseObject(ref);
            obj.nom = user.nom;
            obj.prenom = user.prenom;
            return obj.$save();
        }

        function login(user) {
            return $firebaseAuth().$signInWithEmailAndPassword(user.email, user.password);
        }
    }

} ());