'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'recipeService', HomeController];

function HomeController($log, $rootScope, $stateParams, profileService, recipeService) {
  $log.debug('HomeController', this);

  this.allRecipes = [];
  this.myProfile = {};
  this.myUserID = $stateParams.userID;

  this.fetchRecipes = function() {
    $log.debug('HomeController.fetchRecipes()');

    recipeService.fetchRecipes()
    .then(recipes => this.allRecipes = recipes);
  };

  // this.fetchMyRecipes = function(profileID) {
  //   $log.debug('HomeController.fetchRecipes()');
  //
  //   recipeService.fetchMyRecipes(profileID)
  //   .then(recipes => this.myRecipes = recipes);
  // };

  this.fetchProfile = function() {
    $log.debug('HomeController.fetchProfile()');

    profileService.fetchProfile(this.myUserID)
    .then(profile => this.myProfile = profile)
    .then( () => recipeService.fetchMyRecipes(this.myProfile._id))
    .then(recipes => this.myRecipes = recipes);
  }

  this.fetchProfile();
  // this.fetchMyRecipes(this.myProfile._id);
  // this.fetchRecipes();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchProfile();
  });
}
