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
      const width = elem[0].clientWidth;
      const parentWidth = elem.parent()[0].clientWidth;

      elem.bind('click', event => event.stopPropagation());

      $hyMedia.onTimeUpdate(currentTime => {
        const totalTime = $hyMedia.totalTime;
        const percentLeft = currentTime / (totalTime + totalTime / parentWidth * width) * 100;
        elem.css('left', `${percentLeft}%`);
      });
    }
  };
}

directivesModule.directive('hyTimePoint', hyTimePoint);
