import directivesModule from './_index';
import template from '../../views/directives/hyCuepoint.html';

const _scope = new WeakMap();
const _hyMedia = new WeakMap();
const _hydeoController = new WeakMap();

/**
 *
 */
class CuepointDirective {

  constructor($hyMedia) {
    this.restrict = 'E';
    this.template = template;
    this.require = '^hyHydeo';
    this.scope = {
      cuepoints: '='
    };

    _hyMedia.set(this, $hyMedia);
  }

  /**
   *
   */
  compile() {
    return this.link.bind(this);
  }

  /**
   *
   */
  link($scope, elem, attr, hydeoController) {
    _scope.set(this, $scope);
    _hydeoController.set(this, hydeoController);
    this.binding();
    this.toVgCuepoints($scope.cuepoints);
  }

  /**
   *
   */
  binding() {
    const $scope = _scope.get(this);
    $scope.styling = this.styling.bind(this);
  }

  /**
   *
   */
  styling(point) {
    const $hyMedia = _hyMedia.get(this);
    const totalTime = $hyMedia.totalTime;

    if (totalTime === 0) {
      return null;
    }

    const style = {};
    // Convert millisecond to second.
    const videoLength = totalTime / 1000;
    const left = `${point.time / videoLength * 100}%`;
    style.left = left;

    return style;
  }

  /**
   *
   */
  onEnter(cuepoint) {
    const $hyMedia = _hyMedia.get(this);
    const tempOnEnter = cuepoint.onEnter;
    this.current = this.current || cuepoint;
    cuepoint.timeLapse = {
      start: cuepoint.time
    };

    cuepoint.onEnter = (currentTime, timeLapse, params) => {
      $hyMedia.pause();

      if (typeof tempOnEnter === 'function') {
        tempOnEnter(currentTime, timeLapse, params);
      }
    };
  }

  /**
   *
   */
  onComplete(cuepoint) {
    const $hyMedia = _hyMedia.get(this);
    const tempOnComplete = cuepoint.onComplete;

    cuepoint.onComplete = (currentTime, timeLapse, params) => {
      $hyMedia.play();

      if (typeof tempOnComplete === 'function') {
        tempOnComplete(currentTime, timeLapse, params);
      }
    };
  }

  /**
   *
   */
  onLeave() {}

  /**
   *
   */
  onUpdate() {}

  /**
   *
   */
  toVgCuepoints(cuepoints) {
    if (!cuepoints) {
      return;
    }

    const hydeoController = _hydeoController.get(this);
    const result = {
      list: []
    };

    cuepoints.forEach((cuepoint) => {
      this.onEnter(cuepoint);
      this.onComplete(cuepoint);
      this.onLeave(cuepoint);
      this.onUpdate(cuepoint);

      result.list.push(cuepoint);
    });

    hydeoController.vgCuepoints = result;
  }

  /**
   * @ngInject
   */
  static factory($hyMedia) {
    return new CuepointDirective($hyMedia);
  }
}

directivesModule.directive('hyCuepoint', CuepointDirective.factory);
