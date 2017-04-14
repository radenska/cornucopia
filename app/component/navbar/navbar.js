'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('NavbarController');

  this.checkPath = function() {
    $log.debug('NavbarController.checkPath');
    let path = $location.path();
    if (path === '/join') this.hideBtn = true;
    if (path !== '/join') this.hideBtn = false;

    authService.getToken()
    .catch( () => $location.url('/join#login'));
  };

  this.checkPath();
  $rootScope.$on('$locationChangeSuccess', () => this.checkPath());

  this.logout = function() {
    $log.debug('NavbarController.logout');
    this.hideBtn = true;
    authService.logout()
    .then( () => $location.url('/'));
  };
}
