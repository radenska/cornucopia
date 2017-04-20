'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'recipeService', HomeController];

function HomeController($log, $rootScope, $stateParams, profileService, recipeService) {
  $log.debug('HomeController', this);

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

  };
  this.updateRecipeView = function() {
    $log.debug('HomeController.updateRecipeView()');

    recipeService.fetchMyRecipes(this.myProfile._id)
    .then(recipes => this.myRecipes = recipes);
  };

  this.fetchProfile();

}
