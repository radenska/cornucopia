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

  this.showForm = false;
  this.showBtn = true;
  this.recipe = {};
  this.allRecipes = [];

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

    recipeService.fetchRecipes()
    .then(recipes => {
      this.allRecipes = recipes;
      $log.debug('ALL RECIPES', this.allRecipes);
    });
  };

  this.fetchRecipes();

  this.createRecipe = function() {
    $log.debug('RecipeController.createRecipe()');

    recipeService.createRecipe(this.recipe)
    .then(rec => {
      $log.debug('REC', rec);
      this.recipe = null;
    });
  };

}
