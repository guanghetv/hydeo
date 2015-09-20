import _ from 'lodash';
import directivesModule from './_index';
import template from '../../views/directives/hydeo.html';

/**
 *
 * hypeo derective, used to playing html5 video base on Videogular.
 *
 */
// @ngInject
function hydeoDirective($sce) {
  let _this = {};

  // Check if the video is paused.
  _this.isPause = () => {
    return _this.API.currentState === 'pause';
  };

  // Check if the video is playing.
  _this.isPlay = () => {
    return _this.API.currentState === 'play';
  };

  // Check if the video is stoped.
  _this.isStop = () => {
    return _this.API.currentState === 'stop';
  };

  // play
  _this.play = () => {
    const API = _this.API;

    if (API && !_this.isPlay()) {
      API.play();
    }
  };

  // stop
  _this.stop = () => {
    const API = _this.API;

    if (API && !_this.isStop()) {
      API.stop();
    }
  };

  // pause
  _this.pause = () => {
    const API = _this.API;

    if (API && !_this.isPause()) {
      API.pause();
    }
  };

  // mapping onEnter to onUpdate
  _this.onEnter = () => {
    const cp = _this.currentCuePoint;

    if (!_.isPlainObject(cp)) {
      return;
    }

    if (_.isFunction(cp.onEnter)) {
      cp.onEnter(cp.currentTime, cp.timeLapse, _this.API, cp.params);
    }

    _this.pause();
    cp.$$isPristine = false;
  };

  // mapping onLeave to onComplete
  _this.onLeave = () => {
    const cp = _this.currentCuePoint;

    if (_.isFunction(cp.onLeave)) {
      cp.onLeave(cp.currentTime, cp.timeLapse, _this.API, cp.params);
    }

    _this.play();
    delete _this.currentCuePoint;
  };

  // Simplified and transform to vg-cue-point.
  _this.toCuePoint = (cp) => {
    cp.$$isPristine = true;
    cp.timeLapse = {
      start: cp.time
    };

    if (_.isPlainObject(cp.time)) {
      cp.timeLapse = cp.time;
    }

    cp.onUpdate = (currentTime, timeLapse, params) => {
      const start = _.parseInt(timeLapse.start);
      const currentSecond = _.parseInt(currentTime);
      const callbackParameters = {
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

    cp.onComplete = () => {
      _this.onLeave();
    };

    return cp;
  };

  /**
   * Transform multiple vg-cue-points.
   */
  _this.toCuePoints = (cuepointList) => {
    if (!cuepointList || !cuepointList.length) {
      return;
    }

    const result = {
      list: []
    };

    _.forEach(cuepointList, (cp) => {
      if (!_.isPlainObject(cp)) {
        return;
      }

      const cuepoint = _this.toCuePoint(cp);

      result.list.push(cuepoint);
    });

    return result;
  };

  return {
    restrict: 'E',
    template: template,
    scope: {
      /**
       * Object containing a list of timelines with cue points. Each property in the object represents a timeline, which is an Array of objects with the next definition
       * <pre>
       * {
       *  time: Define in seconds when _this timeline is active, can be an integer or an Object with start and end properties.
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

    link: function link($scope) {
      // TODO onPlayerReady should be configurable by an options param
      $scope.onPlayerReady = (api) => {
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

      $scope.isShowOverlay = () => {
        if (!_this.currentCuePoint) {
          return false;
        }

        const timePoint = _.parseInt(_this.currentCuePoint.currentTime);
        const currentSecond = _.parseInt(_this.API.currentTime / 1000);
        $scope.templateUrl = _this.currentCuePoint.templateUrl;

        return _this.isPause() && timePoint === currentSecond;
      };

      $scope.closeOverlay = () => {
        _this.play();
      };
    }
  };
}

directivesModule.directive('hydeo', hydeoDirective);
