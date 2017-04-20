'use strict';

require('./_create-recipe.scss');

module.exports = {
  template: require('./create-recipe.html'),
  controller: ['$log', '$rootScope', 'recipeService', CreateRecipeController],
  controllerAs: 'createRecipeCtrl',
  bindings: {
    profile: '<',
    recipe: '<',
    onRecipeCreated: '&'
  }
};

function CreateRecipeController($log, $rootScope, recipeService) {
  $log.debug('CreateRecipeController');

  this.createRecipe = function() {
    $log.debug('RecipeItemController.createRecipe()');

    recipeService.createRecipe(this.recipe)
    .then( () => this.onRecipeCreated())
    .then( () => this.recipe = null);
  };

}
