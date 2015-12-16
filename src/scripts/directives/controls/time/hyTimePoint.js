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

      $hyMedia.onTimeUpdate((currentTime) => {
        const totalTime = $hyMedia.totalTime;
        const extraTotal = totalTime + totalTime / parentWidth * width;
        const percentLeft = currentTime / extraTotal * 100;
        elem.css('left', `${percentLeft}%`);
      });

      elem.bind('click', (event) => event.stopPropagation());
    }
  };
}

directivesModule.directive('hyTimePoint', hyTimePoint);
