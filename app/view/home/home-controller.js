'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', '$stateParams', 'profileService', 'recipeService', HomeController];

function HomeController($log, $rootScope, $stateParams, profileService, recipeService) {
  $log.debug('HomeController', this);

  this.myUserID = $stateParams.userID;

  this.fetchRecipes = function() {
    $log.debug('HomeController.fetchRecipes()');

    recipeService.fetchRecipes()
    .then(recipes => this.allRecipes = recipes);
  };

  this.fetchProfile = function() {
    $log.debug('HomeController.fetchProfile()');

    profileService.fetchProfile(this.myUserID)
    .then(profile => this.myProfile = profile)
    .then( () => recipeService.fetchMyRecipes(this.myProfile._id))
    .then(recipes => this.myRecipes = recipes);
  }

  this.fetchProfile();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchProfile();
  });
}
