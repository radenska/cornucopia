'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'recipeService', HomeController];

function HomeController($log, $rootScope, $stateParams, profileService, recipeService) {
  $log.debug('HomeController');

  this.myUserID = $stateParams.userID;
  this.loggedIn = true;

  this.fetchProfile = function() {
    $log.debug('HomeController.fetchProfile()');

    profileService.fetchProfile(this.myUserID)
    .then(profile => this.myProfile = profile)
    .then( () => recipeService.fetchMyRecipes(this.myProfile._id))
    .then(recipes => this.myRecipes = recipes);
  };

  this.fetchAllRecipes = function() {
    $log.debug('HomeController.fetchAllRecipes()');

    recipeService.fetchRecipes()
    .then(recipes => this.allRecipes = recipes);
  };

  this.updateAllRecipesView = function() {
    $log.debug('HomeController.updateAllRecipesView()');

    this.fetchAllRecipes();
  };

  this.fetchProfile();
  this.fetchAllRecipes();

  this.recipes = [];

  this.fetchRecipes = function() {
    recipeService.fetchRecipes()
    .then( recipes => {
      this.recipes = recipes;
      this.currentRecipe = recipes[0];
    });
  };

  this.fetchRecipes();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchRecipes();
  });
}
