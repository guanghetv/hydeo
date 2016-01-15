function hySlider($hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    link($scope, elem) {
      const width = elem[0].offsetWidth;
      let dragging = false;

      elem
        .on('click', (event) => {
          const time = event.offsetX / width * $hyMedia.totalTime;
          $hyMedia.seek(time);
        })
        .on('mousedown', () => dragging = true)
        .on('mouseup', () => {
          dragging = false;
          $hyMedia.play();
        })
        .on('mousemove', (event) => {
          if (dragging) {
            const time = event.offsetX / width * $hyMedia.totalTime;
            $hyMedia.seek(time);
            $hyMedia.pause();
          }
        });
    },
  };
}

export default hySlider;
