/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyMedia.html';

/**
 * @ngInject
 */
function hyMediaDirective($sce, $hyMedia, $hyOptions) {
  return {
    restrict: 'E',
    template: template,
    scope: {
      src: '=',
      autoplay: '='
    },

    link: ($scope, elem) => {
      $hyOptions.observe('src', (source) => $hyMedia.changeSource(source));
      // TODO detecting media type.
      // TODO video should be configurable by an options param.
      // only support video for now.
      const mediaElement = elem.find('video');
      // setup $hyMedia service
      $hyMedia.ready(mediaElement);
    }
  };
}

directivesModule.directive('hyMedia', hyMediaDirective);
