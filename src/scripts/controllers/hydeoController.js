/**
 * @author centsent
 */
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
    $hyMedia.onTimeUpdate(this.onTimeUpdate, this);
  }

  /**
   * TODO
   */
  onTimeUpdate(currentTime) {
    const $scope = _scope.get(this);

    if (!$scope.options.cuepoints) {
      return;
    }

    const currentSecond = parseInt(currentTime, 10);
    $scope.options.cuepoints.forEach((cuepoint) => {
      const start = parseInt(cuepoint.time, 10);

      if (currentSecond === start) {
        if (angular.isFunction(cuepoint.onEnter) && !cuepoint.$$isDirty) {
          cuepoint.onEnter(currentTime, cuepoint.params);
        }
        cuepoint.$$isDirty = true;
      }

      if (currentSecond > start) {
        if (angular.isFunction(cuepoint.onComplete)) {
          cuepoint.onComplete(currentTime, cuepoint.params);
        }
      } else {
        cuepoint.$$isDirty = false;
      }
    });
  }

}

controllersModuel.controller('hydeoController', HydeoController);
