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
      .when('/user/:id', {
        templateUrl: '/user/user.view.html',
        controller: 'userCtrl',
        controllerAs: 'vm'
      })
      .when('/players', {
        templateUrl: '/players/players.view.html',
        controller: 'playersCtrl',
        controllerAs: 'vm'
      })
      .when('/leagues', {
        templateUrl: '/league/league.view.html',
        //controller: 'playersListCtrl',
        controllerAs: 'vm'
      })
      .when('/tournaments', {
        templateUrl: '/tournament/tournament.view.html',
        //controller: 'playersListCtrl',
        controllerAs: 'vm'
      })
      .when('/teams', {
        templateUrl: '/teams/teams.view.html',
        controller: 'teamsCtrl',
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
