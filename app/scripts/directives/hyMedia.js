/**
 * @author centsent
 */
import angular from 'angular';
import directivesModule from './_index';
import template from '../../views/directives/hyMedia.html';

const _sce = new WeakMap();
const _scope = new WeakMap();
const _hyMedia = new WeakMap();
const _AppSettings = new WeakMap();
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
class HyMediaDirective {

  constructor($sce, $hyMedia, AppSettings) {
    this.restrict = 'E';
    this.template = template;
    this.require = '^hyHydeo';
    this.scope = {
      src: '=',
      autoplay: '='
    };

    _sce.set(this, $sce);
    _hyMedia.set(this, $hyMedia);
    _AppSettings.set(this, AppSettings);
  }

  /**
   * TODO
   */
  compile() {
    return this::this.link;
  }

  /**
   * TODO
   */
  link($scope, elem, attrs, hydeoController) {
    const $hyMedia = _hyMedia.get(this);
    _scope.set(this, $scope);
    // TODO detecting media type.
    // TODO video should be configurable by an options param.
    // only support video for now.
    this.mediaElement = elem.find('video');
    $hyMedia.setMediaElement(this.mediaElement);
    this.settings();
    hydeoController.ready();
  }

  /**
   * TODO
   */
  settings() {
    const $sce = _sce.get(this);
    const $scope = _scope.get(this);
    const elem = this.mediaElement;

    elem.prop('src', $sce.trustAsResourceUrl($scope.src));
    elem.prop('autoplay', $scope.autoplay);

    this.addListeners();
  }

  /**
   * Binding default events that has been defined in eventMap to the audio/video element.
   */
  addListeners() {
    const elem = this.mediaElement;
    angular.forEach(eventMap, (handler, eventType) => {
      if (handler && this[handler]) elem.bind(eventType, this::this[handler]);
    });
  }

  /**
   * Set audio/video's current state to `play`.
   */
  onPlay() {
    const $hyMedia = _hyMedia.get(this);
    const AppSettings = _AppSettings.get(this);

    $hyMedia.currentState = AppSettings.mediaState.play;
  }

  /**
   * Start buffering.
   */
  onWaiting() {
    const $hyMedia = _hyMedia.get(this);

    $hyMedia.isBuffering = true;
  }

  /**
   * Fires when the audio/video was paused.
   */
  onPause() {
    const $hyMedia = _hyMedia.get(this);
    const AppSettings = _AppSettings.get(this);

    $hyMedia.currentState = AppSettings.mediaState.pause;
  }

  /**
   * Fires when the audio/video resumed playing after been paused or stopped
   * for buffering.
   */
  onPlaying() {
    const $hyMedia = _hyMedia.get(this);
    $hyMedia.isBuffering = false;
  }

  /**
   * TODO
   */
  onCanPlay() {
    const $hyMedia = _hyMedia.get(this);
    $hyMedia.isBuffering = false;
  }

  /**
   * Update `currentTime`, `totalTime`, `timeLeft` when the current playback
   * position has changed.
   */
  onTimeUpdate(event) {
    const $hyMedia = _hyMedia.get(this);
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

  /**
   * @ngInject
   */
  static factory($sce, $hyMedia, AppSettings) {
    return new HyMediaDirective($sce, $hyMedia, AppSettings);
  }

}

directivesModule.directive('hyMedia', HyMediaDirective.factory);
