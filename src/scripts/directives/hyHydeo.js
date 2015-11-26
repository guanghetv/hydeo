/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyHydeo.html';

const defaultOptions = {
  autoplay: true,
  controls: true
};

/**
 * @ngInject
 */
function hyHydeoDirective($hyMedia, $hyOptions) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      cuepoints: '=',
      src: '=',
      onReady: '&',
      controls: '=',
      autoplay: '='
    },
    transclude: true,
    link: {
      pre($scope, elem) {
        $hyOptions.set('hydeoElement', elem);
        $hyOptions.directiveKeys().map((key) => {
          let value = $scope[key];
          if (!value) {
            value = defaultOptions[key];
            $scope[key] = value;
          }
          $hyOptions.set(key, value);
          $scope.$watch(key, (newValue) => $hyOptions.set(key, newValue));
        });
      }
    }
  };
}

directivesModule.directive('hyHydeo', hyHydeoDirective);
