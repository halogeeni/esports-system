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
      getTeam: getTeam,
      getTeams: getTeams,
      getTeamByName: getTeamByName
    };
    
    ////
    
    function getTeam(id) {
      var teamURL = (baseURL + '/' + id);
      return $http.get(teamURL)
        .then(getTeamComplete)
        .catch(getTeamFailed);

      function getTeamComplete(response) {
        return response.data;
      }

      function getTeamFailed(error) {
        console.error('XHR Failed for getTeam.' + error.data);
      }
    }
    
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

    function getTeamByName(name) {
      return $http.get(baseURL)
        .then(getTeamByNameComplete)
        .catch(getTeamByNameFailed);

      function getTeamByNameComplete(response) {
        return $filter('filter')(response, { name : name }, false);
      }

      function getTeamByNameFailed(error) {
        console.error('XHR Failed for getTeamByName.' + error.data);
      }
    }

  }
})();
