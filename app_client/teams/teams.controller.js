(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('teamsCtrl', teamsCtrl);

  teamsCtrl.$inject = ['$scope', 'teamDataservice'];

  function teamsCtrl($scope, teamDataservice) {

    var vm = this;

    vm.teams = [];

    activate();

    function activate() {
      return getTeams().then(function() {
        console.info('Activated Teams View');
      });
    }

    function getTeams() {
      return teamDataservice.getTeams().then(function(data) {
        vm.teams = data;
        return vm.teams;
      });
    }
    
    vm.credentials = {
      name: "",
      adminUser:"",
      additionalInfo:""
      
    };
    
     vm.returnPage = $location.search().page || '/';
    
    vm.onSubmit = function() {
      vm.formError = "";
      if (!vm.credentials.name ||
          !vm.credentials.adminuser ||
          !cm.credentials.additionalInfo)
          
      {
        vm.formError = "Täytä kaikki kentät";
        return false;
      } else {
        vm.doRegister();
      }
    };
    
    vm.doRegister = function() {
      vm.formError = "";
      authentication
        .register(vm.credentials)
        .error(function(err) {
          vm.formError = err;
        })
        .then(function() {
          $location.search('page', null);
          $location.path(vm.returnPage);
        });
    };
    

  }

}());
