(function() {
  'use strict';

  angular
    .module('washbear')
    .factory('teamDataservice', teamDataservice);

  teamDataservice.$inject = ['$http'];

  function teamDataservice($http) {

    var baseURL = '/api/teams';

    ////

    return {
      getTeams: getTeams
    };

    ////

    function getTeams() {
      return $http.get(baseURL)
        .then(getTeamsComplete)
        .catch(getTeamsFailed);

      function getTeamsComplete(response) {
        return response.data;
      }

      function getTeamsFailed(error) {
        console.error('XHR Failed for getTeams.' + error.data);
      }
    }

  }
})();
