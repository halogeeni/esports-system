(function() {

  angular
    .module('Vidzy')
    .controller('editVideoCtrl', editVideoCtrl);

  editVideoCtrl.$inject = ['$scope', '$resource', '$location', '$routeParams', 'authentication'];

  function editVideoCtrl($scope, $resource, $location, $routeParams, authentication) {

    // this is stored here to be used as example code for auth-enabled requests

    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.Videos = $resource('/api/videos/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + authentication.getToken()
        }
      }
    });

    vm.Videos.get({
      id: $routeParams.id
    }, function(video) {
      $scope.video = video;
    });

    $scope.save = function() {
      vm.Videos.update($scope.video, function() {
        $location.path('/');
      });
    };
  }

})();
