/**
 * @author centsent
 */
import directivesModule from '../_index';

/**
 * @ngInject
 */
function hyCurrentTime($hyMedia) {
  return {
    restrict: 'A',
    link($scope, elem) {
      $hyMedia.onTimeUpdate((currentTime) => {
        const percentTime = currentTime / $hyMedia.totalTime * 100;
        elem.css('left', `${percentTime}%`);
      });
    }
  };
}

directivesModule.directive('hyCurrentTime', hyCurrentTime);
