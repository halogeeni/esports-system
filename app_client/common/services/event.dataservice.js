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
      getEvents: getEvents,
      getEventById: getEventById
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

    function getEventById(eventId) {
      var eventURL = baseURL + '/' + eventId;
      return $http.get(eventURL)
        .then(getEventComplete)
        .catch(getEventFailed);

      function getEventComplete(response) {
        return response.data;
      }

      function getEventFailed(error) {
        console.error('XHR Failed for getEventById.' + error.data);
      }
    }
  }
})();
