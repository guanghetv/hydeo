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

  // Check if the video is paused.
  _this.isPause = function isPause() {
    return _this.API.currentState === 'pause';
  };

  // Check if the video is playing.
  _this.isPlay = function isPlay() {
    return _this.API.currentState === 'play';
  };

  // Check if the video is stoped.
  _this.isStop = function isStop() {
    return _this.API.currentState === 'stop';
  };

  // play
  _this.play = function play() {
    var API = _this.API;

    if (API && !_this.isPlay()) {
      API.play();
    }
  };

  // stop
  _this.stop = function stop() {
    var API = _this.API;

    if (API && !_this.isStop()) {
      API.stop();
    }
  };

  // pause
  _this.pause = function pause() {
    var API = _this.API;

    if (API && !_this.isPause()) {
      API.pause();
    }
  };

  // mapping onEnter to onUpdate
  _this.onEnter = function onEner() {
    var cp = _this.currentCuePoint;

    if (!_.isPlainObject(cp)) {
      return ;
    }

    if (_.isFunction(cp.onEnter)) {
      cp.onEnter(cp.currentTime, cp.timeLapse, _this.API, cp.params);
    }

    _this.pause();
    cp.$$isPristine = false;
  };

  // mapping onLeave to onComplete
  _this.onLeave = function onLeave() {
    var cp = _this.currentCuePoint;

    if (_.isFunction(cp.onLeave)) {
      cp.onLeave(cp.currentTime, cp.timeLapse, _this.API, cp.params);
    }

    _this.play();
    delete _this.currentCuePoint;
  };

  // Simplified and transform to vg-cue-point.
  _this.toCuePoint = function toCuePoint(cp) {
    cp.$$isPristine = true;
    cp.timeLapse = {
      start: cp.time
    };

    if (_.isPlainObject(cp.time)) {
      cp.timeLapse = cp.time;
    }

    cp.onUpdate = function onUpdate(currentTime, timeLapse, params) {
      var start = _.parseInt(timeLapse.start);
      var currentSecond = _.parseInt(currentTime);
      var callbackParameters = {
        currentTime: currentTime,
        timeLapse: timeLapse,
        params: params
      };

      _this.currentCuePoint = _this.currentCuePoint || _.assign(callbackParameters, cp);

      // prevent enter a lot of times in 1 second.
      if (_this.currentCuePoint.$$isPristine && start === currentSecond) {
        _this.onEnter();
      }
    };

    cp.onComplete = function onComplete(currentTime, timeLapse, paras) {
      _this.onLeave();
    };

    return cp;
  };

  /**
   * Transform multiple vg-cue-points.
   */
  _this.toCuePoints = function toCuepoints(cuepointList) {
    if (!cuepointList || !cuepointList.length) {
      return ;
    }

    var result = {
      list: []
    };

    _.forEach(cuepointList, function(cp) {
      if (!_.isPlainObject(cp)) {
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
        // TODO onPlayerReady should be configurable by an options param
        $scope.onPlayerReady = function onPlayerReady(api) {
          $scope.api = api;
          _this.API = api;
          $scope.config.cuePoints = _this.toCuePoints($scope.cuepoints);
        };

        $scope.config = {
          sources: [{
            src: $sce.trustAsResourceUrl($scope.src),
            // TODO type should be configurable by an options param
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

        $scope.isShowOverlay = function isShowOverlay() {
          if(!_this.currentCuePoint) {
            return false;
          }

          var timePoint = _.parseInt(_this.currentCuePoint.currentTime);
          var currentSecond = _.parseInt(_this.API.currentTime / 1000);

          return _this.isPause() && timePoint === currentSecond;
        };

        $scope.closeOverlay = function closeOverlay() {
          _this.play();
        };
      }

    };
  }]);

})();

