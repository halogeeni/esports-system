(function() {

  angular
    .module('Vidzy')
    .controller('addVideoCtrl', addVideoCtrl);

  addVideoCtrl.$inject = ['$scope', '$resource', '$location', 'authentication'];

  function addVideoCtrl($scope, $resource, $location, authentication) {
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