(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('userCtrl', userCtrl);

  userCtrl.$inject = ['$scope', '$routeParams', 'playerDataservice', 'authentication'];

  function userCtrl($scope, $routeParams, playerDataservice, authentication) {
    var vm = this;
    var playerId = $routeParams.id;

    vm.player = [];

    vm.credentials = {
      firstname: "",
      lastname: "",
      nickname: "",
      birthday: "",
      email: "",
      streetAddress: "",
      postalCode: "",
      city: "",
      country: "",
      phone: "",
      website: "",
      password: "",
      verifyPassword: ""
    };

    activate();

    function activate() {
      return getPlayer().then(function() {
        console.info('Activated Player View');
      });
    }

    function getPlayer() {
      return playerDataservice.getPlayerById(playerId).then(function(data) {
        vm.player = data;
        return vm.player;
      });
    }

    vm.isEditable = function() {
      return playerId === authentication.currentUserId();
    };

    vm.onSubmit = function() {
      vm.formError = "";
      if (!vm.credentials.firstname ||
          !vm.credentials.lastname ||
          !vm.credentials.nickname ||
          !vm.credentials.email ||
          !vm.credentials.birthday ||
          !vm.credentials.streetAddress ||
          !vm.credentials.postalCode ||
          !vm.credentials.city ||
          !vm.credentials.country ||
          !vm.credentials.phone ||
          !vm.credentials.website ||
          !vm.credentials.password  ||
          !vm.credentials.verifyPassword)
      {
        vm.formError = "Täytä kaikki kentät";
        return false;
      } else {
        //vm.doRegister();
      }
    };

    /* Implement update profile functionality

        vm.doRegister = function() {
          vm.formError = "";
          authentication
            .register(vm.credentials)
            .error(function(err) {
              vm.formError = err;
            })
            .then(function() {
              $location.search('page', null);
              $location.path(vm.returnPage);
            });
        };

    */

  }

}());
