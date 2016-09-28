(function() {

  angular
    .module('washbear')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];

  function registerCtrl($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Uusi pelaajatili'
    };

    vm.credentials = {
      firstname: "",
      lastname: "",
      nickname: "",
      /*birthday: "",*/
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

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function() {
      vm.formError = "";
      if (!vm.credentials.firstname ||
          !vm.credentials.lastname ||
          !vm.credentials.nickname ||
          !vm.credentials.email ||
          /* !vm.credentials.birthday */
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
        vm.doRegister();
      }
    };

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

  }

})();
