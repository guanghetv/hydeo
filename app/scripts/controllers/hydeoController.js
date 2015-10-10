import controllersModuel from './_index';

const _scope = new WeakMap();
const _sce = new WeakMap();
const _hyMedia = new WeakMap();

/**
 *
 */
class HydeoController {

  /**
   * @ngInject
   */
  constructor($scope, $sce, $hyMedia) {
    _scope.set(this, $scope);
    _sce.set(this, $sce);
    _hyMedia.set(this, $hyMedia);
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

    this._binding();
  }

  /**
   *
   */
  _binding() {
    const $scope = _scope.get(this);
    $scope.onPlayerReady = this::this.onPlayerReady;
  }

  /**
   *
   */
  onPlayerReady(api) {
    const $hyMedia = _hyMedia.get(this);
    $hyMedia.setApi(api);
  }

  /**
   *
   */
  set vgCuepoints(cuepoints) {
    const $scope = _scope.get(this);
    $scope.config.cuePoints = cuepoints;
  }

  /**
   *
   */
  showOverlay(templateUrl) {
    const $scope = _scope.get(this);
    $scope.cuepointTemplateUrl = templateUrl;
  }
}

controllersModuel.controller('hydeoController', HydeoController);
