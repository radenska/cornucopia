'use strict';

require('./_comment-item.scss');

module.exports = {
  template: require('./comment-item.html'),
  controller: ['$log', 'commentService', 'profileService', CommentItemController],
  controllerAs: 'commentItemCtrl',
  bindings: {
    comment: '<',
    loggedIn: '<',
    profile: '<',
    onCommentDeleted: '&',
  }
};

function CommentItemController($log, commentService, profileService){
  $log.debug('CommentItemController');
  this.showEditComment = false;

  this.deleteComment = function(comment){
    $log.debug('CommentItemController.deleteComment')
    commentService.deleteComment(comment);
  };

  this.commenter = function(profileID) {
    $log.debug('CommentItemController.commenter', profileID)

    profileService.fetchProfile2(profileID)
    .then(profile => this.commenter = profile);
  };

  this.$onChanges = function() {
    $log.debug('CommentItemController.$onChanges()', this.comment);

    this.commenter(this.comment.commenterProfileID);
    commentService.fetchComment(this.comment._id);
  };

}
