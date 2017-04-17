'use strict';

require('./_login.scss');

module.exports = ['$log', '$location', 'authService', 'profileService', LoginController];

function LoginController($log, $location, authService) {
  $log.debug('LoginController');

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.login = function() {
    $log.debug('loginCtrl.login');

    authService.login(this.user)
    .then(user => {
      $location.url('/home');
    });
  };
}
