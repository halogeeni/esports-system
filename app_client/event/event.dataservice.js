(function() {
  'use strict';

  angular
    .module('washbear')
    .factory('eventDataservice', eventDataservice);

  eventDataservice.$inject = ['$http', 'logger'];

  function eventDataservice($http, logger) {
    var baseURL = '/api/events';

    return {
      getEvents: getEvents
    };

    ////

    function getEvents() {
      return $http.get(baseURL)
        .then(getEventsComplete)
        .catch(getEventsFailed);

      function getEventsComplete(response) {
        return response.data.results;
      }

      function getEventsFailed(error) {
        logger.error('XHR Failed for getAvengers.' + error.data);
      }
    }

  }
})();