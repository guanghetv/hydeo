/**
 * @author centsent
 */
import directivesModule from './_index';
import AppSettings from './../AppSettings';

// Bind media events.
const events = [
  // Fires when the browser can start playing the audio/video.
  'onCanPlay',
  // Fires when the loading of an audio/video is aborted.
  'onAbort',
  // Fires when the current playlist is ended.
  'onEnded',
  // Fires when an error occurred during the loading of an audio/video.
  'onErroe',
  // Fires when the browser has loaded meta data for the audio/video.
  'onLoadedMetaData',
  // Fires when the audio/video has been paused.
  'onPause',
  // Fires when the audio/video has been started or is no longer paused.
  'onPlay',
  // Fires when the audio/video is playing after having been paused or stopped
  // for buffering.
  'onPlaying',
  // Fires when the user is finished moving/skipping to a new position in the
  // audio/video.
  'onSeeked',
  // Fires when the user starts moving/skipping to a new position in the
  // audio/video.
  'onSeeking',
  // Fires when the volume has been changed.
  'onVolumeChange',
  // Fires when the video stops because it needs to buffer the next frame.
  'onWaiting',
  // Fires when the current playback position has changed.
  'onTimeUpdate',
  // Fires when the browser is downloading the audio/video.
  'onProgress',
  // Fires when the playing speed of the audio/video is changed.
  'onRateChange'
];

/**
 * @ngInject
 */
function hyMediaDirective($sce, $hyMedia) {
  // mock `this` object because it is undefined in current context.
  const _this = {};

  /**
   * TODO
   */
  _this.setup = () => {
    const elem = _this.mediaElement;

    elem.prop('src', $sce.trustAsResourceUrl(_this.$scope.src));
    elem.prop('autoplay', _this.$scope.autoplay);

    _this.bindEvents();
  };

  /**
   * Binding default events that has been defined in eventMap to the audio/video element.
   */
  _this.bindEvents = () => {
    angular.forEach(events, (eventType) => {
      const mediaEvent = $hyMedia[eventType];
      const currentHandler = _this[eventType];
      if (angular.isFunction(mediaEvent)) {
        mediaEvent.call($hyMedia, currentHandler);
      }
    });
  };

  /**
   * Set audio/video's current state to `play`.
   */
  _this.onPlay = () => {
    $hyMedia.currentState = AppSettings.mediaState.PLAY;
  };

  /**
   * Start buffering.
   */
  _this.onWaiting = () => {
    $hyMedia.isBuffering = true;
  };

  /**
   * Fires when the audio/video was paused.
   */
  _this.onPause = () => {
    $hyMedia.currentState = AppSettings.mediaState.PAUSE;
  };

  /**
   * Fires when the audio/video resumed playing after been paused or stopped
   * for buffering.
   */
  _this.onPlaying = () => {
    $hyMedia.isBuffering = false;
  };

  /**
   * Buffered.
   */
  _this.onCanPlay = () => {
    $hyMedia.isBuffering = false;
  };

  /**
   * Update `currentTime`, `totalTime`, `timeLeft` when the current playback
   * position has changed.
   */
  _this.onTimeUpdate = event => {
    const target = event.target;
    $hyMedia.currentTime = target.currentTime * 1000;

    if (target.duration !== Infinity) {
      $hyMedia.totalTime = target.duration * 1000;
      $hyMedia.timeLeft = $hyMedia.totalTime - $hyMedia.currentTime;
      $hyMedia.isLive = false;
    } else {
      $hyMedia.isLive = true;
    }
  };

  return {
    restrict: 'E',
    templateUrl: 'directives/hyMedia.html',
    require: '^hyHydeo',
    scope: {
      src: '=',
      autoplay: '='
    },

    link: ($scope, elem, attrs, hydeoController) => {
      _this.$scope = $scope;
      // TODO detecting media type.
      // TODO video should be configurable by an options param.
      // only support video for now.
      _this.mediaElement = elem.find('video');

      // setup $hyMedia service
      $hyMedia.setMediaElement(_this.mediaElement);
      // setup hy-media directive
      _this.setup();
      // setup hydeoController
      hydeoController.ready();
    }
  };
}

directivesModule.directive('hyMedia', hyMediaDirective);
