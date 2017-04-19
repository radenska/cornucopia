'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', '$window', 'profileService', 'picService', EditProfileController],
  controllerAs: 'editProfileCtrl',
  bindings: {
    profile: '<',
    onProfileUpdated: '&'
  }
};

function EditProfileController($log, $window, profileService, picService) {
  $log.debug('EditProfileController');

  this.pic = {};

  this.editProfile = function() {
    profileService.editProfile(this.profile._id, this.profile)
    .then( () => this.onProfileUpdated())
  };

  this.uploadProfilePic = function() {
    let location = $window.location;

    $log.debug('THIS PIC', this.pic);
    picService.uploadProfilePic(this.profile, this.pic)
    .then( () => {
      this.pic = null;
      location.reload(true);
    });
  };

  this.onProfileUpdated = function() {

  }
}
