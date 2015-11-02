/**
 * @author centsent
 */
import directivesModule from '../../_index';
import template from '../../../../views/directives/controls/slider/hyPlayProgress.html';

class HyPlayProgress {
  constructor($hyMedia) {
    this.restrict = 'E';
    this.template = template;

    this.$hyMedia = $hyMedia;
  }

  compile() {
    return this.link.bind(this);
  }

  link($scope, elem) {
    this.element = elem;

    this.$hyMedia.onTimeUpdate(currentTime => {
      const totalTime = this.$hyMedia.totalTime;
      const percentTime = currentTime / totalTime * 100;

      $scope.progress = {
        width: `${percentTime}%`
      };
    });
  }

  static factory($hyMedia) {
    return new HyPlayProgress($hyMedia);
  }
}

HyPlayProgress.factory.$inject = ['$hyMedia'];

directivesModule.directive('hyPlayProgress', HyPlayProgress.factory);
