/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyControls.html';

const _hyMedia = new WeakMap();
const _scope = new WeakMap();
const _timeout = new WeakMap();

const events = ['onPlay', 'onPause', 'onTimeUpdate', 'onProgress'];

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
    $scope.playProgress = {};
    $scope.loadProgress = {};
    this.binding();
  }

  binding() {
    const $scope = _scope.get(this);
    const $hyMedia = _hyMedia.get(this);

    $scope.playControl = this::this.playControl;
    $scope.seek = this::this.seek;

    angular.forEach(events, (eventType) => {
      const event = $hyMedia[eventType];
      const handler = this[eventType];
      if (angular.isFunction(event) && angular.isFunction(handler)) {
        $hyMedia::event(this::handler);
      }
    });
  }

  /**
   *
   */
  seek(event) {
    const time = event.offsetX;
    const $hyMedia = _hyMedia.get(this);

    $hyMedia.seek(time);
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
   * Update the audio/video play progress bar when playing.
   */
  onTimeUpdate() {
    const $scope = _scope.get(this);
    const $hyMedia = _hyMedia.get(this);
    const $timeout = _timeout.get(this);
    const totalTime = $hyMedia.totalTime;
    const currentTime = $hyMedia.currentTime;
    const percentTime = currentTime / totalTime * 100;

    $timeout(() => {
      $scope.playProgress.width = `${percentTime}%`;
      $scope.currentTime = currentTime;
      $scope.totalTime = totalTime;
    });
  }

  /**
   * Update load progress bar when the browser is downloading the audio/video.
   */
  onProgress(event) {
    const target = event.target;
    const buffered = target.buffered;
    // const duration = target.duration;

    for (let i = 0; i < buffered.length; i++) {
      const start = buffered.start(i);
      const end = buffered.end(i);
    }
  }

  /**
   * Play the audio/video if paused, pause the audio/video if playing.
   */
  playControl() {
    const $hyMedia = _hyMedia.get(this);
    $hyMedia.togglePlay();
  }

  static factory($hyMedia, $timeout) {
    return new HyControlsDirective($hyMedia, $timeout);
  }

}

directivesModule.directive('hyControls', HyControlsDirective.factory);
