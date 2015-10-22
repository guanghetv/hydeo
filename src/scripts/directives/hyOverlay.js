/**
 * @author centsent
 */
import directivesModule from './_index';

/**
 * TODO
 */
function hyOverlayDirective() {
  return {
    restrict: 'E',
    templateUrl: 'directives/hyOverlay.html',
    require: '^hyHydeo',
    scope: {
      templateUrl: '='
    }
  };
}

directivesModule.directive('hyOverlay', hyOverlayDirective);
