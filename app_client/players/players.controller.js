(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('playersCtrl', playersCtrl);

  playersCtrl.$inject = ['$scope', 'playerDataservice'];

  function playersCtrl($scope, playerDataservice) {

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
