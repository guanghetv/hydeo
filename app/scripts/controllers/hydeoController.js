/**
 * TODO
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

    this.init();
  }

  /**
   * TODO
   */
  init() {}

  /**
   * TODO
   */
  _binding() {
    const $scope = _scope.get(this);
    $scope.onPlayerReady = this::this.onPlayerReady;
  }

  /**
   * TODO
   */
  onPlayerReady(api) {
    const $hyMedia = _hyMedia.get(this);
    $hyMedia.setApi(api);
    this.onPlay();
  }

  /**
   * TODO
   */
  set vgCuepoints(cuepoints) {
    const $scope = _scope.get(this);
    $scope.config.cuePoints = cuepoints;
  }

  /**
   * TODO
   */
  showOverlay(templateUrl) {
    const $scope = _scope.get(this);
    $scope.cuepointTemplateUrl = templateUrl;
  }
}

controllersModuel.controller('hydeoController', HydeoController);
