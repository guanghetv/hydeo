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

    this.binding();
  }

  /**
   *
   */
  binding() {
    const $scope = _scope.get(this);
    $scope.calcLeft = this.calcLeft;
    $scope.onPlayerReady = this.onPlayerReady;
  }

  /**
   *
   */
  onPlayerReady(api) {
    this.api = api;
  }

  /**
   *
   */
  calcLeft(point) {
    if (!this.api || this.api.totalTime === 0) {
      // Don't show the cuepoints if video not ready.
      return '-1000';
    }
    const videoLength = this.api.totalTime / 1000;
    return (point.time * 100 / videoLength).toString();
  }

}

controllersModuel.controller('hydeoController', HydeoController);
