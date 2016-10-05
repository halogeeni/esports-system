(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('userCtrl', userCtrl);

  userCtrl.$inject = ['$scope', '$routeParams', 'playerDataservice'];

  function userCtrl($scope, $routeParams, playerDataservice) {

    var vm = this;

    var playerId = $routeParams.id;
    vm.player = [];

    activate();

    function activate() {
      return getPlayer().then(function() {
        console.info('Activated Player View');
      });
    }

    function getPlayer() {
      return playerDataservice.getPlayerById(playerId).then(function(data) {
        vm.player = data;
        return vm.player;
      });
    }
  }

}());
