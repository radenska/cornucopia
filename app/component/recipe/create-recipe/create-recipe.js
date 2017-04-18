'use strict';

require('./_create-recipe.scss');

module.exports = {
  template: require('./create-recipe.html'),
  controller: ['$log', '$rootScope', 'recipeService', CreateRecipeController],
  controllerAs: 'createRecipeCtrl',
  bindings: {
    profile: '<'
  }
};

function CreateRecipeController($log, $rootScope, recipeService) {
  $log.debug('CreateRecipeController');

  this.recipe = {};

  this.createRecipe = function() {
    $log.debug('RecipeItemController.createRecipe()');

    recipeService.createRecipe(this.recipe)
    .then(rec => this.recipe = null);
    console.log('RECIPE:', this.recipe);
  };

}
