'use strict';

require('./_recipe-item.scss');

module.exports = {
  template: require('./recipe-item.html'),
  controller: ['$log', 'recipeService','commentService', RecipeItemController],
  controllerAs: 'recipeItemCtrl',
  bindings: {
    recipe: '<',
    onRecipeDeleted: '&',
    comment: '<'
  }
};



function RecipeItemController($log, recipeService, commentService) {
  $log.debug('RecipeItemController');

  this.commentArr = [];

  this.updateRecipeView = function(){
    $log.debug('RecipeItemController.updateRecipe');

    recipeService.fetchRecipe(this.recipe._id)
    .then( recipe => this.recipe = recipe.data)
    .then( () => {
      if (this.recipe.comments.length !== 0) {
        this.recipe.comments.forEach(commentID => {
          commentService.fetchComment(commentID)
          .then(commentObj => this.commentArr.push(commentObj))
        });
      }
    })
    .catch(err => $log.error(err.message));
  };

  this.$onChanges = function() {
    $log.debug('RecipeItemController.$onInit()');

    this.updateRecipeView();
  };
  // this.updateRecipeView();


  this.deleteRecipe = function() {
    $log.debug('RecipeItemController.deleteRecipe');

    let profileID = this.recipe.profileID;

    recipeService.deleteRecipe(this.recipe._id)
    .then( () => this.onRecipeDeleted({}));

  };
}
