'use strict';

module.exports = {
  template: require('./edit-comment.html'),
  controller: ['$log', 'commentService', EditCommentController],
  controllerAs: 'editCommentCtrl',
  bindings: {
    comment: '<'
  }
};


function EditCommentController($log, commentService){
  $log.debug('EditCommentController');

  this.editComment = function(){
    commentService.updateComment(this.comment._id, this.comment);
  };
}