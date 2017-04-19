'use strict';

require('./_profile-view.scss');

module.exports = {
  template: require('./profile-view.html'),
  controller: ['$log', '$rootScope', 'profileService', ProfileViewController],
  controllerAs: 'profileViewCtrl',
  bindings: {
    profile: '<',
  }
};

function ProfileViewController($log, $rootScope, profileService) {
  $log.debug('ProfileViewController');

  this.profiles = [];
  this.profile = {};
  this.showEditView = false;

  // this.fetchProfiles = function() {
  //   $log.debug('ProfileViewController.fetchProfiles()');
  //
  //   profileService.fetchProfiles()
  //   .then( profiles => {
  //     this.profiles = profiles;
  //   });
  // };
  //
  // this.fetchProfiles();

  this.deleteProfile = function(profile) {
    if (this.profile._id === profile._id) {
      this.profile = null;
    }
  };

  this.updateProfileView = function() {
    $log.debug('ProfileViewController.updateProfileView()');

    profileService.fetchProfile(this.profile.userID)
    .then(profile => {
      this.myProfile = profile;
      this.showEditView = false;
    })
  };
};
