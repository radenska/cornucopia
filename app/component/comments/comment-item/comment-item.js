'use strict';

require('./_comment-item.scss');

module.exports = {
  template: require('./comment-item.html'),
  controller: ['$log', 'commentService', CommentItemController],
  controllerAs: 'commentItemCtrl',
  bindings: {
    comment: '<'
  }
};

function CommentItemController($log, commentService){
  $log.debug('CommentItemController');
  this.showEditComment = false;

  this.deleteComment = function(){
    commentService.deleteComment(this.comment);
  };

  
  // this.fetchComment();
}

