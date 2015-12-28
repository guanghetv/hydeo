
class Utils {

  isFunction(fn) {
    return fn && typeof fn === 'function';
  }

  isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  }
}

export default Utils;
