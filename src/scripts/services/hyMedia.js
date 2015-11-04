/**
 * @author centsent
 */
import angular from 'angular';
import servicesModule from './_index';
import FullscreenApi from '../utils/FullscreenApi';
import {mediaState} from './../AppSettings';

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
   * Fires when the audio/video was started or no longer paused.
   *
   * @param handler {Function} A function to execute each time the `play` event
   * is triggered.
   *
   */
  onPlay(handler) {
    this.bindEvent('play', event => {
      this.currentState = mediaState.PLAY;

      if (angular.isFunction(handler)) {
        handler(this.currentState, event);
      }
    });
  }

  /**
   * Fires when the audio/video was paused.
   *
   * @param handler {Function} A function to execute each time the `pause` event
   * is triggered.
   *
   */
  onPause(handler) {
    this.bindEvent('pause', event => {
      this.currentState = mediaState.PAUSE;

      if (angular.isFunction(handler)) {
        handler(this.currentState, event);
      }
    });
  }

  /**
   * Start buffering.
   *
   * @param handler {Function} A function to execute when audio/video starting buffering.
   *
   */
  onWaiting(handler) {
    this.bindEvent('waiting', event => {
      this.isBuffering = true;

      if (angular.isFunction(handler)) {
        handler(this.isBuffering, event);
      }
    });
  }

  /**
   * Fires when the audio/video resumed playing after been paused or stopped
   * for buffering.
   *
   * @param handler {Function} A function to execute when the audio/video is resumed playing.
   *
   */
  onPlaying(handler) {
    this.bindEvent('playing', event => {
      this.isBuffering = false;

      if (angular.isFunction(handler)) {
        handler(this.isBuffering, event);
      }
    });
  }

  /**
   * Fires when the audio/video is ready to play.
   *
   * @param handler {Function} A function to execute once the audio/video is ready to play.
   *
   */
  onCanPlay(handler) {
    this.bindEvent('canplay', event => {
      this.isBuffering = false;
      this.totaltime = event.target.duration;

      if (angular.isFunction(handler)) {
        handler(this.totalTime, this.isBuffering, event);
      }
    });
  }

  /**
   * Fires when the current playback position was changed.
   *
   * @param handler {Function} A function to execute each time the `timeupdate`
   * event is triggered.
   *
   */
  onTimeUpdate(handler) {
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

      if (angular.isFunction(handler)) {
        handler(this.currentTime, this.timeLeft, event);
      }
    });
  }

  /**
   * Fires when the browser is downloading the audio/video.
   *
   * @param handler {Function} A function to execute each time the `progress`
   * event is triggered.
   *
   */
  onProgress(handler) {
    this.bindEvent('progress', event => {
      this.buffered = event.target.buffered;
      this.totalTime = event.target.duration;

      if (this.buffered.length && this.totalTime) {
        this.bufferedEnd = this.buffered.end(this.buffered.length - 1);

        if (angular.isFunction(handler)) {
          handler(this.buffered, this.bufferedEnd, this.totalTime, event);
        }
      }
    });
  }

  /**
   * Fires when a user enter/exit fullscreen mode.
   *
   * @param handler {Function} A function to execute each time enter/exit full screen
   * mode.
   */
  onFullScreenChange(handler) {
    const hydeoElement = _hydeoElement.get(this)[0];

    FullscreenApi.onChange(hydeoElement, event => {
      if (angular.isFunction(handler)) {
        handler(this.isFullScreen, event);
      }
    });
  }

  /**
   * Fires when the volume has been changed.
   *
   * @param handler {Function} A function to execute each time change the audio/video volume.
   *
   */
  onVolumeChange(handler) {
    const mediaElement = _mediaElement.get(this);
    this.bindEvent('volumechange', event => {
      const volume = mediaElement.prop('volume');
      // TODO extract 100 to a configurable constant
      this.currentVolume = volume * 100;

      if (angular.isFunction(handler)) {
        handler(this.currentVolume, this.isMuted, event);
      }
    });
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
    const element = _hydeoElement.get(this)[0];
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
    const mediaElement = _mediaElement.get(this);

    if (!this.isPause && mediaElement) {
      mediaElement[0].pause();
      this.currentState = mediaState.PAUSE;
    }
  }

  /**
   * Starts playing the audio/video.
   */
  play() {
    const mediaElement = _mediaElement.get(this);

    if (!this.isPlay && mediaElement) {
      mediaElement[0].play();
      this.currentState = mediaState.PLAY;
    }
  }

  /**
   * Pauses the currently playing audio/video and reset current time to 0.
   */
  stop() {
    const mediaElement = _mediaElement.get(this);

    if (!this.isStop && mediaElement) {
      const elem = mediaElement[0];
      elem.pause();
      elem.currentTime = 0;
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
   * Replay the audio/video file currently loaded.
   */
  replay() {
    const elem = _mediaElement.get(this)[0];
    this.reset();
    elem.play();
  }

  /**
   * Resets the audio/video's play position to beginning and current state to nothing.
   */
  reset() {
    const mediaElement = _mediaElement.get(this);
    mediaElement.prop('currentTime', 0);
    this.currentState = null;
  }

}

servicesModule.factory('$hyMedia', () => new HyMediaService());
