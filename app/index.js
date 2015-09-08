(function(){

  // Simple hydeo demo.
  angular.module('hydeoApp', ['hydeo']).controller('HomeController', function($sce) {
    var _this = this;

    _this.cuepoints = [{
      time: 10,
      onLeave: function onLeave(currentTime) {
        console.log(parseInt(currentTime, 10));
      },
      onEnter: function onComplete(currentTime, timeLapse) {
        console.log('enter:' + parseInt(currentTime, 10));
      }
    }];

    _this.src = 'http://static.videogular.com/assets/videos/videogular.mp4';
  });

})();

