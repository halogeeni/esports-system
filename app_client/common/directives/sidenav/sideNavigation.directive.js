(function() {

  angular
    .module('washbear')
    .directive('sideNavigation', sideNavigation);

  function sideNavigation() {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/sidenav/sideNavigation.template.html'
    };
  }

})();
