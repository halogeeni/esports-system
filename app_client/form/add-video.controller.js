(function() {

  angular
    .module('Vidzy')
    .controller('addVideoCtrl', addVideoCtrl);

  addVideoCtrl.$inject = ['$scope', '$resource', '$location', 'authentication'];

  function addVideoCtrl($scope, $resource, $location, authentication) {

    // this is stored here to be used as example code for auth-enabled requests

    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.Videos = $resource('/api/videos', null, {
      save: {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + authentication.getToken()
        }
      }
    });

    $scope.save = function() {
      vm.Videos.save($scope.video, function() {
        $location.path('/');
      });
    };
  }

})();
