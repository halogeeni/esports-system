(function () {

  angular
    .module('washbear')
    .directive('footerGeneric', footerGeneric);
  function footerGeneric () {
    return {
      restrict: 'EA',
      templateUrl: '/common/directives/footer/footerGeneric.template.html'
    };
   }

})();
