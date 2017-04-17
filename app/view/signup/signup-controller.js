'use strict';

require('./_signup.scss');

module.exports = ['$log', '$location', 'authService', 'profileService', SignupController];

function SignupController($log, $location, authService, profileService) {
  $log.debug('SignupController');

  // authService.getToken()
  // .then( () => {
  //   $location.url('/home');
  // });

  this.signup = function(user) {
    $log.debug('signupCtrl.signup');

    authService.signup(user)
    .then(user => {
      let profile = {};
      profile.name = user.username;
      profileService.createProfile(profile)
      .then(profile => $location.url(`/home/:${profile.userID}` ));
    });
  };
}
