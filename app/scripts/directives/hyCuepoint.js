import directivesModule from './_index';
import template from '../../views/directives/hyCuepoint.html';

const _scope = new WeakMap();
const _hyMedia = new WeakMap();

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

  compile() {
    return this.link.bind(this);
  }

  link($scope) {
    _scope.set(this, $scope);
    this.binding();
  }

  binding() {
    const $scope = _scope.get(this);
    $scope.styling = this.styling.bind(this);
  }

  styling(point) {
    const $hyMedia = _hyMedia.get(this);
    const style = {};
    const totalTime = $hyMedia.totalTime();
    // TODO deal with if totalTime is 0
    const videoLength = totalTime / 1000;
    const left = `${point.time * 100 / videoLength}%`;
    style.left = left;

    return style;
  }

  /**
   * @ngInject
   */
  static factory($hyMedia) {
    return new CuepointDirective($hyMedia);
  }
}

directivesModule.directive('hyCuepoint', CuepointDirective.factory);
