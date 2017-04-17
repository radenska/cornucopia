'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', 'profileService', EditProfileController],
  controllerAs: 'editProfileCtrl'
};

function EditProfileController($log, profileService) {
  $log.debug('EditProfileController');

  this.editProfile = function() {
    $log.debug('editProfileCtrl.editProfile');

    profileService.editProfile(this.profile._id, this.profile);
  };
}

function UploadProfilePicController($log, profileService) {
  $log.debug('UploadProfilePicController');

  this.pic = {};

  this.uploadProfilePic = function() {
    $log.debug('uploadProfilePic.editProfile');
    profileService.uploadProfilePic(this.profile, this.pic)
    .then( () => {
      this.pic.file = null;
    });    
  };
}