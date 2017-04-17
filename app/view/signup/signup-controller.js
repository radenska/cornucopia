'use strict';

require('./_signup.scss');

module.exports = ['$log', '$location', 'authService', 'profileService', SignupController];

function SignupController($log, $location, authService, profileService) {
  $log.debug('SignupController');

  this.myProfile = {};

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.signup = function(user) {
    $log.debug('signupCtrl.signup');

    authService.signup(user)
    .then(res => {
      $location.url('/home');
      let profile = {};
      profile.name = user.username;
      profileService.createProfile(profile)
      .then(profile => {
        $log.debug('My Profile', profile);
        this.myProfile = profile;
      });
    });
  };
}
