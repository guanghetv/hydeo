function hyTimePoint($hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    required: 'hySlider',
    link($scope, elem) {
      const slider = elem.parent();
      let dragging = false;

      function setTimePointPosition() {
        const width = elem[0].clientWidth;
        const parentWidth = elem.parent()[0].clientWidth;
        const totalTime = $hyMedia.totalTime;
        const extraTotal = totalTime + totalTime / parentWidth * width;
        const percentLeft = $hyMedia.currentTime / extraTotal * 100;
        elem.css('left', `${percentLeft}%`);
      }

      $hyMedia.onTimeUpdate(setTimePointPosition);
      $hyMedia.onFullScreenChange(setTimePointPosition);

      elem.on('click mousemove', (event) => event.stopPropagation());
      slider
        .on('mousedown', () => dragging = true)
        .on('mouseup mouseleave', () => {
          if (dragging) {
            $hyMedia.play();
          }
          dragging = false;
        })
        .on('mousemove', (event) => {
          if (dragging) {
            const width = slider[0].offsetWidth;
            const time = event.offsetX / width * $hyMedia.totalTime;
            $hyMedia.pause();
            setTimePointPosition();
            $hyMedia.seek(time);
          }
        });
    },
  };
}

export default hyTimePoint;
