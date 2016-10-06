(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('teamsCtrl', teamsCtrl);

  teamsCtrl.$inject = ['$scope', 'teamDataservice','$location', 'authentication'];

  function teamsCtrl($scope, teamDataservice, $location, authentication) {

    var vm = this;

    vm.doCreateTeam = doCreateTeam;
    vm.onSubmit = onSubmit;
    vm.teams = [];
    vm.returnPage = $location.search().page || '/';
    
    ////
    
    activate();
    
    ////

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
      adminUser: "",
      additionalInfo: ""
    };
    
    function onSubmit() {
      vm.formError = "";
      vm.credentials.adminUser = authentication.currentUserId();
      
      if (!vm.credentials.name || !vm.credentials.adminUser || !cm.credentials.additionalInfo) {
        vm.formError = "Täytä kaikki kentät";
        return false;
      } else {
        vm.doCreateTeam();
      }
    }
    
    function doCreateTeam() {
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
    }

  }

}());
