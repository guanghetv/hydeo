/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyControls.html';

/**
 * The audio/video controls bar, for more media control we do not need the native controls bar.
 *
 * @ngInject
 */
function hyControlsDirective($hyMedia, $timeout) {
  return {
    restrict: 'E',
    template: template,
    require: '^hyHydeo',
    scope: {
      autohide: '='
    },
    link: ($scope) => {
      $scope.playControlClass = 'play';
      $scope.playProgress = {};

      /**
       * Play the audio/video if paused, pause the audio/video if playing.
       */
      $scope.playControl = () => {
        $hyMedia.togglePlay();
      };

      $scope.toggleMuted = () => {
        $hyMedia.toggleMuted();
      };

      /**
       * Seek a time point when click on progress bar.
       */
      $scope.seek = event => {
        const time = event.offsetX;
        $hyMedia.seek(time);
      };

      $scope.toggleFullScreen = () => {
        $hyMedia.toggleFullScreen();
      };

      /**
       * Change the play control icon to `pause` if the audio/video is playing.
       */
      $hyMedia.onPlay(() => {
        $timeout(() => {
          $scope.playControlClass = 'pause';
        });
      });

      /**
       * Change the play control icon to `play` if the audio/video is paused.
       */
      $hyMedia.onPause(() => {
        $timeout(() => {
          $scope.playControlClass = 'play';
        });
      });

      /**
       * Update the audio/video play progress bar when playing.
       */
      $hyMedia.onTimeUpdate((currentTime) => {
        const totalTime = $hyMedia.totalTime;
        const percentTime = currentTime / totalTime * 100;

        $timeout(() => {
          $scope.playProgress.width = `${percentTime}%`;
          $scope.currentTime = currentTime * 1000;
          $scope.totalTime = totalTime * 1000;
        });
      });
    }
  };
}

directivesModule.directive('hyControls', hyControlsDirective);
