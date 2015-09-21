import servicesModule from './_index';

class HydeoControl {
  setApi(api) {
    if(!this.api) {
      this.api = api;
    }
  }

  pause() {
    if(!this.isPause()) {
      this.api.pause();
    }
  }

  play() {
    if(!this.isPlay()) {
      this.api.play();
    }
  }

  stop() {
    if(!this.isStop()) {
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
}

function $hydeoControl() {
  return new HydeoControl();
}

servicesModule.factory('$hydeoControl', $hydeoControl);
