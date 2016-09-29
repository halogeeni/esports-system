(function() {

  angular
    .module('washbear')
    .directive('notification', notification);

  function notification() {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/notification/notification.template.html'
    };
  }

})();
