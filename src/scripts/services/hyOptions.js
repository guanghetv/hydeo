import Utils from '../utils/Utils';

const attribute = new Map();
const listener = new Map();

class HyOptionsService {

  set(key, value) {
    if (!key) {
      return;
    }

    attribute.set(key, value);
    const handler = listener.get(key);

    if (Utils.isFunction(handler)) {
      handler(value);
    }
  }

  get(key) {
    return attribute.get(key);
  }

  observe(key, handler) {
    listener.set(key, handler);
  }

  flush() {
    attribute.clear();
    listener.clear();
  }

}

export default {
  name: '$hyOptions',
  fn: HyOptionsService,
};
