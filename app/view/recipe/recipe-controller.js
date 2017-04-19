'use strict';

require('./_recipe.scss');

module.exports = ['$log', '$stateParams', 'recipeService', RecipeController];

function RecipeController($log, $stateParams, recipeService) {
  $log.debug('RecipeController', this.recipe);

  this.recipeID = $stateParams.recipeID;
  $log.debug(`STATE PARAMS ${stateParams} STATEPARAMS`)
  this.getRecipe = function() {
    $log.debug('RecipeController.getRecipe()');

    recipeService.fetchRecipe(this.recipeID)
    .then(recipe => this.recipe = recipe.data)
  };

  this.getRecipe();

}
