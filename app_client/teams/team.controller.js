(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('teamCtrl', teamCtrl);

  teamCtrl.$inject = ['$scope', '$routeParams', 'authentication', 'playerDataservice', 'teamDataservice'];

  function teamCtrl($scope, $routeParams,  authentication, playerDataservice, teamDataservice) {
    
    var vm = this;
    
    var teamId = $routeParams.id;
    vm.joinTeam = joinTeam;
    vm.leaveTeam = leaveTeam;
    
    ////

    activate();
    
    ////

    function activate() {
      return getTeam().then(function() {
        getCaptain();
        console.info('Activated Team View');
      });
      
      function getTeam() {
        return teamDataservice.getTeam(teamId).then(function(data) {
          vm.team = data;
          return vm.team;
        });
      }

      function getCaptain() {
        return playerDataservice.getPlayerById(vm.team._adminUser).then(function(data) {
          vm.team.captain = data;
          return vm.team;
        });
      }
    }
    
    function joinTeam() {
      teamDataservice.addPlayer(loggedInUser());
    }
    
    function leaveTeam() {
      teamDataservice.removePlayer(loggedInUser());
    }
    
    function loggedInUser() {
      return authentication.currentUserId();
    }

  }
}());
