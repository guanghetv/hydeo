import servicesModule from './_index';

const _api = new WeakMap();

/**
 *
 */
class HyMediaService {

  /**
   *
   */
  setApi(api) {
    _api.set(this, api);
  }

  /**
   *
   */
  pause() {
    const api = _api.get(this);
    if (!this.isPause()) {
      api.pause();
    }
    // this.overlay.show();
  }

  /**
   *
   */
  play() {
    const api = _api.get(this);
    if (!this.isPlay()) {
      api.play();
    }
    // this.overlay.hide();
  }


  /**
   *
   */
  set onPlay(onPlay) {
    const api = _api.get(this);
    const mediaElement = api.mediaElement[0];

    mediaElement.addEventListener('play', onPlay);
  }

  /**
   *
   */
  seek(time) {
    const api = _api.get(this);
    api.seekTime(time);
    this.play();
  }

  /**
   *
   */
  stop() {
    const api = _api.get(this);
    if (!this.isStop()) {
      api.stop();
    }
  }

  /**
   *
   */
  isPause() {
    const api = _api.get(this);
    return api.currentState === 'pause';
  }

  /**
   *
   */
  isPlay() {
    const api = _api.get(this);
    return api.currentState === 'play';
  }

  /**
   *
   */
  isStop() {
    const api = _api.get(this);
    return api.currentState === 'stop';
  }


  /*
   *
   */
  get totalTime() {
    const api = _api.get(this);
    return api.totalTime;
  }

  /**
   *
   */
  static factory() {
    return new HyMediaService();
  }
}

servicesModule.factory('$hyMedia', HyMediaService.factory);
