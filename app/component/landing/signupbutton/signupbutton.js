'use strict';

require('./_signupbutton.scss');

module.exports = {
  template: require('./signupbutton.html'),
  controller: ['$log', '$location', 'authService', SignupButtonController],
  controllerAs: 'signupButtonCtrl'
};

function SignupButtonController($log, $location) {
  $log.debug('SignupController');

  this.goToSignup = function() {
    $log.debug('signupButtonCtrl.signup');
    console.log('done');
    $location.url('/test');
  };
}
