/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyOverlay.html';

const _scope = new WeakMap();

/**
 *
 */
class HyOverlayDirective {

  constructor() {
    this.restrict = 'E';
    this.template = template;
    this.require = '^hyHydeo';
    this.scope = {
      templateUrl: '='
    };
  }

  /**
   *
   */
  compile() {
    return this::this.link;
  }

  /**
   *
   */
  link($scope) {
    _scope.set(this, $scope);
    this.binding();
  }

  /**
   *
   */
  binding() {
  }

  static factory() {
    return new HyOverlayDirective();
  }
}

directivesModule.directive('hyOverlay', HyOverlayDirective.factory);
