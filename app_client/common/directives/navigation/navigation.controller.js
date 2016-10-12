(function () {
  angular
    .module('washbear')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$window', '$location', 'authentication'];

  function navigationCtrl($window, $location, authentication) {

    var vm = this;

    vm.currentPath = $location.path();
    vm.currentUser = authentication.currentUser();
    vm.currentUserId = authentication.currentUserId();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.logout = logout;

    function logout() {
      authentication.logout();
      if($location.path() !== '/') {
        $location.path('/');
      } else {
        $window.location.reload();
      }
    }

    /*function HeaderController($scope, $location) {
      vm.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
    }*/

  }
})();
