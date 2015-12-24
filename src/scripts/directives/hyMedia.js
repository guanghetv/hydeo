import template from '../../views/directives/hyMedia.html';

function hyMedia($sce, $hyMedia, $hyOptions) {
  'ngInject';

  return {
    restrict: 'E',
    template,
    scope: {
      src: '=',
      autoplay: '=',
    },

    link: ($scope, elem) => {
      $hyOptions.observe('src', (source) => $hyMedia.changeSource(source));
      // TODO detecting media type.
      // TODO video should be configurable by an options param.
      // only support video for now.
      const mediaElement = elem.find('video');
      // setup $hyMedia service
      $hyMedia.ready(mediaElement);
    },
  };
}

export default hyMedia;
