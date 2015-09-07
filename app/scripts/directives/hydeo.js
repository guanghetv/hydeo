(function() {
  var app = angular.module('hydeo', [
    'ngSanitize',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls'
  ]);

  app.directive('hydeo', ['$sce', function($sce) {
    return {
      resctrict: 'E',
      templateUrl: 'views/directives/hydeo.html',
      scope: {
        options: '='
      },
      link: function ($scope, elem, attr, API) {
        $scope.config = {
          sources: [{
            src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.mp4'),
            type: 'video/mp4'
          }],
          tracks: [{
            src: 'http://www.videogular.com/assets/subs/pale-blue-dot.vtt',
            kind: 'subtitles',
            srclang: 'en',
            label: 'English',
            'default': ''
          }],
          theme: 'bower_components/videogular-themes-default/videogular.css',
          plugins: {
            cuepoints: {
              theme: {
                url: 'bower_components/videogular-cuepoints/cuepoints.css'
              },
              points: [
                {time: 18},
                {time: 60}
              ]
            }
          }
        };
      }

    };
  }]);

})();

