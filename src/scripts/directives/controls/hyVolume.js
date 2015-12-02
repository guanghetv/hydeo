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
      const bar = angular.element(document.createElement('div'));
      let barTimeout;
      bar.addClass('hy-volume-bar');
      elem.after(bar);

      // TODO 10 should be a configurable constant.
      for (let i = 10; i > 0; i--) {
        // TODO i should be a configurable params.
        const iElement = document.createElement('i');
        iElement.dataset.level = i * 10;
        bar.append(iElement);
      }

      const levels = bar.children();

      function setCurrentClass(volume) {
        const index = 10 - volume / 10;
        levels.removeClass('current');

        if (volume) {
          levels[index].classList.add('current');
        }
      }

      levels.addClass('level')
        .bind('click', (event) => {
          const level = event.target.dataset.level;
          setCurrentClass(level);
          $hyMedia.volume(level);
        });

      function showBar(event, isBar) {
        clearTimeout(barTimeout);
        bar.css('display', 'block');

        if (isBar) {
          const top = -(bar[0].offsetHeight - event.target.offsetHeight);
          const margin = 10;
          bar.css('top', `${top - margin}px`);
        }
      }

      function hideBar() {
        barTimeout = setTimeout(() => {
          bar.css('display', 'none');
          // TODO 500 should be a configurable params.
        }, 500);
      }

      elem.addClass($hyMedia.isMuted ? 'unmuted' : 'muted')
        .bind('click', () => $hyMedia.toggleMuted())
        .bind('mouseover', (event) => showBar(event, true))
        .bind('mouseout', hideBar);

      bar.bind('mouseover', showBar)
        .bind('mouseout', hideBar);

      $hyMedia.onVolumeChange((currentVolume, isMuted) => {
        if (isMuted) {
          elem.addClass('unmuted').removeClass('muted');
        } else {
          elem.addClass('muted').removeClass('unmuted');
        }

        setCurrentClass(currentVolume);
      });

      setCurrentClass($hyMedia.currentVolume);
    }
  };
}

directivesModule.directive('hyVolume', hyVolume);
