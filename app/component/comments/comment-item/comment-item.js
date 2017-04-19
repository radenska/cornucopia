'use strict';

require('./_comment-item.scss');

module.exports = {
  template: require('./comment-item.html'),
  controller: ['$log', 'commentService', CommentItemController],
  controllerAs: 'commentItemCtrl',
  bindings: {
    commentID: '<'
  }
};

function CommentItemController($log, commentService){
  $log.debug('CommentItemController');
  this.showEditComment = false;

  this.deleteComment = function(){
    commentService.deleteComment(this.comment);
  };

  this.fetchComment = () => {
    $log.debug('fetchComment');

    //todo

    commentService.fetchComment(this.comment)
    .then( res => console.log('my comment', res.comment.comment))
    .catch(err => console.log(err, '++++++++++'));
  };

  this.fetchComment();
}

