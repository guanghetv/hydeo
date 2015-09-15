import directivesModule from './_index';
import template from 'views/directives/hydeo.html';

/**
 *
 * hypeo derective, used to playing html5 video base on Videogular.
 *
 */
// @ngInject
function HydeoDirective($sce) {
  // Check if the video is paused.
  this.isPause = () => {
    return this.API.currentState === 'pause';
  };

  // Check if the video is playing.
  this.isPlay = () => {
    return this.API.currentState === 'play';
  };

  // Check if the video is stoped.
  this.isStop = () => {
    return this.API.currentState === 'stop';
  };

  // play
  this.play = () => {
    const API = this.API;

    if (API && !this.isPlay()) {
      API.play();
    }
  };

  // stop
  this.stop = () => {
    const API = this.API;

    if (API && !this.isStop()) {
      API.stop();
    }
  };

  // pause
  this.pause = () => {
    const API = this.API;

    if (API && !this.isPause()) {
      API.pause();
    }
  };

  // mapping onEnter to onUpdate
  this.onEnter = () => {
    const cp = this.currentCuePoint;

    if (!_.isPlainObject(cp)) {
      return;
    }

    if (_.isFunction(cp.onEnter)) {
      cp.onEnter(cp.currentTime, cp.timeLapse, this.API, cp.params);
    }

    this.pause();
    cp.$$isPristine = false;
  };

  // mapping onLeave to onComplete
  this.onLeave = () => {
    const cp = this.currentCuePoint;

    if (_.isFunction(cp.onLeave)) {
      cp.onLeave(cp.currentTime, cp.timeLapse, this.API, cp.params);
    }

    this.play();
    delete this.currentCuePoint;
  };

  // Simplified and transform to vg-cue-point.
  this.toCuePoint = (cp) => {
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

      this.currentCuePoint = this.currentCuePoint || _.assign(callbackParameters, cp);

      // prevent enter a lot of times in 1 second.
      if (this.currentCuePoint.$$isPristine && start === currentSecond) {
        this.onEnter();
      }
    };

    cp.onComplete = () => {
      this.onLeave();
    };

    return cp;
  };

  /**
   * Transform multiple vg-cue-points.
   */
  this.toCuePoints = (cuepointList) => {
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

      const cuepoint = this.toCuePoint(cp);

      result.list.push(cuepoint);
    });
  };

  return {
    restrict: 'E',
    template: template,
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

    link: function link($scope) {
      // TODO onPlayerReady should be configurable by an options param
      $scope.onPlayerReady = (api) => {
        $scope.api = api;
        this.API = api;
        $scope.config.cuePoints = this.toCuePoints($scope.cuepoints);
      };

      $scope.config = {
        sources: [{
          src: $sce.trustAsResourceUrl($scope.src),
          // TODO type should be configurable by an options param
          type: 'video/mp4'
        }],
        // TODO styling a default theme
        theme: 'bower_components/videogular-themes-default/videogular.css',
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
        if (!this.currentCuePoint) {
          return false;
        }

        const timePoint = _.parseInt(this.currentCuePoint.currentTime);
        const currentSecond = _.parseInt(this.API.currentTime / 1000);
        $scope.templateUrl = this.currentCuePoint.templateUrl;

        return this.isPause() && timePoint === currentSecond;
      };

      $scope.closeOverlay = () => {
        this.play();
      };
    }
  };
}

directivesModule.directive('hydeo', HydeoDirective);
