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

  /**
   *
   */
  static factory() {
    return new HyMediaService();
  }
}

servicesModule.factory('$hyMedia', HyMediaService.factory);
