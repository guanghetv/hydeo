function hySlider($hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    link($scope, elem) {
      // let dragging = false;

      elem
        .on('click', (event) => {
          const width = elem[0].offsetWidth;
          const time = event.offsetX / width * $hyMedia.totalTime;
          $hyMedia.seek(time);
        });
        // .on('mousedown', () => dragging = true)
        // .on('mouseup mouseleave', () => {
          // if (dragging) {
            // $hyMedia.play();
          // }
          // dragging = false;
        // })
        // .on('mousemove', (event) => {
          // if (dragging) {
            // const width = elem[0].offsetWidth;
            // const time = event.offsetX / width * $hyMedia.totalTime;
            // $hyMedia.seek(time);
            // $hyMedia.pause();
          // }
        // });
    },
  };
}

export default hySlider;
