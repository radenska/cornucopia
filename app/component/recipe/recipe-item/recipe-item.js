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

  this.updateRecipeView = function(){
    $log.debug('RecipeItemController.updateRecipe');
    recipeService.fetchRecipe(this.recipe._id)
    .then( recipe => this.recipe = recipe)
    .then( recipe => recipe.comments.forEach(comment => { 
      return commentService.fetchComment(comment);
    }))
    .then( comment => this.commentArr.push(comment))
    .catch(err => $log.error(err.message));
  };
  
  this.updateRecipeView();


  this.deleteRecipe = function() {
    $log.debug('RecipeItemController.deleteRecipe');

    let profileID = this.recipe.profileID;

    recipeService.deleteRecipe(this.recipe._id)
    .then( () => this.onRecipeDeleted({}));

  };
}


