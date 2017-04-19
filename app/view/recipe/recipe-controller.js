'use strict';

require('./_recipe.scss');

module.exports = ['$log', '$stateParams', 'recipeService', RecipeController];

function RecipeController($log, $stateParams, recipeService) {
  $log.debug('RecipeController', this.recipe);

  this.recipeID = $stateParams.id;

  recipeService.fetchRecipe(this.recipeID)
  .then(recipe => this.recipe = recipe.data)
}
