'use strict';

require('./_loginbutton.scss');

module.exports = {
  template: require('./loginbutton.html'),
  controller: ['$log', '$location', 'authService', loginButtonController],
  controllerAs: 'loginButtonCtrl'
};

function loginButtonController($log, $location) {
  $log.debug('loginButtonController');

  this.goToLogin = function() {
    $log.debug('loginButtonCtrl.goToLogin');
    console.log('done');
    $location.url('/login');
  };
}
