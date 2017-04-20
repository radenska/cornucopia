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
    onCommentChange: '&',
  }
};

function CommentItemController($log, commentService, profileService){
  $log.debug('CommentItemController');
  this.showEditComment = false;

  this.deleteComment = function(comment){
    $log.debug('CommentItemController.deleteComment')
    commentService.deleteComment(comment)
    .then( () => this.onCommentChange());
  };

  this.commenter = function(profileID) {
    $log.debug('CommentItemController.commenter', profileID)

    profileService.fetchProfile2(profileID)
    .then(profile => this.commenter = profile);
  };

  this.updateCommentItemView = function() {
    $log.debug('CommentItemController.updateCommentItemView', this.comment);

    this.onCommentChange();
  };

}
