/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyControls.html';

const _hyMedia = new WeakMap();
const _scope = new WeakMap();
const _timeout = new WeakMap();

/**
 * The audio/video controls bar, we do not need the native controls bar for more
 * control.
 */
class HyControlsDirective {

  constructor($hyMedia, $timeout) {
    this.restrict = 'E';
    this.template = template;
    this.require = '^hyHydeo';
    this.scope = {
      autohide: '='
    };

    _hyMedia.set(this, $hyMedia);
    _timeout.set(this, $timeout);
  }

  compile() {
    return this::this.link;
  }

  link($scope) {
    _scope.set(this, $scope);
    $scope.playControlClass = 'play';
    this.binding();
  }

  binding() {
    const $scope = _scope.get(this);
    const $hyMedia = _hyMedia.get(this);

    $scope.playControl = this::this.playControl;
    $hyMedia.onPlay(this::this.onPlay);
    $hyMedia.onPause(this::this.onPause);
  }

  /**
   * Change the play control icon to `pause` if the audio/video is playing.
   */
  onPlay() {
    const $scope = _scope.get(this);
    const $timeout = _timeout.get(this);

    $timeout(() => {
      $scope.playControlClass = 'pause';
    });
  }

  /**
   * Change the play control icon to `play` if the audio/video is paused.
   */
  onPause() {
    const $scope = _scope.get(this);
    const $timeout = _timeout.get(this);

    $timeout(() => {
      $scope.playControlClass = 'play';
    });
  }

  /**
   * Play the audio/video if paused, pause the audio/video if playing.
   */
  playControl() {
    const $hyMedia = _hyMedia.get(this);
    $hyMedia.togglePlay();
  }

  /**
   * A static method to generate a directive instance.
   */
  static factory($hyMedia, $timeout) {
    return new HyControlsDirective($hyMedia, $timeout);
  }

}

directivesModule.directive('hyControls', HyControlsDirective.factory);
