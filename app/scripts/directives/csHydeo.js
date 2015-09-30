import directivesModule from './_index';
import template from '../../views/directives/csHydeo.html';

/**
 *
 */
class HydeoDirective {

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
    return new HydeoDirective();
  }

}

directivesModule.directive('csHydeo', HydeoDirective.factory);
