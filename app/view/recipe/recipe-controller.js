'use strict';

require('./_recipe.scss');

module.exports = ['$log', '$stateParams', 'authService', 'recipeService', RecipeController];

function RecipeController($log, $stateParams, authService, recipeService) {
  $log.debug('RecipeController');

  this.recipeID = $stateParams.recipeID;

  this.loginStatus = function() {
    $log.debug('RecipeController.loginStatus()');

    authService.getToken()
    .then( () => this.loggedIn = true)
    .catch( () => this.loggedIn = false);

  };

  this.getRecipe = function() {
    $log.debug('RecipeController.getRecipe()');

    recipeService.fetchRecipe(this.recipeID)
    .then(recipe => this.recipe = recipe.data)
    .then( () => $log.debug('RECIPE IN RECIPE CONTROLLER', this.recipe));
  };
  
  this.getRecipe();
  this.loginStatus();

}
