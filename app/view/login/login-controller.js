'use strict';

require('./_login.scss');

module.exports = ['$log', '$location', 'authService', 'profileService', LoginController];

function LoginController($log, $location, authService, profileService) {
  $log.debug('LoginController');

  this.myProfile = {};

  this.login = function() {
    $log.debug('loginCtrl.login');

    authService.login(this.user)
    .then(user => {
      $log.debug('USER', user);
      $location.url(`/home/${user.userinfo._id}`);
    });
  };
}
