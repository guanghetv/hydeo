import directivesModule from './_index';
import template from '../../views/directives/hyHydeo.html';

/**
 *
 */
class HyHydeoDirective {

  constructor() {
    this.restrict = 'E';
    this.template = template;
    this.controller = 'hydeoController';
    this.scope = {
      cuepoints: '=',
      src: '='
    };
  }

  /**
   *
   */
  static factory() {
    return new HyHydeoDirective();
  }

}

directivesModule.directive('hyHydeo', HyHydeoDirective.factory);
