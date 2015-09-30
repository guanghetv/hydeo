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

    this.link = {
      pre: ($scope) => {
        _scope.set(this, $scope);
        $scope.calcLeft = this.calcLeft;
      }
    };
  }

  binding() {
    const $scope = _scope.get(this);
    $scope.calcLeft = this.calcLeft;
  }

  calcLeft(point) {
    console.log(point);
  }

  static factory() {
    return new CuepointDirective();
  }
}

directivesModule.directive('hyCuepoint', CuepointDirective.factory);
