'use strict';

module.exports = ['$log', '$window', '$rootScope', '$stateParams', 'profileService', 'recipeService', MyrecipesController];

function MyrecipesController($log, $window, $rootScope, $stateParams, profileService, recipeService) {
  $log.debug('MyrecipesController');

  this.myUserID = JSON.parse($window.localStorage.getItem('userID'));
  this.loggedIn = true;

  this.fetchProfile = function() {
    $log.debug('MyrecipesController.fetchProfile()');

    profileService.fetchProfile(this.myUserID)
    .then(profile => this.myProfile = profile)
    .then( () => recipeService.fetchMyRecipes(this.myProfile._id))
    .then(recipes => this.myRecipes = recipes);
  };

  this.updateRecipeView = function() {
    $log.debug('MyrecipesController.updateRecipeView()');

    recipeService.fetchMyRecipes(this.myProfile._id)
    .then(recipes => this.myRecipes = recipes);
  };

  this.fetchProfile();

}
