/**
 * @author centsent
 */
import directivesModule from './_index';
import AppSettings from './../AppSettings';

// Mapping media event to function of HyMediaDirective class.
const eventMap = {
  // Fires when the browser can start playing the audio/video.
  canplay: 'onCanPlay',
  // Fires when the loading of an audio/video is aborted.
  abort: 'onAbort',
  // Fires when the current playlist is ended.
  ended: 'onEnded',
  // Fires when an error occurred during the loading of an audio/video.
  error: 'onErroe',
  // Fires when the browser has loaded meta data for the audio/video.
  loadedmetadata: 'onLoadedMetaData',
  // Fires when the audio/video has been paused.
  pause: 'onPause',
  // Fires when the audio/video has been started or is no longer paused.
  play: 'onPlay',
  // Fires when the audio/video is playing after having been paused or stopped
  // for buffering.
  playing: 'onPlaying',
  // Fires when the user is finished moving/skipping to a new position in the
  // audio/video.
  seeked: 'onSeeked',
  // Fires when the user starts moving/skipping to a new position in the
  // audio/video.
  seeking: 'onSeeking',
  // Fires when the volume has been changed.
  onvolumechange: 'onVolumeChange',
  // Fires when the video stops because it needs to buffer the next frame.
  waiting: 'onWaiting',
  // Fires when the current playback position has changed.
  timeupdate: 'onTimeUpdate',
  // Fires when the browser is downloading the audio/video.
  progress: 'onProgress',
  // Fires when the playing speed of the audio/video is changed.
  ratechange: 'onRateChange'
};

/**
 * TODO
 */
class HyMediaDirectiveHelper {

  constructor($sce, $hyMedia, $scope, elem) {
    this.$sce = $sce;
    this.$hyMedia = $hyMedia;
    this.$scope = $scope;
    // TODO detecting media type.
    // TODO video should be configurable by an options param.
    // only support video for now.
    this.mediaElement = elem.find('video');
    $hyMedia.setMediaElement(this.mediaElement);
  }

  /**
   * TODO
   */
  setup() {
    const elem = this.mediaElement;

    elem.prop('src', this.$sce.trustAsResourceUrl(this.$scope.src));
    elem.prop('autoplay', this.$scope.autoplay);

    this.addListeners();
  }

  /**
   * Binding default events that has been defined in eventMap to the audio/video element.
   */
  addListeners() {
    const elem = this.mediaElement;
    angular.forEach(eventMap, (handler, eventType) => {
      if (handler && this[handler]) elem.bind(eventType, this[handler].bind(this));
    });
  }

  /**
   * Set audio/video's current state to `play`.
   */
  onPlay() {
    this.$hyMedia.currentState = AppSettings.mediaState.PLAY;
  }

  /**
   * Start buffering.
   */
  onWaiting() {
    this.$hyMedia.isBuffering = true;
  }

  /**
   * Fires when the audio/video was paused.
   */
  onPause() {
    this.$hyMedia.currentState = AppSettings.mediaState.PAUSE;
  }

  /**
   * Fires when the audio/video resumed playing after been paused or stopped
   * for buffering.
   */
  onPlaying() {
    this.$hyMedia.isBuffering = false;
  }

  /**
   * TODO
   */
  onCanPlay() {
    this.$hyMedia.isBuffering = false;
  }

  /**
   * Update `currentTime`, `totalTime`, `timeLeft` when the current playback
   * position has changed.
   */
  onTimeUpdate(event) {
    const $hyMedia = this.$hyMedia;
    const target = event.target;
    $hyMedia.currentTime = target.currentTime * 1000;

    if (target.duration !== Infinity) {
      $hyMedia.totalTime = target.duration * 1000;
      $hyMedia.timeLeft = $hyMedia.totalTime - $hyMedia.currentTime;
      $hyMedia.isLive = false;
    } else {
      $hyMedia.isLive = true;
    }
  }
}

/**
 * @ngInject
 */
function hyMediaDirective($sce, $hyMedia) {
  return {
    restrict: 'E',
    templateUrl: 'directives/hyMedia.html',
    require: '^hyHydeo',
    scope: {
      src: '=',
      autoplay: '='
    },

    link: ($scope, elem, attrs, hydeoController) => {
      const helper = new HyMediaDirectiveHelper($sce, $hyMedia, $scope, elem);
      helper.setup();
      hydeoController.ready();
    }
  };
}

directivesModule.directive('hyMedia', hyMediaDirective);
