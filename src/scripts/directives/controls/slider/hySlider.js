function hySlider($hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    link($scope, elem) {
      elem.bind('click', (event) => {
        const width = elem[0].offsetWidth;
        const time = event.offsetX / width * $hyMedia.totalTime;

        $hyMedia.seek(time);
      });
    },
  };
}

export default hySlider;
