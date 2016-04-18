/*
 * Store the browser-specific methods for the fullscreen API
 * @type {Object|undefined}
 * @private
 */
let FullscreenApi = {};

const apiMap = {
  // Spec: https://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
  w3: {
    enabled: 'fullscreenEnabled',
    element: 'fullscreenElement',
    request: 'requestFullscreen',
    exit: 'exitFullscreen',
    onChange: 'fullscreenchange',
    onError: 'fullscreenerror',
  },
  // Webkit
  newWebkit: {
    enabled: 'webkitFullscreenEnabled',
    element: 'webkitFullscreenElement',
    request: 'webkitRequestFullscreen',
    exit: 'webkitExitFullscreen',
    onChange: 'webkitfullscreenchange',
    onError: 'webkitfullscreenerror',
  },
  // Old Webkit
  oldWebkit: {
    enabled: 'webkitIsFullScreen',
    element: 'webkitCurrentFullScreenElement',
    request: 'webkitRequestFullScreen',
    exit: 'webkitCancelFullScreen',
    onChange: 'webkitfullscreenchange',
    onError: 'webkitfullscreenerror',
  },
  // Mozilla
  moz: {
    enabled: 'mozFullScreen',
    element: 'mozFullScreenElement',
    request: 'mozRequestFullScreen',
    exit: 'mozCancelFullScreen',
    onChange: 'mozfullscreenchange',
    onError: 'mozfullscreenerror',
  },
  // iOS
  ios: {
    enabled: 'webkitFullscreenEnabled',
    element: 'webkitFullscreenElement',
    request: 'webkitEnterFullscreen',
    exit: 'webkitExitFullscreen',
    onChange: 'webkitfullscreenchange',
    onError: 'webkitfullscreenerror',
  },
  // Microsoft
  ms: {
    enabled: 'msFullscreenEnabled',
    element: 'msFullscreenElement',
    request: 'msRequestFullscreen',
    exit: 'msExitFullscreen',
    onChange: 'MSFullscreenChange',
    onError: 'MSFullscreenError',
  },
};

for (const browser in apiMap) {
  if (apiMap[browser].enabled in document) {
    FullscreenApi = apiMap[browser];
    break;
  }
}

export default {
  /**
   * Enter full screen mode.
   *
   * @param element {*} An html DOM element.
   *
   */
  request(element) {
    element[FullscreenApi.request]();
  },

  /**
   * Exit full screen mode.
   */
  exit() {
    document[FullscreenApi.exit]();
  },

  /**
   * Determine a user enter/exit the full screen mode.
   */
  isFullscreen() {
    return document[FullscreenApi.element] !== null;
  },

  /**
   * Add an onFullScreenChange event to the element.
   *
   * @param element {*} An html DOM element.
   * @param handler {Function} A function to execute when user enter/exit the
   * full screen mode.
   *
   */
  onChange(element, handler) {
    element.addEventListener(FullscreenApi.onChange, handler);
  },
};
