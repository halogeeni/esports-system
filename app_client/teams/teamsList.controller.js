(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('teamsListCtrl', teamsListCtrl);

  teamsListCtrl.$inject = ['$scope', 'teamDataservice'];

  function teamsListCtrl($scope, teamDataservice) {
    
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

  }

}());
