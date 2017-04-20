'use strict';

require('./_my-recipes.scss');

module.exports = {
  template: require('./my-recipes.html'),
  controller: ['$log', MyRecipesController],
  controllerAs: myRecipesCtrl
};

function MyRecipesController($log) {
  $log.debug('MyRecipesController');

  
}
