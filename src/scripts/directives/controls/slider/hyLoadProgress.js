function hyLoadProgress($hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    link($scope, elem) {
      $hyMedia.onProgress((buffered, bufferedEnd, totalTime) => {
        const percentTime = bufferedEnd / totalTime * 100;
        elem.css('width', `${percentTime}%`);
      });
    },
  };
}

export default hyLoadProgress;
