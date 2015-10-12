/**
 * TODO
 */
import directivesModule from './_index';
import template from '../../views/directives/hyHydeo.html';

/**
 * Default options.
 */
const options = {
  src: '',
  autoplay: false
};

/**
 * TODO
 */
class HyHydeoDirective {

  constructor() {
    this.restrict = 'E';
    this.template = template;
    // Use controller to expose an API to other directives.
    this.controller = 'hydeoController';
    this.scope = {
      cuepoints: '=',
      src: '=',
      options: '='
    };

    this.link = {
      pre: ($scope, elem, atrr, controller) => {
        $scope.options = Object.assign(options, $scope.options);

        for (const prop in $scope.options) {
          if ($scope[prop]) {
            $scope.options[prop] = $scope[prop];
          }
        }

        controller.hydeoElement = elem;
      }
    };
  }

  /**
   * A static method to generate a directive instance.
   */
  static factory() {
    return new HyHydeoDirective();
  }

}

// You can define a directive simply without factory method,
// like below, but don't do that cause it's not good to read and inject
// parameters.
// eg:
// directivesModule.directive('hyHydeo', () => new HyHydeoDirective());
directivesModule.directive('hyHydeo', HyHydeoDirective.factory);
