
export function isFunction(fn) {
  return fn && typeof fn === 'function';
}

export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}


/**
 * Creates a function that, when executed, will only call the `func`
 * function at most once per every `wait` milliseconds. If the throttled
 * function is invoked more than once during the `wait` timeout, `func` will
 * also be called on the trailing edge of the timeout. Subsequent calls to the
 * throttled function will return the result of the last `func` call.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to throttle.
 * @param {Number} wait The number of milliseconds to throttle executions to.
 * @returns {Function} Returns the new throttled function.
 *
 */
export function throttle(func, wait) {
  let result;
  let args;
  let thisArg;
  let timeoutId;
  let lastCalled = 0;

  function trailingCall() {
    lastCalled = new Date();
    timeoutId = null;
    result = func.apply(thisArg, args);
  }

  return function fn(...params) {
    const now = new Date();
    const remaining = wait - (now - lastCalled);
    args = params;
    thisArg = this;

    if (remaining <= 0) {
      clearTimeout(timeoutId);
      lastCalled = now;
      result = func.apply(thisArg, args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(trailingCall, remaining);
    }

    return result;
  };
}
