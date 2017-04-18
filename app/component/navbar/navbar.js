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
    $log.debug('NavbarController.checkPath()');

    let path = $location.path();

    if (path !== '/home') this.hideLogout = true;

    if (path === '/signin' || path === '/join') this.hideLandingBtns = true;

    if(path === '/join') {
      this.hideSignupBtn = true;
      this.hideLoginBtn = false;
    }

    if(path === '/signin') {
      this.hideLoginBtn = true;
      this.hideSignupBtn = false;
    }

    if (path === '/landing' || path === '/') this.hideLandingBtns = false;

    if (path === '/home') {
      // this.hideLandingBtns = true;
      this.hideLoginBtn = true;
      this.hideSignupBtn = true;
      this.hideLogout = false;
      authService.getToken()
      .catch( () => {
        $location.url('/signin');
        this.hideLogout = true;
      });
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => this.checkPath());

  this.logout = function() {
    $log.debug('NavbarController.logout()');

    this.hideLogout = true;
    this.hideLandingBtns = false;
    authService.logout()
    .then( () => $location.url('/'));
  };

}
