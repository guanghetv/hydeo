/**
 * @author centsent
 */
import directivesModule from '../../_index';

/**
 * @ngInject
 */
function hySlider($hyMedia) {
  return {
    restrict: 'A',
    link($scope, elem) {
      elem.bind('mousedown', (event) => {
        const width = elem[0].offsetWidth;
        const time = event.offsetX / width * $hyMedia.totalTime;

        $hyMedia.seek(time);
      });
    }
  };
}

directivesModule.directive('hySlider', hySlider);
