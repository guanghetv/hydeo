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
      let drag = false;

      $hyMedia.onTimeUpdate((currentTime) => {
        const totalTime = $hyMedia.totalTime;
        const extraTotal = totalTime + totalTime / parentWidth * width;
        const percentLeft = currentTime / extraTotal * 100;
        elem.css('left', `${percentLeft}%`);
      });

      elem.bind('click', (event) => event.stopPropagation())
        .bind('mousedown', (event) => drag = true)
        .bind('mousemove', (event) => {
          if (drag) {
            console.log(event);
          }
        })
        .bind('mouseup', (event) => drag = false);
    }
  };
}

directivesModule.directive('hyTimePoint', hyTimePoint);
