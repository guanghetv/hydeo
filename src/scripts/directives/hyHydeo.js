/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyHydeo.html';

/**
 * @ngInject
 */
function hyHydeoDirective($hyMedia) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      cuepoints: '=',
      src: '=',
      onReady: '&'
    },
    transclude: true,
    link: {
      pre($scope, elem) {
        $scope.$watch('cuepoints', newValue => $hyMedia.cuepoints = newValue);
        $hyMedia.setHydeoElement(elem);
      }
    }
  };
}

directivesModule.directive('hyHydeo', hyHydeoDirective);
