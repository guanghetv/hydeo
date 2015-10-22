import angular from 'angular';

// create and bootstrap application
angular.element(document).ready(() => {
  const appName = 'hydeoApp';
  const modules = [
    'hydeo'
  ];
  const app = angular.module(appName, modules);

  app.controller('HomeController', function HomeController() {
    this.cuepoints = [{
      time: 15,
      templateUrl: 'scripts/quiz.html'
    }, {
      time: 30
    }, {
      time: 60
    }, {
      time: 97,
      templateUrl: 'scripts/final.html'
    }];

    this.src = 'http://7xaw4c.com2.z0.glb.qiniucdn.com/有理数_3a_有理数的乘法异号.mp4';
    // this.src = 'http://static.videogular.com/assets/videos/videogular.mp4';
  })
  .controller('QuizController', function QuizController($hyMedia) {
    this.a = true;

    this.play = () => {
      $hyMedia.play();
    };

    this.seek = () => {
      $hyMedia.seek(90);
    };
  });

  angular.bootstrap(document, [appName]);
});
