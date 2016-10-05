(function() {
  'use strict';

  angular
    .module('washbear')
    .factory('playerDataservice', playerDataservice);

  playerDataservice.$inject = ['$http', '$filter'];

  function playerDataservice($http, $filter) {

    var baseURL = '/api/users';

    ////

    return {
      getPlayers: getPlayers,
      getPlayerById: getPlayerById,
      getPlayerByNickname: getPlayerByNickname
    };

    ////

    function getPlayerById(id) {
      var userURL = (baseURL + '/' + id);
      return $http.get(userURL)
        .then(getPlayerByIdComplete)
        .catch(getPlayerByIdFailed);

      function getPlayerByIdComplete(response) {
        return response.data;
      }

      function getPlayerByIdFailed(error) {
        console.error('XHR Failed for getPlayerById.' + error.data);
      }
    }

    function getPlayerByNickname(nick) {
      return $http.get(baseURL)
        .then(getPlayerByNicknameComplete)
        .catch(getPlayerByNicknameFailed);

      function getPlayerByNicknameComplete(response) {
        return $filter('filter')(response, { nickname : nick }, false);
      }

      function getPlayerByNicknameFailed(error) {
        console.error('XHR Failed for getPlayerByNickname.' + error.data);
      }
    }

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
