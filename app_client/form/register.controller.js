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

    vm.birthdayPartials = {
      birthdayDay: "",
      birthdayMonth: "",
      birthdayYear: "",
    }

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
      verifyPassword: "",
      agreesTOS: false,
      agreesRules: false
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function() {
      vm.formError = "";
      if (!vm.credentials.firstname ||
        !vm.credentials.lastname ||
        !vm.credentials.nickname ||
        !vm.credentials.email ||
        !vm.birthdayPartials.birthdayDay ||
        !vm.birthdayPartials.birthdayMonth ||
        !vm.birthdayPartials.birthdayYear ||
        !vm.credentials.streetAddress ||
        !vm.credentials.postalCode ||
        !vm.credentials.city ||
        !vm.credentials.country ||
        !vm.credentials.phone ||
        !vm.credentials.password  ||
        !vm.credentials.verifyPassword) {
        vm.formError = "Täytä kaikki kentät";
        return false;
      } else if (!vm.credentials.agreesTOS || !vm.credentials.agreesRules) {
        vm.formError= "Rekisteröityminen edellyttää käyttöehtojen ja sääntöjen hyväksymistä";
        return false;
      } else if (vm.credentials.password !== vm.credentials.verifyPassword) {
        vm.formError = "Salasanat eivät täsmää";
        return false;
      } else {
        vm.credentials.birthday = new Date(vm.birthdayPartials.birthdayYear,
            vm.birthdayPartials.birthdayMonth,
            vm.birthdayPartials.birthdayDay)
          .toISOString();
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
