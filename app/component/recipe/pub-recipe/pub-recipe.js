'use strict';

require('./_pub-recipe.scss');

module.exports = {
  template: require('./pub-recipe.html'),
  controller: ['$log', 'recipeService', PubRecipeController],
  controllerAs: 'pubRecipeCtrl',
  bindings: {
    recipe: '<',
    loggedIn: '<'
  }
};

function PubRecipeController($log, recipeService) {
  $log.debug('PubRecipeController');

  this.fetchRecipes = function() {
    $log.debug('PubRecipeController.fetchRecipes()');

    recipeService.fetchRecipes()
    .then(recipes => this.allRecipes = recipes);
  };

  this.fetchRecipes();

}
