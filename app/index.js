(function(){
  'use strict';

  angular.module('hydeoApp', ['hydeo']).controller('HomeController', function($sce) {
    var _this = this;

    _this.cuepoints = [{
      time: 10,
      templateUrl: 'views/quiz.html'
    },{time:20}];

    _this.src = 'http://7xaw4c.com2.z0.glb.qiniucdn.com/有理数_3a_有理数的乘法异号.mp4';
  }).controller('QuizController', [function() {
    var _this = this;

    _this.pick = function(type) {
      console.log(type);
    };
  }]);

})();

