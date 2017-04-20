'use strict';

require('./_upload-pic.scss');

module.exports = {
  template: require('./upload-pic.html'),
  controller: [ '$log', 'picService', UploadPicController],
  controllerAs: 'uploadPicCtrl',
  bindings: {
    recipe: '<',
    onPicUploaded: '&'
  }
};

function UploadPicController($log, picService) {
  $log.debug('UploadPicController');

  this.pic = {};

  this.uploadPic = function() {
    picService.uploadRecipePic(this.recipe, this.pic)
    .then( () => {
      this.pic = null;
      this.onPicUploaded();
    });
  };
}
