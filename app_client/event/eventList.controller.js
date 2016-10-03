(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('eventListCtrl', eventListCtrl);

  eventListCtrl.$inject = ['$scope', 'eventDataservice'];

  function eventListCtrl($scope, eventDataservice) {
    
    var vm = this;
    
    vm.events = [];
    
    ////

    activate();

    ////
    
    function activate() {
      return getEvents().then(function() {
        console.info('Activated Events View');
      });
    }

    function getEvents() {
      console.info('getEvents');
      return eventDataservice.getEvents().then(function(data) {
        vm.events = data;
        return vm.events;
      });
    }

  }

}());
