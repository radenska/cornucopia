'use strict';
// API_URL='https://cornucopia-app.herokuapp.com'

require('./_recipe.scss');

module.exports = {
  template: require('./recipe.html'),
  controller: ['$log', 'recipeService', RecipeController],
  controllerAs: 'recipeCtrl'
};

function RecipeController($log, recipeService) {
  $log.debug('RecipeController');

  this.allRecipes = [];
  this.showForm = false;
  this.showBtn = true;
  this.recipe = {};

  this.showAddForm = function() {
    $log.debug('RecipeController.showAddForm()');

    this.showBtn = false;
    this.showForm = true;
  };

  this.hideAddForm = function() {
    $log.debug('RecipeController.hideAddForm()');

    this.showBtn = true;
    this.showForm = false;
  }

  this.fetchRecipes = function() {
    $log.debug('RecipeController.fetchRecipes()');

  };

  this.createRecipe = function() {
    $log.debug('RecipeController.createRecipe()');

    recipeService.createRecipe(this.recipe)
    .then( () => {
      this.recipe = null;
    });
  };
}
