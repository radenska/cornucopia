'use strict';

require('./_signup.scss');

module.exports = ['$log', '$location', 'authService', 'profileService', SignupController];

function SignupController($log, $location, authService, profileService) {
  $log.debug('SignupController');

  this.signup = function(user) {
    $log.debug('signupCtrl.signup');

    authService.signup(user)
    .then(user => {
      $log.debug('USERRRRRRRRRRRRRR', user);
      let profile = {};
      profile.name = user.username;
      profileService.createProfile(profile)
      .then(profile => $location.url(`/home/${profile.userID}` ));
    });
  };
}
