'use strict';

require('./_signup.scss');

module.exports = ['$log', '$window', '$location', 'authService', 'profileService', SignupController];

function SignupController($log, $window, $location, authService, profileService) {
  $log.debug('SignupController');

  this.signup = function(user) {
    $log.debug('signupCtrl.signup');

    authService.signup(user)
    .then(res => {
      let profile = {};
      profile.name = res.config.data.username;
      profileService.createProfile(profile)
      .then(profile => {
        $window.localStorage.setItem('userID', profile.userID)
        $location.url(`/home/${profile.userID}` );
      });
    });
  };
}
