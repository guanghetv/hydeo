/**
 * @author centsent
 */
import directivesModule from '../_index';

const defaultOptions = {
  autohide: true,
  autohideTime: 2000
};

function hyAutohide($hyOptions) {
  return {
    restrict: 'A',
    scope: {
      autohideTime: '='
    },
    link($scope, elem, attrs) {
      const autohide = attrs.hyAutohide;
      const autohideTime = $scope.autohideTime || defaultOptions.autohideTime;
      const hydeoElement = $hyOptions.get('hydeoElement');
      let autohideTimeout;

      if (autohide !== undefined && autohide !== 'false') {
        hydeoElement.bind('mousemove', () => {
          clearTimeout(autohideTimeout);
          elem.css('display', 'block');
        }).bind('mouseout', () => elem.css('display', 'none'));

        setInterval(() => {
          autohideTimeout = setTimeout(() => {
            elem.css('display', 'none');
          }, autohideTime);
        }, autohideTime);
      }
    }
  };
}

directivesModule.directive('hyAutohide', hyAutohide);
