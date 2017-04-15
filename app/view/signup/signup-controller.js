'use strict';

require('./_signup.scss');

module.exports = ['$log', '$location', 'authService', SignupController];

function SignupController($log, $location, authService) {
  $log.debug('SignupController');

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.signup = function(user) {
    $log.debug('signupCtrl.signup');

    authService.signup(user)
    .then( () => {
      $location.url('/home');
    });
  };
}
