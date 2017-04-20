'use strict';

require('./_recipe.scss');

module.exports = ['$log', '$rootScope', 'recipeService', RecipeController];

function RecipeController($log, $rootScope, recipeService) {
  $log.debug('RecipeController');

  this.fetchRecipe = function(recipe){
    $log.debug('RecipeController.fetchRecipe()');

    recipeService.fetchRecipe(recipe._id);
  };
}
