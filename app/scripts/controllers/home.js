import controllersModule from './_index';

class HomeController {
  constructor() {
    this.init();
  }

  init() {
    this.cuepoints = [{
      time: 10,
      templateUrl: 'views/quiz.html'
    }, {time: 20}];

    this.src = 'http://7xaw4c.com2.z0.glb.qiniucdn.com/有理数_3a_有理数的乘法异号.mp4';
  }
}

class QuizController {
  constructor() {
    this.pick = (type) => {
      console.log(type);
    };
  }
}

controllersModule.controller('HomeController', HomeController);
controllersModule.controller('QuizController', QuizController);
