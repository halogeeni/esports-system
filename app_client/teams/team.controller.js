(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('teamCtrl', teamCtrl);

  teamCtrl.$inject = ['$scope', '$routeParams', 'teamDataservice', 'authentication'];

  function teamCtrl($scope, $routeParams, teamDataservice, authentication) {
    
    var vm = this;
    
    var teamId = $routeParams.id;
    
    ////

    activate();
    
    ////

    function activate() {
      return getTeam().then(function() {
        console.info('Activated Team View');
      });
    }

    function getTeam() {
      return teamDataservice.getTeam(teamId).then(function(data) {
        vm.team = data;
        return vm.team = data;
      });
    }

  }

}());
