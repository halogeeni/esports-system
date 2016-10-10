(function() {
  'use strict';

  angular
    .module('washbear')
    .factory('gameDataservice', gameDataservice);

  gameDataservice.$inject = ['$http'];

  function gameDataservice($http) {

    var baseURL = '/api/games';

    ////

    return {
      getGames: getGames,
      getGameById: getGameById
    };

    ////

    function getGames() {
      return $http.get(baseURL)
        .then(getEventsComplete)
        .catch(getEventsFailed);

      function getEventsComplete(response) {
        return response.data;
      }

      function getEventsFailed(error) {
        console.error('XHR Failed for getGames.' + error.data);
      }
    }

    function getGameById(gameId) {
      var gameURL = baseURL + '/' + gameId;
      return $http.get(gameURL)
        .then(getGameComplete)
        .catch(getGameFailed);

      function getGameComplete(response) {
        return response.data;
      }

      function getGameFailed(error) {
        console.error('XHR Failed for getGameById.' + error.data);
      }
    }
  }
})();
