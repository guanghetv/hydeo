import { isFunction } from './utils';

export default class MediaPlayer {

  constructor(media, options) {
    this.media = media;
    this.options = options;
    this.onTimeUpdate();
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

}
