'use strict';

require('./_recipe-tile.scss');

module.exports = {
  template: require('./recipe-tile.html'),
  controller: ['$log', 'recipeService', RecipeTileController],
  controllerAs: 'recipeTileCtrl',
  bindings: {
    recipe: '<'
  }
};

function RecipeTileController($log, recipeService) {
  $log.debug('RecipeTileController');
}
