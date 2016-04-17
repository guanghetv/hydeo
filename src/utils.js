
export function isFunction(fn) {
  return fn && typeof fn === 'function';
}

export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}
