'use strict';

require('./_recipe.scss');

module.exports = {
  template: require('./recipe.html'),
  controller: ['$log', 'recipeService', 'authService', RecipeController],
  controllerAs: 'recipeCtrl'
};

function RecipeController($log, recipeService, authService) {
  $log.debug('RecipeController');

  this.show = false;

  this.showAddForm = function() {
    $log.debug('RecipeController.showAddForm()');

    this.show = true;
    $log.log('THIS SHOW', this.show);
  };

}
