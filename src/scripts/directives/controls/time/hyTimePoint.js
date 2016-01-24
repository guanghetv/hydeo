function hyTimePoint($hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    required: 'hySlider',
    link($scope, elem) {
      const slider = document.querySelectorAll('[hy-slider]')[0];
      let dragging = false;

      function setTimePointPosition() {
        const width = elem[0].clientWidth;
        const parentWidth = slider.clientWidth;
        const totalTime = $hyMedia.totalTime;
        const extraTotal = totalTime + totalTime / parentWidth * width;
        const percentLeft = $hyMedia.currentTime / extraTotal * 100;
        elem.css('left', `${percentLeft}%`);
      }

      function disableSliderDragging() {
        if (dragging) {
          $hyMedia.play();
        }
        dragging = false;
      }

      $hyMedia.onTimeUpdate(setTimePointPosition);
      $hyMedia.onFullScreenChange(setTimePointPosition);

      elem.on('click mousemove', (event) => event.stopPropagation());
      slider.addEventListener('mousedown', () => dragging = true);
      slider.addEventListener('mouseup', disableSliderDragging);
      slider.addEventListener('mouseleave', disableSliderDragging);
      slider.addEventListener('mousemove', (event) => {
        if (dragging) {
          const width = slider.offsetWidth;
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
