import servicesModule from './_index';

/**
 *
 */
class HyMediaService {

  /**
   *
   */
  pause() {
    if (!this.isPause()) {
      this.api.pause();
    }
    this.overlay.show();
  }

  /**
   *
   */
  play() {
    if (!this.isPlay()) {
      this.api.play();
    }
    this.overlay.hide();
  }

  /**
   *
   */
  seek(time) {
    this.api.seekTime(time);
    this.play();
  }

  /**
   *
   */
  stop() {
    if (!this.isStop()) {
      this.api.stop();
    }
  }

  /**
   *
   */
  isPause() {
    return this.api.currentState === 'pause';
  }

  /**
   *
   */
  isPlay() {
    return this.api.currentState === 'play';
  }

  /**
   *
   */
  isStop() {
    return this.api.currentState === 'stop';
  }

  /**
   *
   */
  static factory() {
    return new HyMediaService();
  }
}

servicesModule.factory('$hyMedia', HyMediaService.factory);
