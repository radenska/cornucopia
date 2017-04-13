'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', homeController]

function homeController($log, $rootScope) {
  $log.debug('homeController');

  //add more home stuff!
}
