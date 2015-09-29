import controllersModuel from './_index';

const _scope = new WeakMap();
const _sce = new WeakMap();

/**
 *
 */
class HydeoController {

  /**
   * @ngInject
   */
  constructor($scope, $sce) {
    _scope.set(this, $scope);
    _sce.set(this, $sce);
    this.init();
  }

  /**
   *
   */
  init() {
    const $scope = _scope.get(this);
    const $sce = _sce.get(this);

    $scope.config = {
      sources: [{
        src: $sce.trustAsResourceUrl($scope.src),
        // TODO type should be configurable by an options param.
        type: 'video/mp4'
      }]
    };
  }

  calcLeft(point) {
    console.log(point);
  }
}

controllersModuel.controller('hydeoController', HydeoController);
