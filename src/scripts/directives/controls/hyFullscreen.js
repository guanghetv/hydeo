/**
 * @author centsent
 */
import directivesModule from '../_index';

/**
 * @ngInject
 */
function hyFullscreen($hyMedia) {
  return {
    restrict: 'A',
    link($scope, elem) {
      elem.bind('click', () => {
        $hyMedia.toggleFullScreen();
      });
    }
  };
}

directivesModule.directive('hyFullscreen', hyFullscreen);
