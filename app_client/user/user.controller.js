(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('playersListCtrl', playersListCtrl);

  playersListCtrl.$inject = ['$scope', 'playerDataservice'];

  function playersListCtrl($scope, playerDataservice) {

    var vm = this;

    vm.players = [];

    activate();

    function activate() {
      return getPlayers().then(function() {
        console.info('Activated Players View');
      });
    }

    function getPlayers() {
      return playerDataservice.getPlayers().then(function(data) {
        vm.players = data;
        return vm.players;
      });
    }

  }

}());
