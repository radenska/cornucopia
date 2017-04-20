'use strict';

require('./_recipe.scss');

module.exports = ['$log', '$window', '$location', '$stateParams', 'authService', 'recipeService', RecipeController];

function RecipeController($log, $window, $location, $stateParams, authService, recipeService) {
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
    .then(recipe => this.recipe = recipe.data);
  };

  this.goToRecipeTiles = function() {
    if (!this.loggedIn) return $location.url('/');

    let userID = $window.localStorage.getItem('userID')
    return $location.url(`/myrecipes/${userID}`);
  };

  this.getRecipe();
  this.loginStatus();
}
