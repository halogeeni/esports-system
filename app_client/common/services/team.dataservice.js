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
      addPlayer: addPlayer,
      getTeam: getTeam,
      getTeams: getTeams,
      getTeamByName: getTeamByName,
      removePlayer: removePlayer
    };
    
    ////
    
    function addPlayer(playerId) {
      var teamURL = (baseURL + '/addPlayer/' + playerId);
      
      return $http.post(teamURL)
        .then(addPlayerComplete)
        .catch(addPlayerFailed);

      function addPlayerComplete(response) {
        return response.data;
      }

      function addPlayerFailed(error) {
        console.error('XHR Failed for addPlayer.' + error.data);
      }
    }
    
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
    
    function removePlayer(playerId) {
      var teamURL = (baseURL + '/removePlayer/' + playerId);
      
      return $http.delete(teamURL)
        .then(removePlayerComplete)
        .catch(removePlayerFailed);

      function removePlayerComplete(response) {
        return response.data;
      }

      function removePlayerFailed(error) {
        console.error('XHR Failed for removePlayer.' + error.data);
      }
    }

  }
})();
