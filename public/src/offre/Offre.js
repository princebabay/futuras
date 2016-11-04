(function(){
    'use strict';

    angular
        .module('portal')
        .controller('OffreCtrl', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl(OffreService, $state){
        var vm = this;
        vm.readonly = false;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.vegetables = loadVegetables();
        vm.selectedVegetables = [];
        vm.numberChips = [];
        vm.numberChips2 = [];
        vm.numberBuffer = '';
        vm.autocompleteDemoRequireMatch = false;
        vm.transformChip = transformChip;
        init();
        vm.save = save;

        function init(){
            vm.tags=[];
        }


        function save(){
            var desc = document.getElementById('contentDescription');
            vm.offre.contenue = desc.innerHTML;
            vm.offre.logo = "assets/img/windows_symbol_clr_52x52.png";
            OffreService.save(vm.offre).success(success);
        }

        function success(data){
            console.log(data);
            $state.go("home");
        }

        /**
     * Return the proper object when the append is called.
     */
    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }

      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }

    /**
     * Search for vegetables.
     */
    function querySearch (query) {
      var results = query ? vm.vegetables.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(vegetable) {
        return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
            (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
      };

    }

    function loadVegetables() {
      var veggies = [
        {
          'name': 'Symfony',
          'type': 'php'
        },
        {
          'name': 'Laravel',
          'type': 'php'
        },
        {
          'name': 'Angular',
          'type': 'javascript'
        },
        {
          'name': 'ReactJS',
          'type': 'javascript'
        },
        {
          'name': 'C#',
          'type': 'windows'
        }
      ];

      return veggies.map(function (veg) {
        veg._lowername = veg.name.toLowerCase();
        veg._lowertype = veg.type.toLowerCase();
        return veg;
      });
    }

    }

}());