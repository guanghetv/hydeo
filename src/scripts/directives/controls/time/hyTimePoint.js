/**
 * @author centsent
 */
import directivesModule from '../../_index';

/**
 * @ngInject
 */
function hyTimePoint($hyMedia) {
  return {
    restrict: 'A',
    link($scope, elem) {
      elem.bind('click', event => event.stopPropagation());

      $hyMedia.onTimeUpdate((currentTime) => {
        const percentTime = currentTime / $hyMedia.totalTime * 100;
        elem.css('left', `${percentTime}%`);
      });
    }
  };
}

directivesModule.directive('hyTimePoint', hyTimePoint);
