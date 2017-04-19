'use strict';

require('./_recipe-item.scss');

module.exports = {
  template: require('./recipe-item.html'),
  controller: ['$log', 'recipeService', RecipeItemController],
  controllerAs: 'recipeItemCtrl',
  bindings: {
    recipe: '<',
    onRecipeDeleted: '&'
  }
};



function RecipeItemController($log, recipeService) {
  $log.debug('RecipeItemController');

  this.updateRecipeView = function(){
    $log.debug('RecipeItemController.updateRecipe');
    recipeService.fetchRecipe(this.recipe._id)
    .then( recipe => {
      console.log('@#$%^&*()@#$%^&*#$%^&*', recipe);
      return this.recipe = recipe;
    });
  };

  this.deleteRecipe = function() {
    $log.debug('RecipeItemController.deleteRecipe');

    let profileID = this.recipe.profileID;

    recipeService.deleteRecipe(this.recipe._id)
    .then( () => this.onRecipeDeleted({}));

  };
}
