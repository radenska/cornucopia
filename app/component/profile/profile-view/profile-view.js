'use strict';

require('./_profile-view.scss');

module.exports = {
  template: require('./profile.html'),
  controller: ['$log', '$rootscope', ProfileViewController],
  controllerAs: 'profileviewCtrl'
};

function ProfileViewController($log, $rootscope, profileService) {
  $log.debug('ProfileViewController');

  // add things here
}