'use strict';

require('./_carousel.scss');

module.exports = {
  template: require('./carousel.html'),
  controller: ['$log', CarouselController],
  controllerAs: 'carCtrl'
};

function CarouselController($log){
  $log.debug('CarouselController');

  this.interval = 500;
  this.nowrap = false;
  this.active = 0;

  // let currentIndex = 0;
  

  let img1 = {
    image: 'https://placehold.it/1000x300/0000ff'
  };

  let img2 = {
    image: 'https://placehold.it/1000x300/ff0000'
  };

  let img3 = {
    image: 'https://placehold.it/1000x300/00ff00'
  };

  this.slides = [img1, img2, img3];

}