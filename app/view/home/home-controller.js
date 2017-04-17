'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'recipeService', HomeController];

function HomeController($log, $rootScope, recipeService) {
  $log.debug('HomeController', this);

  this.allRecipes = [];

  this.fetchRecipes = function() {
    $log.debug('HomeController.fetchRecipes()');

    recipeService.fetchRecipes()
    .then(recipes => {
      this.allRecipes = recipes;
    });
  };

  this.fetchRecipes();
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchRecipes();
  });
}
