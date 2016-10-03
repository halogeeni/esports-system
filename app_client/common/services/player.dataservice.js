(function() {
  'use strict';

  angular
    .module('washbear')
    .factory('playerDataservice', playerDataservice);

  playerDataservice.$inject = ['$http'];

  function playerDataservice($http) {
    
    var baseURL = '/api/users';
    
    ////
    
    return {
      getPlayers: getPlayers
    };
    
    ////

    function getPlayers() {
      return $http.get(baseURL)
        .then(getPlayersComplete)
        .catch(getPlayersFailed);

      function getPlayersComplete(response) {
        return response.data;
      }

      function getPlayersFailed(error) {
        console.error('XHR Failed for getPlayers.' + error.data);
      }
    }

  }
})();
