// controller wrapped in anonymous function
// to isolate the code from global scope

(function() {

    angular
        .module('Vidzy')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$resource', '$location', 'authentication'];

    function homeCtrl($scope, $resource, $location, authentication) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.logout = function() {
            authentication.logout();
            $location.path('/#/');
        };

        vm.Videos = $resource('/api/videos');
        vm.Videos.query(function(videos) {
            $scope.videos = videos;
        });
    }

})();
