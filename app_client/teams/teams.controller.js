(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('teamsCtrl', teamsCtrl);

  teamsCtrl.$inject = ['$scope', '$window', 'teamDataservice', 'authentication'];

  function teamsCtrl($scope, $window, teamDataservice, authentication) {

    var vm = this;

    vm.createTeam = createTeam;
    vm.credentials = {};
    vm.isLoggedIn = authentication.isLoggedIn;
    vm.teams = [];

    ////

    activate();

    ////

    function activate() {
      return getTeams().then(function() {
        vm.credentials = {
          name: "",
          adminUser: "",
          additionalInfo: ""
        };

        console.info('Activated Teams View');
      });
    }

    function createTeam() {
      console.log('createTeam');
      vm.formError = "";
      vm.credentials.adminUser = authentication.currentUserId();

      if (!vm.credentials.name || !vm.credentials.adminUser || !vm.credentials.additionalInfo) {
        vm.formError = "Täytä kaikki kentät";
        return false;
      } else {
        vm.formError = "";
        teamDataservice.createTeam(vm.credentials).error(function(err) {
          vm.formError = err;
        }).then(function() {
          // quick and dirty fix to close the modal
          $window.location.reload();
        });
      }
    }

    function getTeams() {
      return teamDataservice.getTeams().then(function(data) {
        vm.teams = data;
        return vm.teams;
      });
    }

  }

})();
