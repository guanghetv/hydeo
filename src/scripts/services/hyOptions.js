/**
 * @author centsent
 */
import servicesModule from './_index';

const attribute = new Map();
const listener = new Map();

class HyOptionsService {

  /**
   * Returns which keys permited to access.
   */
  keys() {
    return this.directiveKeys().concat(this.otherKeys());
  }

  /**
   * Keys to the hyHydeoDirective attrs.
   */
  directiveKeys() {
    return [
      'src', 'cuepoints', 'controls', 'autoplay', 'onReady'
    ];
  }

  /**
   * Store something others.
   */
  otherKeys() {
    return [
      'hydeoElement'
    ];
  }

  set(key, value) {
    if (!key) {
      return;
    }

    const isValidKey = this.keys().find((item) => item === key);
    if (!isValidKey) {
      return;
    }

    attribute.set(key, value);
    const handler = listener.get(key);

    if (handler && (typeof handler === 'function')) {
      handler(value);
    }
  }

  get(key) {
    return attribute.get(key);
  }

  observe(key, handler) {
    listener.set(key, handler);
  }

}

servicesModule.factory('$hyOptions', () => new HyOptionsService());
