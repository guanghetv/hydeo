/**
 * @author centsent
 */
import servicesModule from './_index';

const map = new Map();
const listeners = new Map();

class HyOptionsService {

  /**
   * Returns which keys permited to access.
   */
  keys() {
    return [
      'src', 'cuepoints', 'controls', 'autoplay', 'onReady'
    ];
  }

  set(key, value) {
    if (!key) {
      return;
    }

    const validKey = this.keys().find((item) => item === key);
    if (!validKey) {
      return;
    }

    map.set(key, value);
    const handler = listeners.get(key);

    if (handler && (typeof handler === 'function')) {
      handler(value);
    }
  }

  get(key) {
    return map.get(key);
  }

  observe(key, handler) {
    listeners.set(key, handler);
  }

}

servicesModule.factory('$hyOptions', () => new HyOptionsService());
