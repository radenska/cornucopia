'use strict';

require('./_myrecipes.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'recipeService', MyrecipesController];

function MyrecipesController($log, $rootScope, $stateParams, profileService, recipeService) {
  $log.debug('MyrecipesController');

  this.myUserID = $stateParams.userID;
  this.loggedIn = true;
  $log.debug('LOGGED IN', this.loggedIn, this.myUserID);

  this.fetchProfile = function() {
    $log.debug('MyrecipesController.fetchProfile()');

    profileService.fetchProfile(this.myUserID)
    .then(profile => recipeService.fetchMyRecipes(profile._id))
    .then(prof => this.myProfile = prof);
  };

  // this.updateRecipeView = function() {
  //   $log.debug('MyrecipesController.updateRecipeView()');
  //
  //   recipeService.fetchMyRecipes(this.myProfile._id)
  //   .then(profile => this.myProfile = profile);
  // };

  this.fetchProfile();
}
