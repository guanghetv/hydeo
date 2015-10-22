/**
 * @author centsent
 */
import angular from 'angular';
import servicesModule from './_index';
import AppSettings from './../AppSettings';

const _mediaElement = new WeakMap();
const _hydeoElement = new WeakMap();

/**
 * Provide APIs and event bindings for audio/video.
 */
class HyMediaService {

  /**
   * Store the hydeo element.
   */
  setHydeoElement(element) {
    _hydeoElement.set(this, element);
  }

  /**
   * Store the audio/video element.
   */
  setMediaElement(element) {
    _mediaElement.set(this, element);
  }

  /**
   * Pauses the currently playing audio/video.
   */
  pause() {
    const mediaElement = _mediaElement.get(this);

    if (!this.isPause() && mediaElement) {
      mediaElement[0].pause();
      this.currentState = AppSettings.mediaState.PAUSE;
    }
  }

  /**
   * Starts playing the audio/video.
   */
  play() {
    const mediaElement = _mediaElement.get(this);

    if (!this.isPlay() && mediaElement) {
      mediaElement[0].play();
      this.currentState = AppSettings.mediaState.PLAY;
    }
  }

  /**
   * Pauses the currently playing audio/video and reset current time to 0.
   */
  stop() {
    const mediaElement = _mediaElement.get(this);

    if (!this.isStop() && mediaElement) {
      const elem = mediaElement[0];
      elem.pause();
      elem.currentTime = 0;
      this.currentState = AppSettings.mediaState.STOP;
    }
  }

  /**
   * Fires when the audio/video was started or no longer paused.
   *
   * @param handler {Function} A function to execute each time the `play` event
   * is triggered.
   *
   */
  onPlay(handler) {
    if (angular.isFunction(handler)) {
      this.bindEvent('play', handler);
    }
  }

  /**
   * Fires when the audio/video was paused.
   *
   * @param handler {Function} A function to execute each time the `pause` event
   * is triggered.
   *
   */
  onPause(handler) {
    if (angular.isFunction(handler)) {
      this.bindEvent('pause', handler);
    }
  }

  /**
   * Fires when the current playback position was changed.
   *
   * @param handler {Function} A function to execute each time the `timeupdate`
   * event is triggered.
   *
   */
  onTimeUpdate(handler) {
    if (angular.isFunction(handler)) {
      this.bindEvent('timeupdate', handler);
    }
  }

  /**
   * Fires when the browser is downloading the audio/video.
   *
   * @param handler {Function} A function to execute each time the `progress`
   * event is triggered.
   *
   */
  onProgress(handler) {
    if (angular.isFunction(handler)) {
      this.bindEvent('progress', handler);
    }
  }

  /**
   * Attach a handler to an event for the video/audio elements.
   *
   * @param eventType {String} A string containing a DOM event types.
   * @param handler {Function} A function to execute each time the event is triggered.
   */
  bindEvent(eventType, handler) {
    const mediaElement = _mediaElement.get(this);
    if (eventType && angular.isFunction(handler)) {
      mediaElement.bind(eventType, handler);
    }
  }

  /**
   * Moving/skipping to a new position in the audio/video.
   *
   * @param time {number} A time point in second.
   */
  seek(time) {
    const mediaElement = _mediaElement.get(this);
    mediaElement[0].currentTime = time;
    this.currentTime = time * 1000;
  }

  /**
   * Play the audio/video if it's paused, else pause it.
   */
  togglePlay() {
    if (this.isPlay()) {
      this.pause();
    } else {
      this.play();
    }
  }

  /**
   * Check whether the audio/video is paused or not.
   *
   * @returns {boolean} Returns `true` for the audio/video is paused, else `false`.
   */
  isPause() {
    return this.currentState === AppSettings.mediaState.PAUSE;
  }

  /**
   * Check whether the audio/video is on playing or not.
   *
   * @returns {boolean} Returns `true` in case the audio/video is playing, else `false`.
   */
  isPlay() {
    return this.currentState === AppSettings.mediaState.PLAY;
  }

  /**
   * Check whether the audio/video is stopped or not.
   *
   * @return {boolean} Returns `true` in case the audio/video is stopped, else `false`.
   */
  isStop() {
    return this.currentState === AppSettings.mediaState.STOP;
  }

  toggleFullScreen() {
    const hydeoElement = _hydeoElement.get(this);
    if (!this.isFullScreen) {
      hydeoElement[0].webkitRequestFullscreen();
      this.isFullScreen = true;
    } else {
      hydeoElement[0].webkitExitFullscreen();
      this.isFullScreen = false;
    }
  }
}

/**
 * @ngInject
 */
const factory = () => {
  return new HyMediaService();
};

servicesModule.factory('$hyMedia', factory);
