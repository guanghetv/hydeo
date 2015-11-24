/**
 * @author centsent
 */
import directivesModule from './_index';
import template from '../../views/directives/hyMedia.html';

/**
 * @ngInject
 */
function hyMediaDirective($sce, $hyMedia) {
  // mock `this` object because it is undefined in current context.
  const _this = {};

  /**
   * TODO
   */
  _this.setup = () => {
    const elem = _this.mediaElement;

    // elem.prop('src', $sce.trustAsResourceUrl(_this.$scope.src));
    elem.prop('autoplay', _this.$scope.autoplay);
  };

  return {
    restrict: 'E',
    template: template,
    scope: {
      src: '=',
      autoplay: '='
    },

    link: ($scope, elem) => {
      _this.$scope = $scope;

      $scope.$watch('src', (source) => $hyMedia.changeSource(source));

      // TODO detecting media type.
      // TODO video should be configurable by an options param.
      // only support video for now.
      _this.mediaElement = elem.find('video');

      // setup $hyMedia service
      $hyMedia.setMediaElement(_this.mediaElement);
      // setup hy-media directive
      _this.setup();
      $hyMedia.ready();
    }
  };
}

directivesModule.directive('hyMedia', hyMediaDirective);
