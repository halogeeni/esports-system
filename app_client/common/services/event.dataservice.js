(function() {
  'use strict';

  angular
    .module('washbear')
    .factory('eventDataservice', eventDataservice);

  eventDataservice.$inject = ['$http'];

  function eventDataservice($http) {
    
    var baseURL = '/api/events';
    
    ////

    return {
      getEvents: getEvents
    };

    ////

    function getEvents() {
      return $http.get(baseURL)
        .then(getEventsComplete)
        .catch(getEventsFailed);

      function getEventsComplete(response) {
        return response.data;
      }

      function getEventsFailed(error) {
        console.error('XHR Failed for getEvents.' + error.data);
      }
    }

  }
})();
