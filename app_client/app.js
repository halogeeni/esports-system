(function() {

  angular.module('washbear', ['ngResource', 'ngRoute']);

  function config($routeProvider) {
    // endpoints are declared here
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/form/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/user', {
        templateUrl: '/user/user.view.html',
        //controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/#/'
      });
  }

  angular
    .module('washbear')
    .config(['$routeProvider', config]);

})();
