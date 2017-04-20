'use strict';

require('./_recipe-tile.scss');

module.exports = {
  template: require('./recipe-tile.html'),
  controller: ['$log', '$location', 'recipeService', RecipeTileController],
  controllerAs: 'recipeTileCtrl',
  bindings: {
    recipe: '<'
  }
};

function RecipeTileController($log, $location, recipeService) {
  $log.debug('RecipeTileController');

  this.goToRecipe = function() {
    $log.debug('RecipeTileController.goToRecipe()');

    $location.url(`/recipe/${this.recipe._id}`)
  };
}
