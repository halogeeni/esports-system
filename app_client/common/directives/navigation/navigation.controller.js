(function () {
  angular
    .module('washbear')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'authentication'];
  function navigationCtrl($location, authentication) {

    var vm = this;

    vm.currentPath = $location.path();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();
    vm.currentUserId = authentication.currentUserId();

    vm.logout = function() {
      authentication.logout();
      $location.path('/');
    };

  }
})();
