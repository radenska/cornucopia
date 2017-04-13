'use strict';

module.exports = {
  template: require('./create-comment.html'),
  controller: ['$log', 'commentService', createCommentController],
  controllerAs: 'createCommentCtrl',
  bindings: {
    recipe: '<'
  }
};

function createCommentController($log, commentService){
  $log.debug('createCommentController');

  this.comment = {};

  this.createComment = function(){
    commentService.createComment(this.recipe, this.comment)
    .then( () => {
      this.comment = null;
    });
  };
}