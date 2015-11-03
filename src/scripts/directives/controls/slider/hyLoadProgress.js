/**
 * @author centsent
 */
import directivesModule from '../../_index';

/**
 * @ngInject
 */
function hyLoadProgress($hyMedia) {
  return {
    restrict: 'A',
    link($scope, elem) {
      $hyMedia.onProgress((buffered, bufferedEnd, totalTime) => {
        const percentTime = bufferedEnd / totalTime * 100;
        elem.css('width', `${percentTime}%`);
      });
    }
  };
}

directivesModule.directive('hyLoadProgress', hyLoadProgress);
