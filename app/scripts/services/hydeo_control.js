import servicesModule from './_index';

class HydeoControl {
  setApi(api) {
    if (!this.api) {
      this.api = api;
    }
  }

  pause() {
    if (!this.isPause()) {
      this.api.pause();
    }
    this.overlay.show();
  }

  play() {
    if (!this.isPlay()) {
      this.api.play();
    }
    this.overlay.hide();
  }

  seek(time) {
    this.api.seekTime(time);
    this.play();
  }

  stop() {
    if (!this.isStop()) {
      this.api.stop();
    }
  }

  isPause() {
    return this.api.currentState === 'pause';
  }

  isPlay() {
    return this.api.currentState === 'play';
  }

  isStop() {
    return this.api.currentState === 'stop';
  }

  get currentTime() {
    return this.api.currentTime;
  }

  setOverlay(overlay) {
    this.overlay = overlay;
  }
}

servicesModule.factory('$hydeoControl', new HydeoControl());
