'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'recipeService', HomeController];

function HomeController($log, $rootScope, $stateParams, profileService, recipeService) {
  $log.debug('HomeController', this);

  this.allRecipes = [];
  this.myUserID = $stateParams.userID;

  this.fetchRecipes = function() {
    $log.debug('HomeController.fetchRecipes()');

    recipeService.fetchRecipes()
    .then(recipes => {
      this.allRecipes = recipes;
    });
  };
  this.fetchProfile = function() {
    $log.debug('HomeController.fetchProfile()');

    profileService.fetchProfile(this.myUserID)
    .then(profile => {
      $log.debug('My Profile', profile);
      this.myProfile = profile;
    });
  }
  this.fetchProfile();
  this.fetchRecipes();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchRecipes();
  });
}
