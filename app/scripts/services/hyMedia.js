/**
 * TODO
 */
import servicesModule from './_index';

const _mediaElement = new WeakMap();

/**
 * TODO
 */
class HyMediaService {

  /**
   * TODO
   */
  setMediaElement(element) {
    _mediaElement.set(this, element);
  }

  /**
   * TODO
   */
  pause() {
  }

  /**
   * TODO
   */
  play() {
  }


  /**
   * TODO
   */
  set onPlay(onPlay) {
    const mediaElement = _mediaElement.get(this);
    mediaElement.bind('play', onPlay);
  }

  /**
   * TODO
   */
  seek(time) {
  }

  /**
   * TODO
   */
  stop() {
  }

  /**
   * TODO
   */
  isPause() {
  }

  /**
   * TODO
   */
  isPlay() {
  }

  /**
   * TODO
   */
  isStop() {
  }


  /**
   * TODO
   */
  static factory() {
    return new HyMediaService();
  }
}

servicesModule.factory('$hyMedia', HyMediaService.factory);
