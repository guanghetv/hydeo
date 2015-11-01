/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyHydeo.html';

/**
 * Default options.
 */
const options = {
  src: '',
  autoplay: false,
  cuepoints: []
};

/**
 * TODO
 * @ngInject
 */
function hyHydeoDirective($hyMedia) {
  return {
    restrict: 'E',
    template: template,
    // Use controller to expose an API to other directives.
    controller: 'hydeoController',
    scope: {
      cuepoints: '=',
      src: '=',
      options: '='
    },
    transclude: true,
    link: {
      pre: ($scope, elem, attrs, controller) => {
        $scope.options = Object.assign(options, $scope.options);
        $scope.$watch('src', (newValue) => {
          console.log('new value:', newValue);
        });

        for (const prop in $scope.options) {
          if ($scope[prop]) {
            $scope.options[prop] = $scope[prop];
          }
        }

        controller.hydeoElement = elem;
        $hyMedia.setHydeoElement(elem);
      }
    }
  };
}

directivesModule.directive('hyHydeo', hyHydeoDirective);
