'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('NavbarController');

  this.goSignUp = function() {
    $log.debug('NavbarController.goSignUp()');

    $location.url('/join');
  };

  this.goLogin = function() {
    $log.debug('NavbarController.goLogin()');

    $location.url('/signin');
  };

  this.logout = function() {
    $log.debug('NavbarController.logout()');
    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };

  this.checkPath = () => {
    $log.debug('NavbarController.checkPath()');

    let pathArray = $location.path().split('/');
    let path = `/${pathArray[1]}`;

    $log.debug('LOCATION PATH', path);

    if (path === `/home`) {
      this.hideLoginBtn = true;
      this.hideSignupBtn = true;
      this.hideLogout = false;
    }

    if (path === '/join') {
      this.hideSignupBtn = true;
      this.hideLoginBtn = false;
      this.hideLogout = true;
    }

    if (path === '/signin') {
      this.hideLoginBtn = true;
      this.hideSignupBtn = false;
      this.hideLogout = true;
    }


    $log.debug('LOGIN BUTTON', this.hideLoginBtn);
    $log.debug('SIGNUP BUTTON', this.hideSignupBtn);
    $log.debug('LOGOUT BUTTON', this.hideLogout);

  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => this.checkPath());
}
