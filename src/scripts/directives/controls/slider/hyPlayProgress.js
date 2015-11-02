/**
 * @author centsent
 */
import directivesModule from '../../_index';

/**
 * @ngInject
 */
function hyPlayProgress($hyMedia) {
  return {
    restrict: 'A',
    link($scope, elem) {
      $hyMedia.onTimeUpdate(currentTime => {
        const totalTime = $hyMedia.totalTime;
        const percentTime = currentTime / totalTime * 100;

        elem.css('width', `${percentTime}%`);
      });
    }
  };
}


directivesModule.directive('hyPlayProgress', hyPlayProgress);
