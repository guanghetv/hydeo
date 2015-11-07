/**
 * @author centsent
 */
import directivesModule from '../_index';

/**
 * @ngInject
 */
function hyPlayPause($hyMedia) {
  return {
    restrict: 'A',
    scope: {
      onPlay: '&',
      onPause: '&'
    },
    link($scope, elem) {
      elem.bind('click', () => {
        $hyMedia.togglePlay($scope.onPlay, $scope.onPause);
      });
    }
  };
}

directivesModule.directive('hyPlayPause', hyPlayPause);
