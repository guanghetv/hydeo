
class Utils {

  static isFunction(fn) {
    return fn && typeof fn === 'function';
  }

  static isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
}

export default Utils;
