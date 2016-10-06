(function() {
  'use strict';

  angular
    .module('washbear')
    .controller('userCtrl', userCtrl);

  userCtrl.$inject = ['$scope', '$routeParams', '$location', 'playerDataservice', 'authentication'];

  function userCtrl($scope, $routeParams, $location, playerDataservice, authentication) {
    var vm = this;
    var playerId = $routeParams.id;

    vm.player = [];

    vm.credentials = {
      firstname: "",
      lastname: "",
      nickname: "",
      birthday: "",
      email: "",
      additionalInfo: "",
      streetAddress: "",
      postalCode: "",
      city: "",
      country: "",
      phone: "",
      website: ""/*,
      password: "",
      verifyPassword: ""*/
    };

    activate();

    function activate() {
      return getPlayer().then(function() {
        if(vm.isEditable()) {
          // populate credentials in order to prefill the form
          vm.credentials.firstname = vm.player.firstname;
          vm.credentials.lastname = vm.player.lastname;
          vm.credentials.nickname = vm.player.nickname;
          vm.credentials.additionalInfo = vm.player.additionalInfo;
          vm.credentials.birthday = vm.player.birthday;
          vm.credentials.email = vm.player._contactInfo.email;
          vm.credentials.streetAddress = vm.player._contactInfo.streetAddress;
          vm.credentials.postalCode = vm.player._contactInfo.postalCode;
          vm.credentials.city = vm.player._contactInfo.city;
          vm.credentials.country = vm.player._contactInfo.country;
          vm.credentials.phone = vm.player._contactInfo.phone;
          vm.credentials.website = vm.player._contactInfo.website;
        }
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
          !vm.credentials.website /*||
          !vm.credentials.password  ||
          !vm.credentials.verifyPassword*/)
      {
        // debug
        console.log(vm.credentials);

        vm.formError = "Täytä kaikki kentät";
        return false;
      } else {
        vm.doUpdate();
      }
    };

    vm.doUpdate = function() {
      vm.formError = "";
      authentication
        .update(playerId, vm.credentials)
        .error(function(err) {
          vm.formError = err;
        })
        .then(function() {
          $location.search('page', null);
          $location.path(vm.returnPage);
        });
    };
  }

}());
