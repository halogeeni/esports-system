(function() {

  angular
    .module('washbear')
    .directive('adbannerLeft', adbannerLeft);

  function adbannerLeft() {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/ads/adbannerLeft/adbannerLeft.template.html'
    };
  }

})();
