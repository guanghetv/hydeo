/**
 * TODO
 */
import directivesModule from './_index';
import template from '../../views/directives/hyMedia.html';

const _sce = new WeakMap();
const _scope = new WeakMap();
const _hyMedia = new WeakMap();
const _AppSettings = new WeakMap();
// Mapping media event to function of HyMediaDirective class.
const eventMap = {
  canplay: 'onCanPlay',
  abort: 'onAbort',
  ended: 'onEnded',
  error: 'onErroe',
  loadedmetadata: 'onLoadedMetaData',
  pause: 'onPause',
  play: 'onPlay',
  playing: 'onPlaying',
  seeked: 'onSeeked',
  seeking: 'onSeeking',
  onvolumechange: 'onVolumeChange',
  waiting: 'onWaiting',
  timeupdate: 'onTimeUpdate',
  progress: 'onProgress',
  ratechange: 'onRateChange',
  playbackchange: 'onPlayBackChange'
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
  link($scope, elem) {
    const $hyMedia = _hyMedia.get(this);
    // TODO detecting media type.
    // TODO video should be configurable by an options param.
    // only support video for now.
    this.mediaElement = elem.find('video');
    $hyMedia.setMediaElement(this.mediaElement);

    _scope.set(this, $scope);
    this.settings();
    this.addListeners();
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
  }

  /**
   * TODO
   */
  addListeners() {
    const elem = this.mediaElement;
    for (const eventName in eventMap) {
      const method = eventMap[eventName];
      if (method && this[method]) elem.bind(eventName, this::this[method]);
    }
  }

  /**
   * TODO
   */
  onPlay() {
    const $hyMedia = _hyMedia.get(this);
    const AppSettings = _AppSettings.get(this);

    $hyMedia.currentState = AppSettings.mediaState.play;
  }

  /**
   * TODO
   */
  onPause() {
    const $hyMedia = _hyMedia.get(this);
    const AppSettings = _AppSettings.get(this);

    $hyMedia.currentState = AppSettings.mediaState.pause;
  }

  /**
   * TODO
   */
  onPlaying() {
    const $hyMedia = _hyMedia.get(this);
    $hyMedia.isBuffering = false;
  }

  /**
   * TODO
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
   * TODO
   */
  static factory($sce, $hyMedia, AppSettings) {
    return new HyMediaDirective($sce, $hyMedia, AppSettings);
  }

}

directivesModule.directive('hyMedia', HyMediaDirective.factory);
