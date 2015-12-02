/**
 * @author centsent
 */
import angular from 'angular';
import servicesModule from './_index';
import FullscreenApi from '../utils/FullscreenApi';
import {
  mediaState
}
from './../AppSettings';

const _mediaElement = new WeakMap();
const _hyOptions = new WeakMap();

/**
 * Provide APIs and event bindings for audio/video.
 */
class HyMediaService {

  constructor($hyOptions) {
    _hyOptions.set(this, $hyOptions);
  }

  /**
   * Fires when the audio/video was started or no longer paused.
   *
   * @param handler {Function} A function to execute each time the `play` event
   * is triggered.
   * @param thisArg {Object} The this binding of handler.
   *
   */
  onPlay(handler, thisArg) {
    this.bindEvent('play', event => {
      this.currentState = mediaState.PLAY;

      if (angular.isFunction(handler)) {
        handler.call(thisArg, this.currentState, event);
      }
    });
  }

  /**
   * Fires when the audio/video was paused.
   *
   * @param handler {Function} A function to execute each time the `pause` event
   * is triggered.
   * @param thisArg {Object} The this binding of handler.
   *
   */
  onPause(handler, thisArg) {
    this.bindEvent('pause', event => {
      this.currentState = mediaState.PAUSE;

      if (angular.isFunction(handler)) {
        handler.call(thisArg, this.currentState, event);
      }
    });
  }

  /**
   * Start buffering.
   *
   * @param handler {Function} A function to execute when audio/video starting buffering.
   * @param thisArg {Object} The this binding of handler.
   *
   */
  onWaiting(handler, thisArg) {
    this.bindEvent('waiting', event => {
      this.isBuffering = true;

      if (angular.isFunction(handler)) {
        handler.call(thisArg, this.isBuffering, event);
      }
    });
  }

  /**
   * Fires when the audio/video resumed playing after been paused or stopped
   * for buffering.
   *
   * @param handler {Function} A function to execute when the audio/video is resumed playing.
   * @param thisArg {Object} The this binding of handler.
   */
  onPlaying(handler, thisArg) {
    this.bindEvent('playing', event => {
      this.isBuffering = false;

      if (angular.isFunction(handler)) {
        handler.call(thisArg, this.isBuffering, event);
      }
    });
  }

  /**
   * Fires when the audio/video is ready to play.
   *
   * @param handler {Function} A function to execute once the audio/video is ready to play.
   * @param thisArg {Object} The this binding of handler.
   *
   */
  onCanPlay(handler, thisArg) {
    this.bindEvent('canplay', event => {
      this.isBuffering = false;
      this.totaltime = event.target.duration;

      if (angular.isFunction(handler)) {
        handler.call(thisArg, this.totalTime, this.isBuffering, event);
      }
    });
  }

  /**
   * Fires when the current playlist is ended.
   *
   * @param handler {Function} A function to execute when the audio/video is ended.
   * @param thisArg {Object} The this binding of handler.
   *
   */
  onEnded(handler, thisArg) {
    this.bindEvent('ended', event => {
      if (angular.isFunction(handler)) {
        handler.call(thisArg, event);
      }
    });
  }

  /**
   * Fires when the current playback position was changed.
   *
   * @param handler {Function} A function to execute each time the `timeupdate`
   * event is triggered.
   * @param thisArg {Object} The this binding of handler.
   *
   */
  onTimeUpdate(handler, thisArg) {
    this.bindEvent('timeupdate', event => {
      const target = event.target;
      this.currentTime = target.currentTime;

      if (target.duration !== Infinity) {
        this.totalTime = target.duration;
        this.timeLeft = this.totalTime - this.currentTime;
        this.isLive = false;
      } else {
        this.isLive = true;
      }

      this.checkCuepoints();

      if (angular.isFunction(handler)) {
        handler.call(thisArg, this.currentTime, this.timeLeft, event);
      }
    });
  }

  /**
   * Check if reached the cuepoint.
   */
  checkCuepoints() {
    const $hyOptions = _hyOptions.get(this);
    const cuepoints = $hyOptions.get('cuepoints');

    if (!cuepoints) {
      return;
    }

    const currentSecond = parseInt(this.currentTime, 10);
    cuepoints.forEach(cuepoint => {
      const start = parseInt(cuepoint.time, 10);

      if (currentSecond === start) {
        if (angular.isFunction(cuepoint.onEnter) && !cuepoint.$$isDirty) {
          cuepoint.onEnter(this.currentTime, cuepoint.params);
        }
        cuepoint.$$isDirty = true;
      }

      if (currentSecond > start) {
        if (angular.isFunction(cuepoint.onComplete)) {
          cuepoint.onComplete(this.currentTime, cuepoint.params);
        }
        cuepoint.$$isDirty = false;
      }

      if (currentSecond < start) {
        cuepoint.$$isDirty = false;
      }
    });
  }

  /**
   * Fires when the browser is downloading the audio/video.
   *
   * @param handler {Function} A function to execute each time the `progress`
   * event is triggered.
   * @param thisArg {Object} The this binding of handler.
   *
   */
  onProgress(handler, thisArg) {
    this.bindEvent('progress', event => {
      this.buffered = event.target.buffered;

      if (this.buffered.length && this.totalTime) {
        this.bufferedEnd = this.buffered.end(this.buffered.length - 1);

        if (angular.isFunction(handler)) {
          handler.call(thisArg, this.buffered, this.bufferedEnd, this.totalTime, event);
        }
      }
    });
  }

  /**
   * Fires when a user enter/exit fullscreen mode.
   *
   * @param handler {Function} A function to execute each time enter/exit full screen
   * mode.
   * @param thisArg {Object} The this binding of handler.
   *
   */
  onFullScreenChange(handler, thisArg) {
    const $hyOptions = _hyOptions.get(this);
    const hydeoElement = $hyOptions.get('hydeoElement')[0];

    FullscreenApi.onChange(hydeoElement, event => {
      if (angular.isFunction(handler)) {
        handler.call(thisArg, this.isFullScreen, event);
      }
    });
  }

  /**
   * Fires when the browser starts looking for the audio/video.
   */
  onLoad(handler, thisArg) {
    this.bindEvent('loadstart', event => {
      if (angular.isFunction(handler)) {
        handler.call(thisArg, event);
      }
    });
  }

  /**
   * Fires when the loading of an audio/video is aborted.
   */
  onAbort(handler, thisArg) {
    this.bindEvent('abort', event => {
      if (angular.isFunction(handler)) {
        handler.call(thisArg, event);
      }
    });
  }

  /**
   * Fires when the user starts moving/skipping to a new position in the audio/video.
   * @param handler {Function} A function to execute each time the user moving/skiping to a new position.
   * @param thisArg {Object} The this binding of handler.
   *
   */
  onSeeking(handler, thisArg) {
    this.bindEvent('seeking', event => {
      if (angular.isFunction(handler)) {
        handler.call(thisArg, event);
      }
    });
  }

  /**
   * Fires when the user is finished moving/skipping to a new position in the audio/video.
   *
   * @param handler {Function} A function to execute when the user is finished moving/skiping
   * to a new position in the audio/video.
   * @param thisArg {Object} The this binding of handler.
   */
  onSeeked(handler, thisArg) {
    this.bindEvent('seeked', event => {
      if (angular.isFunction(handler)) {
        handler.call(thisArg, event);
      }
    });
  }

  /**
   * Fires when an error occurred during the loading of an audio/video.
   *
   * @param handler {Function} A function to execute when an error occurred.
   * @param thisArg {Object} The this binding of handler.
   */
  onError(handler, thisArg) {
    this.bindEvent('error', event => {
      if (angular.isFunction(handler)) {
        handler.call(thisArg, event);
      }
    });
  }

  /**
   * Fires when the volume has been changed.
   *
   * @param handler {Function} A function to execute each time change the audio/video volume.
   * @param thisArg {Object} The this binding of handler.
   *
   */
  onVolumeChange(handler, thisArg) {
    this.bindEvent('volumechange', event => {
      if (angular.isFunction(handler)) {
        handler.call(thisArg, this.currentVolume, this.isMuted, event);
      }
    });
  }

  /**
   * Fires when the browser has loaded the current frame of the audio/video.
   *
   * @param handler {Function} A function to execute when loaded the audio/video.
   * @param thisArg {Object} The this binding of handler.
   *
   */
  onLoaded(handler, thisArg) {
    this.bindEvent('loadeddata', event => {
      this.reset();
      this.totalTime = event.target.duration;

      if (angular.isFunction(handler)) {
        handler.call(thisArg, this.totalTime);
      }
    });
  }

  /**
   * Returns the volume of the audio/video.
   */
  get currentVolume() {
    const mediaElement = _mediaElement.get(this);
    const volume = mediaElement.prop('volume');
    // TODO extract 100 to a configurable constant
    return this.isMuted ? 0 : volume * 100;
  }

  /**
   * Check whether the audio/video is paused or not.
   *
   * @returns {boolean} Returns `true` for the audio/video is paused, else `false`.
   */
  get isPause() {
    return this.currentState === mediaState.PAUSE;
  }

  /**
   * Check whether the audio/video is on playing or not.
   *
   * @returns {boolean} Returns `true` in case the audio/video is playing, else `false`.
   */
  get isPlay() {
    return this.currentState === mediaState.PLAY;
  }

  /**
   * Check whether the audio/video is stopped or not.
   *
   * @return {boolean} Returns `true` in case the audio/video is stopped, else `false`.
   */
  get isStop() {
    return this.currentState === mediaState.STOP;
  }

  get isAutoplay() {
    const element = _mediaElement.get(this);
    return element.prop('autoplay');
  }

  /**
   * Determine a user enter/exit the full screen mode.
   */
  get isFullScreen() {
    return FullscreenApi.isFullscreen();
  }

  /**
   * Return `true` if the audio/video is muted, else `false`.
   *
   * @returns {boolean} Returns whether the audio/video is muted or not.
   */
  get isMuted() {
    const mediaElement = _mediaElement.get(this);
    return mediaElement.prop('muted');
  }

  /**
   * Returns whether the playback of the audio/video has ended or not.
   */
  get isEnded() {
    const mediaElement = _mediaElement.get(this);
    return mediaElement.prop('ended');
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
    mediaElement.prop('currentTime', time);
    this.currentTime = time;
  }

  /**
   * Play the audio/video if it's paused, else pause it.
   *
   * @param onPlay {Function} A function to execute when the audio/video is starting to play.
   * @param onPause {Function} A function to execute when the audio/video is starting to pause.
   *
   */
  togglePlay(onPlay, onPause) {
    this.onPause(onPause);
    this.onPlay(onPlay);

    if (this.isPlay) {
      this.pause();
    } else {
      this.play();
    }
  }

  /**
   * Enter full screen mode.
   */
  requestFullScreen() {
    const $hyOptions = _hyOptions.get(this);
    const element = $hyOptions.get('hydeoElement')[0];
    FullscreenApi.request(element);
  }

  /**
   * Exit full screen mode.
   */
  exitFullScreen() {
    FullscreenApi.exit();
  }

  /**
   * Change the audio/video volume level.
   *
   * @param level {number} A number range from 0 to 100.
   *
   */
  volume(level) {
    if (!level || level < 0 || level > 100) {
      return;
    }

    const mediaElement = _mediaElement.get(this);
    // TODO extract 100 to a configurable constant.
    const volume = level / 100;
    mediaElement.prop('volume', volume);
  }

  /**
   * Enter the full screen mode if not being displayed full-screen, else exit.
   */
  toggleFullScreen() {
    if (this.isFullScreen) {
      this.exitFullScreen();
    } else {
      this.requestFullScreen();
    }
  }

  /**
   * Pauses the currently playing audio/video.
   */
  pause() {
    const mediaElement = _mediaElement.get(this)[0];

    if (!this.isPause) {
      mediaElement.pause();
      this.currentState = mediaState.PAUSE;
    }
  }

  /**
   * Starts playing the audio/video.
   */
  play() {
    const mediaElement = _mediaElement.get(this)[0];

    if (!this.isPlay) {
      mediaElement.play();
      this.currentState = mediaState.PLAY;
    }
  }

  /**
   * Pauses the currently playing audio/video and reset current time to 0.
   */
  stop() {
    const mediaElement = _mediaElement.get(this)[0];

    if (!this.isStop) {
      mediaElement.pause();
      mediaElement.currentTime = 0;
      this.currentState = mediaState.STOP;
    }
  }

  /**
   * Sets the audio/video is muted.
   */
  mute() {
    const mediaElement = _mediaElement.get(this);
    mediaElement.prop('muted', true);
  }

  /**
   * Sets the audio/video to unmute.
   */
  unmute() {
    const mediaElement = _mediaElement.get(this);
    mediaElement.prop('muted', false);
  }

  /**
   * Switch the audio/video to muted whether is not muted or vice verse.
   */
  toggleMuted() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  /**
   * Returns a TimeRanges object representing the seekable parts of the audio/video.
   */
  seekable() {
    const mediaElement = _mediaElement.get(this);
    return mediaElement.prop('seekable');
  }

  /**
   * Replay the audio/video file currently loaded.
   */
  replay() {
    const elem = _mediaElement.get(this)[0];
    this.reset();
    elem.play();
  }

  /**
   * Resets the audio/video's play position to beginning.
   */
  reset() {
    const mediaElement = _mediaElement.get(this);
    this.currentTime = 0;
    this.timeLeft = 0;
    this.totalTime = 0;
    this.currentState = undefined;
    mediaElement.prop('currentTime', 0);
  }

  /**
   * Change the current source of the audio/video element.
   */
  changeSource(source) {
    const mediaElement = _mediaElement.get(this);
    mediaElement.prop('src', source);
  }

  /**
   * Everything is ready.
   */
  ready(mediaElement) {
    const $hyOptions = _hyOptions.get(this);
    const autoplay = $hyOptions.get('autoplay');
    const onReady = $hyOptions.get('onReady');
    const propertyNames = Object.getOwnPropertyNames(HyMediaService.prototype);
    const events = propertyNames.filter((name) => name.match('^on[A-Z]'));

    _mediaElement.set(this, mediaElement);
    mediaElement.prop('autoplay', autoplay);

    if (autoplay) this.currentState = mediaState.PLAY;
    if (angular.isFunction(onReady)) onReady();

    // binding default player events.
    events.map((event) => this[event]());
  }

}

// @ngInject
servicesModule.factory('$hyMedia', ($hyOptions) => new HyMediaService($hyOptions));
