'use strict';

require('./_edit-recipe.scss');

module.exports = {
  template: require('./edit-recipe.html'),
  controller: ['$log', 'recipeService', EditRecipeController],
  controllerAs: 'editRecipeCtrl',
  bindings: {
    recipe: '<',
    onEditRecipe: '&'
  }
};

function EditRecipeController($log, recipeService) {
  $log.debug('EditRecipeController');

  this.updateRecipe = function() {
    $log.debug('EditRecipeController.updateRecipe()');

    recipeService.updateRecipe(this.recipe._id, this.recipe)
    .then( () => {
      this.recipe = null;
      this.onEditRecipe();
    })

  };
}
