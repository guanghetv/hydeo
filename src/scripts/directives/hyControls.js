/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyControls.html';

/**
 * The audio/video controls bar, for more media control we do not need the native controls bar.
 *
 * @ngInject
 */
function hyControlsDirective($hyMedia) {
  return {
    restrict: 'E',
    template: template,
    require: '^hyHydeo',
    scope: {
      autohide: '='
    },
    link: ($scope) => {
      $scope.playControlClass = 'play';
      $scope.playProgress = {};

      $scope.toggleMuted = () => {
        $hyMedia.toggleMuted();
      };
    }
  };
}

directivesModule.directive('hyControls', hyControlsDirective);
