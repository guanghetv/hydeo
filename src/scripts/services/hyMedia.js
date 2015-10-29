/**
 * @author centsent
 */
import angular from 'angular';
import servicesModule from './_index';
import {
  mediaState
}
from './../AppSettings';

const _mediaElement = new WeakMap();
const _hydeoElement = new WeakMap();

const fullScreenEvents = [
  // Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
  'fullscreenchange',
  // WebKit
  'webkitfullscreenchange',
  // Mozilla
  'mozfullscreenchange',
  // Microsoft
  'MSFullscreenChange',
  // Old Webkit
  'webkitfullscreenchange'
];
const fullScreenElements = [
  // Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
  'fullscreenElement',
  // Webkit
  'webkitFullscreenElement',
  // Old Webkit
  'webkitCurrentFullScreenElement',
  // Mozilla
  'mozFullScreenElement',
  // Microsoft
  'msFullscreenElement'
];

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
    // Fires when a user enter/exit fullscreen mode.
    this.onFullScreenChange();
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
   * Fires when the current playback position was changed.
   *
   * @param handler {Function} A function to execute each time the `timeupdate`
   * event is triggered.
   *
   */
  onTimeUpdate(handler) {
    this.bindEvent('timeupdate', event => {
      const target = event.target;
      this.currentTime = target.currentTime * 1000;

      if (target.duration !== Infinity) {
        this.totalTime = target.duration * 1000;
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
    if (this.isPlay) {
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
    let fullScreenElement;
    fullScreenElements.forEach(item => {
      if (document[item]) {
        fullScreenElement = document[item];
        return;
      }
    });

    if (fullScreenElement) {
      return true;
    }

    return false;
  }

  /**
   * Fires when a user enter/exit fullscreen mode.
   *
   * @param handler {Function} A function to execute each time enter/exit full screen
   * mode.
   */
  onFullScreenChange(handler) {
    const hydeoElement = _hydeoElement.get(this);

    hydeoElement.bind(fullScreenEvents.join(' '), event => {
      if (angular.isFunction(handler)) {
        handler(this.isFullScreen, event);
      }
    });
  }

  /**
   * Enter full screen mode.
   */
  requestFullScreen() {
    const element = _hydeoElement.get(this)[0];
    if (element.webkitRequestFullscreen) {
      // Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
      element.webkitRequestFullscreen();
    } else if (element.requestFullscreen) {
      // Webkit
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // Mozilla
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      // Microsoft
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullScreen) {
      // Old WebKit (Safari 5.1)
      element.webkitRequestFullScreen();
    }
  }

  /**
   * Exit full screen mode.
   */
  exitFullScreen() {
    if (document.exitFullscreen) {
      // Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // Webkit
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Mozilla
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      // Microsoft
      document.msExitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      // Old WebKit (Safari 5.1)
      document.webkitCancelFullScree();
    }
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
}

servicesModule.factory('$hyMedia', () => new HyMediaService());
