function hyFullscreen($hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    link($scope, elem) {
      elem.addClass($hyMedia.isFullscreen ? 'exit' : 'enter')
        .bind('click', () => {
          $hyMedia.toggleFullScreen();
        });

      $hyMedia.onFullScreenChange((isFullscreen) => {
        elem.toggleClass('exit', isFullscreen)
          .toggleClass('enter', !isFullscreen);
      });
    },
  };
}

export default hyFullscreen;
