'use strict';

require('./_login.scss');

module.exports = ['$log', '$location', 'authService', 'profileService', LoginController];

function LoginController($log, $location, authService, profileService) {
  $log.debug('LoginController');

  this.profile = {};

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.login = function() {
    $log.debug('loginCtrl.login');

    authService.login(this.user)
    .then(user => {
      $log.debug('USER', user);
      $location.url('/home');
      profileService.fetchProfiles()
      .then(profiles => $log.debug('THE PROFILES YO', profiles));
    });
  };
}
