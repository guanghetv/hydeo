/**
 * @author centsent
 */
import directivesModule from '../_index';

/**
 * @ngInject
 */
function hyVolume($hyMedia) {
  return {
    restrict: 'A',
    link($scope, elem) {
      elem.bind('click', () => $hyMedia.toggleMuted());
      elem.addClass($hyMedia.isMuted ? 'unmuted' : 'muted');

      $hyMedia.onVolumeChange((currentVolume, isMuted) => {
        if (isMuted) {
          elem.addClass('unmuted').removeClass('muted');
        } else {
          elem.addClass('muted').removeClass('unmuted');
        }
      });
    }
  };
}

directivesModule.directive('hyVolume', hyVolume);
