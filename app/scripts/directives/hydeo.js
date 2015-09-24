import $ from 'jquery';
import _ from 'lodash';
import directivesModule from './_index';
import template from '../../views/directives/hydeo.html';

/**
 *
 * hypeo derective, used to playing html5 video base on Videogular.
 *
 */
// @ngInject
function hydeoDirective($sce, $hydeoControl) {
  // const cuepoint = new CuePoint();
  const _this = {};

  _this.onEnter = () => {
    const cp = _this.currentCuePoint;

    if (!_.isPlainObject(cp)) {
      return;
    }

    _this.showOverlay();
  };

  _this.onLeave = () => {
    const cp = _this.currentCuePoint;

    if (cp && _.isFunction(cp.onLeave)) {
      cp.onLeave(cp.currentTime, cp.timeLapse, cp.params);
    }

    $hydeoControl.play();
    delete _this.currentCuePoint;
  };

  _this.toCuePoint = (cp) => {
    const onEnter = cp.onEnter;
    cp.timeLapse = {
      start: cp.time
    };

    if (_.isPlainObject(cp.time)) {
      cp.timeLapse = cp.time;
    }

    cp.onEnter = (currentTime, timeLapse, params) => {
      const callbackParameters = {
        currentTime: currentTime,
        timeLapse: timeLapse,
        params: params
      };

      _this.currentCuePoint = _this.currentCuePoint || _.assign(callbackParameters, cp);
      _this.onEnter();
      if (_.isFunction(onEnter)) {
        onEnter(currentTime, timeLapse, params);
      }
    };

    cp.onComplete = () => {
      _this.onLeave();
    };

    return cp;
  };

  _this.toCuePoints = (cuepointList) => {
    if (!cuepointList || !cuepointList.length) {
      return null;
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

    link: function link($scope, elem) {
      const overlay = $(elem).find('.quiz-container');
      $hydeoControl.setOverlay(overlay);
      // TODO onPlayerReady should be configurable by an options param
      $scope.onPlayerReady = (api) => {
        $hydeoControl.setApi(api);
        _this.API = api;
        $scope.config.cuePoints = _this.toCuePoints($scope.cuepoints);
      };

      $scope.config = {
        sources: [{
          src: $sce.trustAsResourceUrl($scope.src),
          // TODO type should be configurable by an options param
          type: 'video/mp4'
        }]
      };

      $scope.showOverlay = () => {
        const currentCuePoint = _this.currentCuePoint;
        if (!currentCuePoint) {
          return;
        }

        $scope.templateUrl = currentCuePoint.templateUrl;
        $hydeoControl.pause();
      };

      $scope.hideOverlay = () => {
        $hydeoControl.play();
      };

      $scope.calcLeft = (point) => {
        if (_this.API.totalTime === 0) {
          return '-1000';
        }
        const videoLength = _this.API.totalTime / 1000;
        return (point.time * 100 / videoLength).toString();
      };

      _this.showOverlay = $scope.showOverlay;
    }
  };
}

directivesModule.directive('hydeo', hydeoDirective);
