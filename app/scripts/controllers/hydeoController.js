/**
 * TODO
 */
import angular from 'angular';
import controllersModuel from './_index';

const _scope = new WeakMap();
const _hyMedia = new WeakMap();

/**
 * TODO
 */
class HydeoController {

  /**
   * @ngInject
   */
  constructor($scope, $hyMedia) {
    _scope.set(this, $scope);
    _hyMedia.set(this, $hyMedia);
  }

  /**
   * TODO
   */
  ready() {
    this.bindingEvents();
  }

  /**
   * TODO
   */
  bindingEvents() {
    const $hyMedia = _hyMedia.get(this);
    $hyMedia.onTimeUpdate(this::this.onTimeUpdate);
  }

  /**
   * TODO
   */
  onTimeUpdate() {
    const $scope = _scope.get(this);
    const $hyMedia = _hyMedia.get(this);

    if (!$scope.options.cuepoints) {
      return;
    }

    const currentSecond = parseInt($hyMedia.currentTime / 1000, 10);
    $scope.options.cuepoints.forEach((cuepoint) => {
      const start = parseInt(cuepoint.time, 10);

      if (currentSecond === start && angular.isFunction(cuepoint.onEnter)) {
        cuepoint.onEnter(currentTime, cuepoint.params);
      }

      if (currentSecond > start && angular.isFunction(cuepoint.onComplete)) {
        cuepoint.onComplete(currentTime, cuepoint.params);
      }
    });
  }

}

controllersModuel.controller('hydeoController', HydeoController);
