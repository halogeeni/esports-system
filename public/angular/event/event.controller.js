(function() {
  'use strict';

  angular.module('bfpdb').controller('EventController', EventController);

  EventController.$inject = ['$scope', '$http', 'eventDataservice'];

  function EventController($scope, $http, eventDataservice) {

    var vm = this;

    vm.events = eventDataservice.getEvents;

    ////

    // UNDER CONSTRUCTION! :>

    ////

  }

}());