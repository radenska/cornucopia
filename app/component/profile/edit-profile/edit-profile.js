'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', 'profileService', 'picService', EditProfileController],
  controllerAs: 'editProfileCtrl',
  bindings: {
    profile: '<'
  }
};


function EditProfileController($log, profileService, picService) {
  $log.debug('EditProfileController');

  this.pic = {};

  this.editProfile = function() {
    profileService.editProfile(this.profile._id, this.profile);
  };

  this.uploadProfilePic = function() {
    $log.debug('THIS PIC', this.pic);
    picService.uploadProfilePic(this.profile, this.pic)
    .then( () => {
      this.pic = null;
    });
  };
}
