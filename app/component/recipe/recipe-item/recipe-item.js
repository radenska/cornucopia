'use strict';

require('./_recipe-item.scss');

module.exports = {
  template: require('./recipe-item.html'),
  controller: ['$log', '$window', '$location', '$stateParams', 'recipeService','commentService', 'profileService', RecipeItemController],
  controllerAs: 'recipeItemCtrl',
  bindings: {
    onRecipeDeleted: '&',
    comment: '<',
    loggedIn: '<'
  }
};

function RecipeItemController($log, $window, $location, $stateParams, recipeService, commentService, profileService) {
  $log.debug('RecipeItemController');

  this.recipeID = $stateParams.recipeID;

  this.isThisMyRecipe = function() {
    $log.debug('RecipeItemController.isThisMyRecipe()');

    this.userID = $window.localStorage.getItem('userID');

    if (!this.userID) return false;

    recipeService.fetchRecipe(this.recipeID)
    .then(response => this.recipe = response.data)
    .then( () => profileService.fetchProfile(this.userID))
    .then(profile => {
      this.profile = profile;
      if (profile._id === this.recipe.profileID) return this.myRecipe = true;
      return this.myRecipe = false;
    })
    .catch( () => this.myRecipe = false);
  };

  this.updateRecipeView = function(){
    $log.debug('RecipeItemController.updateRecipe');

    this.commentArr = [];
    this.showCommentField = false;

    recipeService.fetchRecipe(this.recipeID)
    .then( recipe => this.recipe = recipe.data)
    .then( () => {
      if (this.recipe.comments.length !== 0) {
        this.recipe.comments.forEach(commentID => {
          commentService.fetchComment(commentID)
          .then(commentObj => this.commentArr.push(commentObj))
        });
      }
    })
    .catch(err => $log.error(err.message));
  };

  this.myRecipe = this.isThisMyRecipe();
  this.updateRecipeView();

  this.deleteRecipe = function() {
    $log.debug('RecipeItemController.deleteRecipe');

    let profileID = this.recipe.profileID;

    recipeService.deleteRecipe(this.recipe._id)
    .then( () => this.onRecipeDeleted());
  };

  this.backToTiles = function() {
    $log.debug('RecipeItemController.backToTiles()');

    if (!this.userID) return $location.url('/landing');

    if (!this.myRecipe) return $location.url(`/home/${this.userID}`);

    $location.url(`/myrecipes/${this.userID}`);
  };
}
