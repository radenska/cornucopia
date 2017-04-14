'use strict';

module.exports = {
  template: require('./create-comment.html'),
  controller: ['$log', 'commentService', CreateCommentController],
  controllerAs: 'createCommentCtrl',
  bindings: {
    recipe: '<'
  }
};

function CreateCommentController($log, commentService){
  $log.debug('createCommentController');

  this.comment = {};

  this.createComment = function(){
    commentService.createComment(this.recipe, this.comment)
    .then( () => {
      this.comment = null;
    });
  };
}