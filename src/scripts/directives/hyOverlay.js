/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyOverlay.html';

/**
 * TODO
 */
function hyOverlayDirective() {
  return {
    restrict: 'E',
    template: template,
    require: '^hyHydeo',
    scope: {
      templateUrl: '='
    }
  };
}

directivesModule.directive('hyOverlay', hyOverlayDirective);
