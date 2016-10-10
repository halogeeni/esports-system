(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('teamsCtrl', teamsCtrl);

  teamsCtrl.$inject = ['$scope', '$location', 'teamDataservice', 'authentication'];

  function teamsCtrl($scope, $location, teamDataservice, authentication) {
    var vm = this;

    vm.teams = [];

    vm.credentials = {
      name: "",
      adminUser: "",
      additionalInfo: ""
    };

    //vm.returnPage = $location.search().page || '/';

    var isLoggedIn = authentication.isLoggedIn();

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

    vm.onSubmit = function onSubmit() {
      vm.formError = "";
      vm.credentials.adminUser = authentication.currentUserId();

      if (!vm.credentials.name || !vm.credentials.adminUser || !vm.credentials.additionalInfo) {
        vm.formError = "Täytä kaikki kentät";
        return false;
      } else {
        vm.doCreateTeam();
      }
    }

    vm.doCreateTeam = function() {
      vm.formError = "";
      teamDataservice
        .createTeam(vm.credentials)
        .error(function(err) {
          vm.formError = err;
        })
        .then(function() {
          /*$location.search('page', null);
          $location.path('/teams');*/
          activate();
        });
    };

  }

})();
