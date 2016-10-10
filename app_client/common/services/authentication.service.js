(function() {

  angular
    .module('washbear')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];

  function authentication($http, $window) {

    var saveToken = function(token) {
      $window.localStorage['washbear-token'] = token;
    };

    var getToken = function() {
      return $window.localStorage['washbear-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.nickname;
      }
    };

    var currentUserId = function() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload._id;
      }
    };

    register = function(user) {
      return $http.post('/api/users', user).success(function(data) {
        //saveToken(data.token);
      });
    };

    update = function(userId, user) {
      var url = ('/api/users/' + userId);
      var currentUser = currentUserId();
      // quick check to see if currently logged in user is in fact the one to update
      if(currentUser === userId) {
        return $http.put(url, user).success(function(data) {
          // should we do something here? :D
        });
      }
    };

    login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    logout = function() {
      $window.localStorage.removeItem('washbear-token');
    };

    return {
      currentUser: currentUser,
      currentUserId: currentUserId,
      saveToken: saveToken,
      getToken: getToken,
      isLoggedIn: isLoggedIn,
      register: register,
      update: update,
      login: login,
      logout: logout
    };
  }

})();
