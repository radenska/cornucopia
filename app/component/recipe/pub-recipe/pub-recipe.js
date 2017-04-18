'use strict';

require('./_pub-recipe.scss');

module.exports = {
  template: require('./pub-recipe.html'),
  controller: ['$log', 'recipeService', PubRecipeController],
  controllerAs: 'pubRecipeCtrl'
};

function PubRecipeController($log, recipeService) {
  $log.debug('PubRecipeController');

}
