/**
 * @author centsent
 */
import directivesModule from '../_index';

class HyFullscreenDirective {
  constructor($hyMedia) {
    this.restrict = 'A';
    this.$hyMedia = $hyMedia;
  }

  compile() {
    return this.link.bind(this);
  }

  link($scope, elem) {
    const $hyMedia = this.$hyMedia;

    elem.addClass($hyMedia.isFullscreen ? 'exit' : 'enter')
      .bind('click', () => {
        $hyMedia.toggleFullScreen();
      });

    $hyMedia.onFullScreenChange((isFullscreen) => {
      elem.toggleClass('exit', isFullscreen)
        .toggleClass('enter', !isFullscreen);
    });
  }

  static factory($hyMedia) {
    return new HyFullscreenDirective($hyMedia);
  }
}

HyFullscreenDirective.factory.$inject = ['$hyMedia'];

directivesModule.directive('hyFullscreen', HyFullscreenDirective.factory);
