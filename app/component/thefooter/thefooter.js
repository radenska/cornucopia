'use strict';

require('./_thefooter.scss');

module.exports = {
  template: require('./thefooter.html'),
  controller: ['$log', '$window', '$location', '$rootScope', 'authService', ThefooterController],
  controllerAs: 'thefooterCtrl'
};

function ThefooterController($log, $window, $location, $rootScope, authService) {
  $log.debug('ThefooterController');

  this.hideFooter = false;

  $rootScope.$on('$locationChangeSuccess', () => {
    let path = $location.url();

    if (path === '/signin' || path === '/join') this.hideFooter = true;
    if (path !== '/signin' && path !== '/join') this.hideFooter = false;

  });

}
