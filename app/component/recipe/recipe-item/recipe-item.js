'use strict';

require('./_recipe-item.scss');

module.exports = {
  template: require('./recipe-item.html'),
  controller: ['$log', 'recipeService', RecipeItemController],
  controllerAs: 'recipeItemCtrl',
  bindings: {
    recipe: '<'
  }
};

function RecipeItemController($log, recipeService) {
  $log.debug('RecipeItemController');

  this.deleteRecipe = function() {
    $log.debug('RecipeItemController.deleteRecipe');

    let profileID = this.recipe.profileID;
    
    recipeService.deleteRecipe(this.recipe._id)
    .then( () => recipeService.fetchMyRecipes(profileID));
  };
}
