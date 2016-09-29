(function() {

  angular
    .module('Vidzy')
    .controller('deleteVideoCtrl', deleteVideoCtrl);

  deleteVideoCtrl.$inject = ['$scope', '$resource', '$location', '$routeParams', 'authentication'];

  function deleteVideoCtrl($scope, $resource, $location, $routeParams, authentication) {
    var vm = this;

    vm.Videos = $resource('/api/videos/:id', {
      id: '@_id'
    }, {
      delete: {
        method: 'DELETE',
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

    $scope.delete = function() {
      vm.Videos.delete({
        id: $routeParams.id
      }, function(video) {
        $location.path('/#/');
      });
    };
  }

})();