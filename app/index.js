(function(){
  'use strict';

  angular.module('hydeoApp', ['hydeo']).controller('HomeController', function($sce) {
    var _this = this;

    _this.cuepoints = [{
      time: 10,
      onLeave: function onLeave(currentTime, timeLapse, api, params) {
        console.log(parseInt(currentTime, 10));
      },
      onEnter: function onComplete(currentTime, timeLapse, api, params) {
        api.pause();
      }
    }];

    _this.src = 'http://7xaw4c.com2.z0.glb.qiniucdn.com/有理数_3a_有理数的乘法异号.mp4';
  });
})();

