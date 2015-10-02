import directivesModule from './_index';
import template from '../../views/directives/hyCuepoint.html';

const _scope = new WeakMap();

class CuepointDirective {
  constructor() {
    this.restrict = 'E';
    this.template = template;
    this.require = '^hyHydeo';
    this.scope = {
      cuepoints: '='
    };

    this.link = ($scope) => {
      _scope.set(this, $scope);
    };
  }

  binding() {
    const $scope = _scope.get(this);
    $scope.styling = this.styling;
  }

  styling(point) {
    const style = {};

    return style;
  }

  static factory() {
    return new CuepointDirective();
  }
}

directivesModule.directive('hyCuepoint', CuepointDirective.factory);
