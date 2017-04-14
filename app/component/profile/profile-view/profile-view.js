'use strict';

require('./_profile-view.scss');

module.exports = {
  template: require('./profile-view.html'),
  controller: ['$log', '$rootscope', ProfileViewController],
  controllerAs: 'profileViewCtrl'
};

function ProfileViewController($log, $rootScope, profileService) {
  $log.debug('ProfileViewController');

  // add things here

  this.profiles = [];

  this.fetchProfiles = function() {
    profileService.fetchProfiles()
    .then( profiles => {
      this.profiles = profiles[0];
    });
  };

  this.deleteProfile = function(profile) {
    if (this.profile._id === profile._id) {
      this.profile = null;
    }
  };

  this.fetchProfiles();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchProfiles();
  });
};