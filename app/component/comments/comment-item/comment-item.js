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
  console.log('this.comment', this.co);
  this.showEditComment = false;

  this.deleteComment = function(){
    commentService.deleteComment(this.comment);
  };

  this.fetchComment = () => {
    $log.debug('fetchComment');

    //todo

    commentService.fetchComment(this.comment)
    .then( comment => console.log('my comment', comment))
    .catch(err => console.log(err, '++++++++++'));
  };

  this.fetchComment();
}

