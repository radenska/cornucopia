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
};