/**
 *
 * hypeo derective, used to playing html5 video base on Videogular.
 *
 */
(function() {

  var app = angular.module('hydeo', [
    'ngSanitize',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'uk.ac.soton.ecs.videogular.plugins.cuepoints'
  ]);

  /**
   * Simplified and transform the vg-cue-points configurations.
   */
  function toCuePoint(cuepointList, api) {
    if(!cuepointList || !cuepointList.length) {
      return ;
    }

    var result = {
      list: []
    };

    _.forEach(cuepointList, function(cp) {
      if(cp) {
        var cuepoint = {};
        var timeLapse = {
          start: cp.time
        };

        if(_.isPlainObject(cp.time)) {
          timeLapse = cp.time;
        }

        cuepoint = {
          timeLapse: timeLapse,
          // mapping onEnter to onUpdate
          onUpdate: function onEnter(currentTime, timeLapse, params) {
            if(_.isFunction(cp.onEnter)) {
              cp.onEnter(currentTime, timeLapse, api, params);
            }
          },
          // mapping onLeave to onComplete
          onComplete: function onLeave(currentTime, timeLapse, params) {
            if(_.isFunction(cp.onLeave)) {
              cp.onLeave(currentTime, timeLapse, api, params);
            }
          },
          params: cp.params
        };

        result.list.push(cuepoint);
      }
    });

    return result;
  }

  app.directive('hydeo', ['$sce', function($sce) {
    return {
      // only work on Element.
      resctrict: 'E',

      templateUrl: 'scripts/directives/hydeo.html',

      scope: {

        /**
         * Object containing a list of timelines with cue points. Each property in the object represents a timeline, which is an Array of objects with the next definition
         * <pre>
         * {
         *  time: Define in seconds when this timeline is active, can be an integer or an Object with start and end properties.
         *  onEnter: Callback function that will be called when timeline reach to the time property.
         *  onUpdate: Callback function that will be called when the progress is in the time property.
         *  onLeave: Callback function that will be called when the progress is over the time property.
         *  params: Custom object with data to pass to the callbacks.
         * }
         * </pre>
         */
        cuepoints: '=',

        /**
         * Video source url
         */
        src: '='
      },

      link: function ($scope, elem, attr) {
        // TODO configurable event
        $scope.onPlayerReady = function onPlayerReady(api) {
          $scope.api = api;
        };

        $scope.config = {
          sources: [{
            src: $sce.trustAsResourceUrl($scope.src),
            // TODO configurable media type
            type: 'video/mp4'
          }],
          // TODO styling a default theme
          theme: 'bower_components/videogular-themes-default/videogular.css',
          cuePoints: toCuePoint($scope.cuepoints, api),
          plugins: {
            // TODO more controls & plugins
            cuepoints: {
              // TODO styling a default theme
              theme: {
                url: 'bower_components/videogular-cuepoints/cuepoints.css'
              },
              points: $scope.cuepoints
            }
          }
        };
      }

    };
  }]);

})();

