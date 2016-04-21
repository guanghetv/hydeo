import { isFunction } from './utils';
import { PLAY, PAUSE, STOP } from './utils/State';
import FullScreenApi from './utils/FullScreenApi';

export default class MediaPlayer {

  constructor(container, media, options) {
    this.container = container;
    this.media = media;
    this.options = options;
    this.onTimeUpdate();
    this.onLoadedData();
  }

  on(eventType, handler) {
    this.media.addEventListener(eventType, handler);
  }

  onTimeUpdate(handler, thisArg) {
    this.on('timeupdate', (event) => {
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

      if (isFunction(handler)) {
        handler.call(thisArg, this.currentTime, this.timeLeft, event);
      }
    });
  }

  onProgress(handler, thisArg) {
    this.on('progress', (event) => {
      this.buffered = event.target.buffered;

      if (this.buffered.length && this.totalTime) {
        this.bufferedEnd = this.buffered.end(this.buffered.length - 1);

        if (isFunction(handler)) {
          handler.call(thisArg, this.buffered, this.bufferedEnd, this.totalTime, event);
        }
      }
    });
  }

  onLoadedData(handler, thisArg) {
    this.on('loadeddata', (event) => {
      this.totalTime = event.target.duration;

      if (isFunction(handler)) {
        handler.call(thisArg, this.totalTime);
      }
    });
  }

  onPlay(handler, thisArg) {
    this.on('play', (event) => {
      this.currentState = PLAY;

      if (isFunction(handler)) {
        handler.call(thisArg, this.currentState, event);
      }
    });
  }

  onPause(handler, thisArg) {
    this.on('pause', (event) => {
      this.currentState = PAUSE;

      if (isFunction(handler)) {
        handler.call(thisArg, this.currentState, event);
      }
    });
  }

  onFullScreenChange(handler, thisArg) {
    FullScreenApi.onChange(this.container, (event) => {
      if (isFunction(handler)) {
        handler.call(thisArg, this.isFullScreen, event);
      }
    });
  }

  checkCuepoints() {
    const cuepoints = this.options.cuepoints;

    if (!cuepoints) {
      return;
    }

    const currentSecond = parseInt(this.currentTime, 10);
    cuepoints.forEach((item) => {
      const cuepoint = item;
      const start = parseInt(cuepoint.time, 10);

      if (currentSecond === start) {
        if (isFunction(cuepoint.onEnter) && !cuepoint._isDirty) {
          cuepoint.onEnter(this.currentTime, cuepoint.params);
        }
        cuepoint._isDirty = true;
      }

      if (currentSecond > start) {
        if (isFunction(cuepoint.onComplete)) {
          cuepoint.onComplete(this.currentTime, cuepoint.params);
        }
        cuepoint._isDirty = false;
      }

      if (currentSecond < start) {
        cuepoint._isDirty = false;
      }
    });
  }

  togglePlay() {
    if (this.isPlay) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    if (!this.isPlay) {
      this.media.play();
      this.currentState = PLAY;
    }
  }

  pause() {
    if (!this.isPause) {
      this.media.pause();
      this.currentState = PAUSE;
    }
  }

  stop() {
    if (!this.isStop) {
      this.media.pause();
      this.media.currentTime = 0;
      this.currentState = STOP;
    }
  }

  seek(time) {
    const media = this.media;
    media.currentTime = time;
    this.beforeSeekTime = this.currentTime;
    this.currentTime = time;
  }

  get isPlay() {
    return this.currentState === PLAY;
  }

  get isPause() {
    return this.currentState === PAUSE;
  }

  get isStop() {
    return this.currentState === STOP;
  }

  get isFullScreen() {
    return FullScreenApi.isFullscreen();
  }

  requestFullScreen() {
    FullScreenApi.request(this.container);
  }

  exitFullScreen() {
    FullScreenApi.exit();
  }

  toggleFullScreen() {
    if (this.isFullScreen) {
      this.exitFullScreen();
    } else {
      this.requestFullScreen();
    }
  }
}
