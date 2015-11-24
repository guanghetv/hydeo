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

      $hyMedia.onPlay(() => elem.addClass('pause').removeClass('play'));
      $hyMedia.onPause(() => elem.addClass('play').removeClass('pause'));
    }
  };
}

directivesModule.directive('hyPlayPause', hyPlayPause);
