/**
 * TODO
 */
import servicesModule from './_index';

const _mediaElement = new WeakMap();
const _AppSettings = new WeakMap();

/**
 * TODO
 */
class HyMediaService {

  constructor(AppSettings) {
    _AppSettings.set(this, AppSettings);
  }

  /**
   * TODO
   */
  setMediaElement(element) {
    _mediaElement.set(this, element);
  }

  /**
   * Pause.
   */
  pause() {
    const mediaElement = _mediaElement.get(this);
    const AppSettings = _AppSettings.get(this);

    if (this.isPause() && mediaElement) {
      mediaElement[0].pause();
      this.currentState = AppSettings.mediaState.pause;
    }
  }

  /**
   * Play.
   */
  play() {
    const mediaElement = _mediaElement.get(this);
    const AppSettings = _AppSettings.get(this);

    if (!this.isPlay() && mediaElement) {
      mediaElement[0].play();
      this.currentState = AppSettings.mediaState.play;
    }
  }

  /**
   * Pause and reset the video current time to 0.
   */
  stop() {
    const mediaElement = _mediaElement.get(this);
    const AppSettings = _AppSettings.get(this);

    if (!this.isStop() && mediaElement) {
      const elem = mediaElement[0];
      elem.pause();
      elem.currentTime = 0;
      this.currentState = AppSettings.mediaState.stop;
    }
  }


  /**
   * Trigger the handler when video is playing.
   */
  set onPlay(onPlay) {
    this.bindEvent('play', onPlay);
  }

  /**
   * Trigger the handler when video is pause.
   */
  set onPause(onPause) {
    this.bindEvent('pause', onPause);
  }

  /**
   * Trigger the handler when video is stop.
   */
  set onStop(onStop) {
    this.bindEvent('stop', onStop);
  }

  /**
   * Binding event to media element.
   */
  bindEvent(eventType, handler) {
    const mediaElement = _mediaElement.get(this);
    if (eventType && (typeof handler === 'function')) {
      mediaElement.bind(eventType, handler);
    }
  }

  /**
   * Seek a time point.
   */
  seek(time) {
    const mediaElement = _mediaElement.get(this);
    mediaElement[0].currentTime = time;
    this.currentTime = time * 1000;
  }

  /**
   * Check the video if paused.
   */
  isPause() {
    const AppSettings = _AppSettings.get(this);
    return this.currentState === AppSettings.mediaState.pause;
  }

  /**
   * Check the video if playing.
   */
  isPlay() {
    const AppSettings = _AppSettings.get(this);
    return this.currentState === AppSettings.mediaState.paly;
  }

  /**
   * Check the video if stop.
   */
  isStop() {
    const AppSettings = _AppSettings.get(this);
    return this.currentState === AppSettings.mediaState.stop;
  }


  /**
   * @ngInject
   */
  static factory(AppSettings) {
    return new HyMediaService(AppSettings);
  }
}

servicesModule.factory('$hyMedia', HyMediaService.factory);
