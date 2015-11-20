/**
 * @author centsent
 */
import directivesModule from '../_index';

/**
 * @ngInject
 */
function hyVolume($hyMedia) {
  return {
    restrict: 'A',
    link($scope, elem) {
      elem.bind('click', () => $hyMedia.toggleMuted());
    }
  };
}

directivesModule.directive('hyVolume', hyVolume);
