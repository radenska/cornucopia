'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('NavbarController');

  this.hideLoginBtn = false;
  this.hideSignupBtn = false;
  this.hideLogout = true;

  this.goSignUp = function() {
    $log.debug('NavbarController.goSignUp()');

    $location.url('/join');
  };

  this.goLogin = function() {
    $log.debug('NavbarController.goLogin()');

    $location.url('/signin');
  };

  this.logout = () => {
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
    if (pathArray.length === 1) path = '/';

    if (path === '/' || path === '/landing') {
      this.hideLoginBtn = false;
      this.hideSignupBtn = false;
      this.hideLogout = true;
      this.hideMyRecipesBtn = true;
    }

    if (path === `/home`) {
      this.hideLoginBtn = true;
      this.hideSignupBtn = true;
      this.hideLogout = false;
      this.hideMyRecipesBtn = false;
    }

    if (path === '/join') {
      this.hideSignupBtn = true;
      this.hideLoginBtn = false;
      this.hideLogout = true;
      this.hideMyRecipesBtn = true;
    }

    if (path === '/signin') {
      this.hideLoginBtn = true;
      this.hideSignupBtn = false;
      this.hideLogout = true;
      this.hideMyRecipesBtn = true;
    }

  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => this.checkPath());
}
