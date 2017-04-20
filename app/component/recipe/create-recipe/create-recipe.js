'use strict';

require('./_create-recipe.scss');

module.exports = {
  template: require('./create-recipe.html'),
  controller: ['$log', '$location', '$rootScope', 'recipeService', CreateRecipeController],
  controllerAs: 'createRecipeCtrl',
  bindings: {
    profile: '<',
    recipe: '<',
    onRecipeCreated: '&'
  }
};

function CreateRecipeController($log, $location, $rootScope, recipeService) {
  $log.debug('CreateRecipeController');

  this.createRecipe = function() {
    $log.debug('RecipeItemController.createRecipe()');

    recipeService.createRecipe(this.recipe)
    .then(recipe => {
      this.onRecipeCreated();
      $location.url(`/recipe/${recipe._id}`);
    });
  };

}
