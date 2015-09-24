import _ from 'lodash';

/**
 * For displaying cuepoints and controling the events.
 */
class CuePoint {

  /* Events */

  /**
   * Callback function that will be called when timeline reach to the time
   * property.
   */
  onEnter(currentTime, timeLapse, params) {
    const callbackParameters = {
      currentTime: currentTime,
      timeLapse: timeLapse,
      params: params
    };

    this.current = this.current || _.assign(callbackParameters, cp);
    this.showOverlay();
  }

  /**
   * Callback function that will be called when the progress is over the time
   * property.
   */
  onComplete() {
    const cp = this.current;

    if (cp && _.isFunction(cp.onLeave)) {
      cp.onLeave(cp.currentTime, cp.timeLapse, cp.params);
    }

    delete this.current;
  }

  /**
   * Callback function that will be called when the progress is in the time
   * property.
   */
  onUpdate() {
  }

  onLeave() {
  }

  /* Functions */

  /**
   * Convert to vgCuePoints.
   */
  toVgCuePoints(cp) {
    if (_.isEmpty(cp)) {
      return null;
    }

    const result = {
      list: []
    };

    if (_.isArray(cp)) {
      cp.forEach((item) => {
        this.toVgCuePoints(item);
        result.list.push(item);
      });
    } else {
      const onEnter = cp.onEnter;
      cp.timeLapse = {
        start: cp.time
      };

      if (_.isPlainObject(cp.time)) {
        cp.timeLapse = cp.time;
      }

      cp.onEnter = (currentTime, timeLapse, params) => {
        this.onEnter(currentTime, timeLapse, params);
        if (_.isFunction(onEnter)) {
          onEnter(currentTime, timeLapse, params);
        }
      };

      cp.onComplete = this.onComplete;
      result.list.push(cp);
    }

    return result;
  }
}

module.exports = CuePoint;
