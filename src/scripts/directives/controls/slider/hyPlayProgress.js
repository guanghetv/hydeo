function hyPlayProgress($hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    link($scope, elem) {
      $hyMedia.onTimeUpdate(currentTime => {
        const totalTime = $hyMedia.totalTime;
        const percentTime = currentTime / totalTime * 100;

        elem.css('width', `${percentTime}%`);
      });
    },
  };
}

export default hyPlayProgress;
