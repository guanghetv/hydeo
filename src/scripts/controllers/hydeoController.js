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

}

controllersModuel.controller('hydeoController', HydeoController);
