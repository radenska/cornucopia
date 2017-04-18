'use strict';

require('./_edit-profile.scss');

module.exports = {
  template: require('./edit-profile.html'),
  controller: ['$log', 'profileService', 'picService', EditProfileController],
  controllerAs: 'editProfileCtrl'
};


function EditProfileController($log, profileService, picService) {
  $log.debug('EditProfileController');
  
  this.profile = {};
  this.pic = {};

  this.editProfile = function() {
    profileService.editProfile(this.profile._id, this.profile);
  };

  this.uploadProfilePic = function() {
    picService.uploadProfilePic(this.profile, this.pic)
    .then( () => {
      this.pic.file = null;
    });    
  };
}

