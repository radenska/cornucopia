'use strict';

require('./_landing.scss');

module.exports = ['$log', '$location', '$rootScope', 'authService', 'recipeService', LandingController];

function LandingController($log, $location, $rootScope, authService, recipeService) {
  $log.debug('LandingController', this);

  this.loggedIn = false;

  let url = $location.url();
  this.showSignup = url === '/join#signup' || url === 'join';

  this.recipes = [];

  this.fetchRecipes = function() {
    recipeService.fetchRecipes()
    .then( recipes => {
      this.recipes = recipes;
      this.currentRecipe = recipes[0];
    });
  };

  this.recipeDeleteDone = function(recipe) {
    if (this.currentRecipe._id === recipe._id) {
      this.currentRecipe = null;
    };
  };

  this.fetchRecipes();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchRecipes();
  });
}
