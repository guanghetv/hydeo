/**
 *
 * hypeo derective, used to playing html5 video base on Videogular.
 *
 */
(function() {
  'use strict';

  /**
   * Gloabal variable.
   */
  var _this = this || {};

  var app = angular.module('hydeo', [
    'ngSanitize',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'uk.ac.soton.ecs.videogular.plugins.cuepoints'
  ]);

    // Simplified and transform to vg-cue-point.
  _this.toCuePoint = function toCuePoint(cp) {
    var timeLapse = {
      start: cp.time
    };
    // prevent onEnter callback executed twice or more in 1 second.
    var isFirstTime = true;
    var cuepoint;

    if(_.isPlainObject(cp.time)) {
      timeLapse = cp.time;
    }

    // convert cuepoint mappings.
    cuepoint = {
      timeLapse: timeLapse,
      // mapping onEnter to onUpdate
      onUpdate: function onEnter(currentTime, timeLapse, params) {
        var start = _.parseInt(timeLapse.start);
        var now = _.parseInt(currentTime);

        if(_.isFunction(cp.onEnter) && start === now && isFirstTime) {
          cp.onEnter(currentTime, timeLapse, _this.API, params);
          isFirstTime = false;
        }
      },

      // mapping onLeave to onComplete
      onComplete: function onLeave(currentTime, timeLapse, params) {
        if(_.isFunction(cp.onLeave)) {
          cp.onLeave(currentTime, timeLapse, _this.API, params);
          isFirstTime = true;
        }
      },
      params: cp.params
    };

    return cuepoint;
  };

  /**
   * Transform multiple vg-cue-points.
   */
  _this.toCuePoints = function toCuepoints(cuepointList) {
    if(!cuepointList || !cuepointList.length) {
      return ;
    }

    var result = {
      list: []
    };

    _.forEach(cuepointList, function(cp) {
      if(!_.isPlainObject(cp)) {
        return ;
      }

      var cuepoint = _this.toCuePoint(cp);

      result.list.push(cuepoint);
    });

    return result;
  };

  app.directive('hydeo', ['$sce', '$q', function($sce, $q) {
    return {
      // only work on Element.
      resctrict: 'E',

      templateUrl: 'views/directives/hydeo.html',

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
          _this.API = api;
          $scope.config.cuePoints = _this.toCuePoints($scope.cuepoints);
        };

        $scope.config = {
          sources: [{
            src: $sce.trustAsResourceUrl($scope.src),
            // TODO configurable media type
            type: 'video/mp4'
          }],
          // TODO styling a default theme
          theme: 'bower_components/videogular-themes-default/videogular.css',
          //cuePoints: _this.toCuePoint($scope.cuepoints, deferredApi.promise),
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

