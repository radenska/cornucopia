'use strict';

require('./_profile-view.scss');

module.exports = {
  template: require('./profile-view.html'),
  controller: ['$log', '$rootScope', 'profileService', ProfileViewController],
  controllerAs: 'profileViewCtrl',
  bindings: {
    profile: '<'
  }
};

function ProfileViewController($log, $rootScope, profileService) {
  $log.debug('ProfileViewController');

  this.profiles = [];
  this.profile = {};

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

};
