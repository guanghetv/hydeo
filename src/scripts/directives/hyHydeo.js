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
        $hyOptions.keys().map((key) => {
          $hyOptions.set(key, $scope[key] || defaultOptions[key]);
          $scope.$watch(key, (newValue) => $hyOptions.set(key, newValue));
        });
        $scope.controls = $hyOptions.get('controls');
        $hyMedia.setHydeoElement(elem);
      }
    }
  };
}

directivesModule.directive('hyHydeo', hyHydeoDirective);
