(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('eventCtrl', eventCtrl);

  eventCtrl.$inject = ['$scope', '$routeParams', 'eventDataservice', 'gameDataservice'];

  function eventCtrl($scope, $routeParams, eventDataservice, gameDataservice) {

    var vm = this;

    vm.event = [];
    vm.eventId = $routeParams.id;

    ////

    activate();

    ////

    function activate() {
      vm.games = gameDataservice.getGames;
      return getEvent().then(function() {
        console.info('Activated Events View');
      });
    }

    function getEvent() {
      return eventDataservice.getEventById(vm.eventId).then(function(data) {
        vm.event = data;
        return vm.event;
      });
    }

  }

}());
