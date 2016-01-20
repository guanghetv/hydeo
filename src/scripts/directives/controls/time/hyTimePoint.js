function hyTimePoint($hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    link($scope, elem) {
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
    },
  };
}

export default hyTimePoint;
