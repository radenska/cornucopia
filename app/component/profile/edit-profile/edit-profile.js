'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', 'profileService', 'picService', EditProfileController],
  controllerAs: 'editProfileCtrl',
  bindings: {
    profile: '<',
    onProfileUpdated: '&'
  }
};


function EditProfileController($log, profileService, picService) {
  $log.debug('EditProfileController');

  this.pic = {};

  this.editProfile = function() {
    profileService.editProfile(this.profile._id, this.profile)
    .then( () => this.onProfileUpdated())
  };

  this.uploadProfilePic = function() {
    $log.debug('EditProfileController.uploadProfilePic');
    picService.uploadProfilePic(this.profile, this.pic)
    .then( () => this.onProfileUpdated())
    .then( () => this.pic = null);
  };

  this.onProfileUpdated = function() {
    
  }
}
