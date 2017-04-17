'use strict';

require('./_create-recipe.scss');

module.exports = {
  template: require('./create-recipe.html'),
  controller: ['$log', 'recipeService', CreateRecipeController],
  controllerAs: 'createRecipeCtrl',
  bindings: {
    profile: '<'
  }
};

function CreateRecipeController($log, recipeService) {
  $log.debug('CreateRecipeController');

  this.recipe = {};

  this.createRecipe = function() {
    $log.debug('RecipeItemController.createRecipe()');

    recipeService.createRecipe(this.recipe)
    .then(rec => this.recipe = null);
  };

}
