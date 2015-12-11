/**
 * @author centsent
 */
import directivesModule from './_index';

const _hyOptions = new WeakMap();
const _hyMedia = new WeakMap();

const defaultOptions = {
  autohide: true,
  autohideTime: 2000
};

class HyControlsDirective {

  constructor($hyOptions, $hyMedia) {
    this.restrict = 'A';
    this.scope = {
      autohide: '=',
      autohideTime: '='
    };

    _hyOptions.set(this, $hyOptions);
    _hyMedia.set(this, $hyMedia);
  }

  compile() {
    return this.link.bind(this);
  }

  link($scope, elem) {
    Object.keys(defaultOptions).map((key) => {
      if ($scope[key] === undefined) {
        $scope[key] = defaultOptions[key];
      }
    });


    if ($scope.autohide) {
      const $hyOptions = _hyOptions.get(this);
      const hydeoElement = $hyOptions.get('hydeoElement');
      let autohideTimeout;

      hydeoElement.bind('mousemove', () => {
        clearTimeout(autohideTimeout);
        elem.css('display', 'block');
      });

      setInterval(() => {
        autohideTimeout = setTimeout(() => {
          elem.css('display', 'none');
        }, $scope.autohideTime);
      }, $scope.autohideTime);
    }
  }
}

function factory($hyOptions, $hyMedia) {
  return new HyControlsDirective($hyOptions, $hyMedia);
}

factory.$inject = ['$hyOptions', '$hyMedia'];

directivesModule.directive('hyControls', factory);
