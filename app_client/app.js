(function() {

    angular.module('Vidzy', ['ngResource', 'ngRoute']);

    function config($routeProvider) {
        // endpoints are declared here
        $routeProvider
            .when('/', {
                templateUrl: '/home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/add-video', {
                templateUrl: '/form/video-form.view.html',
                controller: 'addVideoCtrl',
                controllerAs: 'vm'
            })
            .when('/video/:id', {
                templateUrl: '/form/video-form.view.html',
                controller: 'editVideoCtrl',
                controllerAs: 'vm'
            })
            .when('/video/delete/:id', {
                templateUrl: '/delete/video-delete.view.html',
                controller: 'deleteVideoCtrl',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: '/auth/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    angular
        .module('Vidzy')
        .config(['$routeProvider', config]);

})();
