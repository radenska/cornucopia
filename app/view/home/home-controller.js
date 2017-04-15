'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', HomeController];

function HomeController($log, $rootScope) {
  $log.debug('homeController');

  //add more home stuff!
}
