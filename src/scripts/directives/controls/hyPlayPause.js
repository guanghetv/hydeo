function hyPlayPause($hyMedia) {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      onPlay: '&',
      onPause: '&',
    },
    link($scope, elem) {
      elem.on('click', () => $hyMedia.togglePlay($scope.onPlay, $scope.onPause));

      $hyMedia.onPlay(() => elem.addClass('pause').removeClass('play'));
      $hyMedia.onPause(() => elem.addClass('play').removeClass('pause'));
    },
  };
}

export default hyPlayPause;
