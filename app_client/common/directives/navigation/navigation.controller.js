(function () {
  angular
    .module('washbear')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'authentication'];
  
  function navigationCtrl($location, authentication) {

    var vm = this;

    vm.currentPath = $location.path();
    vm.currentUser = authentication.currentUser();
    vm.currentUserId = authentication.currentUserId();
    vm.isLoggedIn = authentication.isLoggedIn(); 
    vm.logout = logout;
    
    ////
    
    function logout() {
      authentication.logout();
      $location.path('/');
    }
    
    function HeaderController($scope, $location) { 
      vm.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
    }

  }
})();
