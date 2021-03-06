(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('teamCtrl', teamCtrl);

  teamCtrl.$inject = ['$scope', '$routeParams', 'authentication', 'playerDataservice', 'teamDataservice'];

  function teamCtrl($scope, $routeParams, authentication, playerDataservice, teamDataservice) {

    var vm = this;

    var teamId = $routeParams.id;

    vm.joinTeam = joinTeam;
    vm.leaveTeam = leaveTeam;

    vm.isLoggedIn = authentication.isLoggedIn();

    ////

    activate();

    ////

    function activate() {
      return getTeam().then(function() {
        // this variable must be post activation!
        vm.userAlreadyInTeam = userAlreadyInTeam;
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
      teamDataservice.addPlayer(loggedInUser(), vm.team._id)
        .then(function() {
          activate();
        }
      );
    }

    function leaveTeam() {
      teamDataservice.removePlayer(loggedInUser(), vm.team._id)
        .then(function() {
          activate();
      });
    }

    function loggedInUser() {
      return authentication.currentUserId();
    }

    function userAlreadyInTeam() {
      for (var i = 0; i < vm.team.players.length; i++) {
        if (vm.team.players[i]._id === loggedInUser()) {
          console.log('User found.');
          return true;
        }
      }
      console.log('User NOT found.');
      return false;
    }
  }

})();
